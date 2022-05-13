const expect = require('chai').expect;
const request = require('supertest');
const tasksRouter = require('../../../server')


describe('Test PUT /api/tasks/:id', () => {
    
    before((done) => {
        const titles = ["title1", "title2", "title3", "title4", "title5", ]

        for (let i = 0; i < titles.length; i++) {
            request(tasksRouter.tasks).post('/api/tasks/')
                .send({ title: titles[i] })
                .catch((err) => done(err));
        }
        done();
        
    })
    
    it ('For Fail, Return err msg when req title contains wrong characters.', (done) => {

        request(tasksRouter.tasks).put('/api/tasks/2')
            .send({ title: '#error//' })
            .then((response) => {
                
                const body = response.body

                expect(body).to.contain.property('success')
                expect(body).to.contain.property('message')

                console.log(body)
                expect(body.success).to.equal(false)
                expect(body.message).to.equal("Use letters, numbers, spaces, commas (,), dots (.), dashes (-), or underlines (_).")
                
                done()
                
            }).catch((err) => done(err));
        
    });
    
    it ('For Fail, Return 404 when params is undefined.', (done) => {

        request(tasksRouter.tasks).put('/api/tasks/')
            .send({ title: 'title1' })
            .then((response) => {
                
                expect(response.statusCode).to.equal(404)

                done()
                
            }).catch((err) => done(err));
        
    });
    
    it ('For Fail, Return the same task if req body is empty', (done) => {

        request(tasksRouter.tasks).put('/api/tasks/2')
            .send({ })
            .then((response) => {
                
                expect(response.statusCode).to.equal(200)

                const body = response.body

                expect(body).to.contain.property('success')
                expect(body).to.contain.property('message')
                expect(body).to.contain.property('task')

                expect(body.success).to.equal(true)
                
                done()
                
            }).catch((err) => done(err));
        
    });


    it ('For Success, Update title.', (done) => {


        request(tasksRouter.tasks).put('/api/tasks/2')
            .send({ title: "Update the task." })
            .then((response) => {

                expect(response.statusCode).to.equal(200)
                
                const body = response.body

                expect(body).to.contain.property('success')
                expect(body).to.contain.property('task')
                expect(body).to.contain.property('message')

                expect(body.message).to.equal("Task was updated.")
                expect(body.task.title).to.equal("Update the task.")
                
                done()
                
            }).catch((err) => done(err));
        
    });

    it ('For Success, Update status.', (done) => {


        request(tasksRouter.tasks).put('/api/tasks/2')
            .send({ status: 'completed' })
            .then((response) => {

                expect(response.statusCode).to.equal(200)
                
                const body = response.body

                expect(body).to.contain.property('success')
                expect(body).to.contain.property('task')
                expect(body).to.contain.property('message')

                expect(body.message).to.equal("Task was updated.")
                
                done()
                
            }).catch((err) => done(err));
        
    });

})