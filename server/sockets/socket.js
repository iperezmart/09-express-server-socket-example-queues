
const io = require('../server').io;
const { TicketControl } = require('../classes/ticket-control');

let tickets = new TicketControl(); 

// Detect client connection
io.on('connection', (client) => {
    console.log('Client connected!');
    
    // Detect client disconnection
    client.on('disconnect', () => {
        console.log('Client disconnected!');
    });

    // Listen client messages
    client.on('sendMessage', (msg, callback) => {
        console.log('[Message received]');
        console.log(msg);

        client.broadcast.emit('sendMessage', 'BROADCAST!!!');

        // Send feedback to client...
        // callback('Feedback message to client!');
    });

    client.on('nextTicket', (data, callback) => {
        let nextItem = tickets.next();
        console.log(nextItem);
        callback(nextItem);
    });

    client.on('processTicket', (data, callback) => {
        if (!data.desktop) {
            callback({
                err: true,
                message: 'Desktop required.'
            });
        }

        let processTicket = tickets.processTicket(data.desktop);
        callback(processTicket);

        client.broadcast.emit('lastFourTickets', {
            lastFour: tickets.lastFourTickets()
        });
    });

    client.emit('sendMessage', {
        'user': 'USER',
        'message': 'Welcome to the server SCOKET.io DEMO!' 
    });

    client.emit('currentStatus', {
        last: tickets.lastTicket(),
        lastFour: tickets.lastFourTickets()
    });
});