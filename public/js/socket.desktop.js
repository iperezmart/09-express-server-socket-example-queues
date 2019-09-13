var socket = io();
//var label = $('#lblNuevoTicket');
var searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('desktop')) {
    window.location = 'index.html';
    throw new Error('Desktop is required');
}

var desktop = searchParams.get('desktop');
console.log(desktop);
$('h1').text(`Desktop ${desktop}`);

socket.on('connect', (data) => {
    console.log('Connected!');
});

socket.on('disconnect', () => {
    console.log('Disconnected!');
});

// socket.on('currentStatus', (data) => {
//     console.log(data);
//     label.text(data.last);
// })

$('button').on('click', () => {
//     console.log('Send nextTicket!');
//     socket.emit('nextTicket', {}, (nextTicket) => {
//         $(label).text(nextTicket);
//     });
    socket.emit('processTicket', { desktop: desktop }, function(data) {
        console.log(data);
        if (data === 'There are not tickets') {
            $('small').text(data);
            return;
        }

        $('small').text(data.number);
    });
});