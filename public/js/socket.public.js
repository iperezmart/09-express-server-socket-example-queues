var socket = io();
var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');
var lblDesktop1 = $('#lblEscritorio1');
var lblDesktop2 = $('#lblEscritorio2');
var lblDesktop3 = $('#lblEscritorio3');
var lblDesktop4 = $('#lblEscritorio4');
var tickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var desktops = [lblDesktop1, lblDesktop2, lblDesktop3, lblDesktop4];

socket.on('connect', (data) => {
    console.log('Connected!');
});

socket.on('disconnect', () => {
    console.log('Disconnected!');
});

socket.on('currentStatus', (data) => {
    console.log(data);
    this.updateView(data.lastFour);
});

socket.on('lastFourTickets', (data) => {
    console.log(data);
    let audio = new Audio('audio/new-ticket.mp3');
    this.updateView(data.lastFour);
});

function updateView(lastFourTickets) {
    for (let i = 0; i < lastFourTickets.length - 1; i++) {
        tickets[i].text('Ticket ' + lastFourTickets[i].number);
        desktops[i].text('Desktop ' + lastFourTickets[i].desktop);
    }
}