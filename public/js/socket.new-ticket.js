var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect', (data) => {
    console.log('Connected!');
});

socket.on('disconnect', () => {
    console.log('Disconnected!');
});

socket.on('currentStatus', (data) => {
    console.log(data);
    label.text(data.last);
})

$('button').on('click', () => {
    console.log('Send nextTicket!');
    socket.emit('nextTicket', {}, (nextTicket) => {
        $(label).text(nextTicket);
    });
})