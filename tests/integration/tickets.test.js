const request = require('supertest')
const {Ticket} = require('../../models/ticket')
let server;

describe('/api/tickets' , () => {
    beforeEach(() => { server = require('../../index'); })
    afterEach(async () => { 
        server.close(); 
        await Ticket.remove({});
    });

    describe('GET /', () => {
        it('should return all tickets', async () => {
            await Ticket.collection.insertMany([
                {
                    description: "please come before 8.00 am",
                    price: "4000",
                    seat_no: "00785",
                    ref_no: "458963527",
                    user:"60b472b2f361b63df09a3617"
                },
                {
                    description: "please come before 8.00 am",
                    price: "2000",
                    seat_no: "00785",
                    ref_no: "458963527",
                    user:"60b472b2f361b63df09a3617"
                }
            ])
            const res = await request(server).get('/api/tickets');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            
        })  
    })  
})