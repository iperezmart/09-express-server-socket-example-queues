const fs = require('fs');

class Ticket {
    constructor(number, desktop) {
        this.number = number;
        this.desktop = desktop;
    }
}

class TicketControl {

    constructor() {
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.activeTickets = [];

        let data = require('../data/data.json');
        console.log(data);

        if (data.today === this.today) {
            this.last = data.last;
            this.tickets = data.tickets;
        }
        else {
            this.reset();
        }
    }

    next() {
        let ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);

        this.last++;
        this.save();

        return `Ticket ${this.last}`;
    }

    lastTicket() {
        return `Ticket ${this.last}`;
    }

    lastFourTickets() {
        return this.activeTickets;
    }

    processTicket(desktop) {
        if (this.tickets.length === 0) {
            return 'There are not tickets';
        }

        let numTicket = this.tickets[0].number;
        this.tickets.shift();

        let newTicket = new Ticket(numTicket, desktop);
        this.activeTickets.unshift(newTicket);

        if (this.activeTickets.length > 4) {
            this.activeTickets.splice(-1, 1);       // Remove last item
        }

        console.log('Process tickets...');
        console.log(this.activeTickets);
        this.save();

        return newTicket;
    }

    reset() {
        this.last = 0;
        this.tickets = [];
        this.activeTickets = [];
        this.save();
    }

    save() {
        let newdata = {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            activeTickets: this.activeTickets
        };

        let str = JSON.stringify(newdata);
        fs.writeFileSync('./server/data/data.json', str);
    }

}

module.exports = {
    TicketControl
};
