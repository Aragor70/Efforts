const expect = require('chai').expect;
const request = require('supertest');
const tasksRouter = require('../../../server')


describe('Test GET /api/tasks', () => {
    
    before((done) => {
        const titles = ["title1", "title2", "title3", "title4", "title5", ]

        for (let i = 0; i < titles.length; i++) {
            request(tasksRouter.tasks).post('/api/tasks/')
                .send({ title: titles[i] })
                .catch((err) => done(err));
        }
        for (let i = 0; i < titles.length - 1; i++) {
            request(tasksRouter.tasks).put('/api/tasks/' + i)
                .send({ isCompleted: true })
                .catch((err) => done(err));
        }
        done();
        
    })
    


    it ('For Success, Get a correct response with a status and properties, and array of tasks', (done) => {

        request(tasksRouter.tasks).get('/api/tasks/')
            .then((response) => {
            
                expect(response.statusCode).to.equal(200)
                
                const body = response.body
                
                expect(body).to.contain.property('success');
                expect(body).to.contain.property('tasks');
                expect(body.tasks).to.be.an('array');
                expect(body.success).to.be.a('boolean');
                
                done();
            
            }).catch((err) => done(err));
    });

    it ('For Success, Get a filtred array of tasks if pending.', (done) => {

        request(tasksRouter.tasks).get('/api/tasks?status=pending')
            .then((response) => {
            
                expect(response.statusCode).to.equal(200)
                
                const body = response.body
                
                expect(body).to.contain.property('success');
                expect(body).to.contain.property('tasks');
                
                expect(body.tasks).to.be.an('array').to.have.lengthOf.above(0);

                if (body.tasks.length) {
                    expect(body.tasks[0]).to.own.include({completed_at: null});
                }

                done();
            
            }).catch((err) => done(err));
    });

    it ('For Success, Get a filtred array of tasks if completed.', (done) => {

        request(tasksRouter.tasks).get('/api/tasks?status=completed')
            .then((response) => {
            
                expect(response.statusCode).to.equal(200);
                
                const body = response.body;
                
                expect(body).to.contain.property('success');
                expect(body).to.contain.property('tasks');
                
                expect(body.tasks).to.be.an('array').to.have.lengthOf.above(0);


                done();
            
            }).catch((err) => done(err));
    });

    it ('For Success, Get available Efforts homepage, get the head title name.', (done) => {

        request(tasksRouter.tasks).get('/')
            .then((response) => {
            
                expect(response.statusCode).to.equal(200);
                
                const body = response.body;
                
                expect(body).to.not.contain.property('success');

                expect(response.text).to.match(/Efforts/);
                
                done();
            
            }).catch((err) => done(err));
    });


});