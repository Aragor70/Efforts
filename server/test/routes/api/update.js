const expect = require('chai').expect;
const request = require('supertest');
const tasksRouter = require('../../../server')


describe('Test PUT /api/tasks/:id', () => {
    
    this.tasks = [{title: "title1", id: 1}, {title: "title2", id: 2}, {title: "title3", id: 3}, ];


    before((done) => {

        for (let i = 0; i < this.tasks.length; i++) {
            request(tasksRouter.tasks).post('/api/tasks/')
                .send({ title: this.tasks[i] })
                .catch((err) => done(err));
        }
        done();
        
    })
    
    it ('For Fail, Return err msg when req title contains wrong characters.', (done) => {

        request(tasksRouter.tasks).put('/api/tasks/2')
            .send({ title: '#error//' })
            .then((response) => {
                
                expect(response.statusCode).to.be.within(404, 422);

                const body = response.body

                expect(body).to.contain.property('success')
                expect(body).to.contain.property('message')

                if(response.statusCode === 422) {
                    expect(body.message).to.equal("Use letters, numbers, spaces, commas (,), dots (.), dashes (-), or underlines (_).")
                } else {
                    expect(body.message).to.equal("Task does not exist.")
                }
                expect(body.success).to.equal(false)
                
                
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
                
                expect(response.statusCode).to.be.within(200, 404);

                const body = response.body;

                expect(body).to.contain.property('success');
                expect(body).to.contain.property('message');

                
                done()
                
            }).catch((err) => done(err));
        
    });


    it ('For Success, Update title.', (done) => {


        request(tasksRouter.tasks).put('/api/tasks/2')
            .send({ title: "Update the task." })
            .then((response) => {

                expect(response.statusCode).to.be.within(200, 404);
                
                const body = response.body;

                expect(body).to.contain.property('success');
                expect(body).to.contain.property('message');

                if (response.statusCode === 200) {
                    expect(body).to.contain.property('task')
                    expect(body.message).to.equal("Task was updated.")
                    expect(body.task.title).to.equal("Update the task.")
                }
                
                done()
                
            }).catch((err) => done(err));
        
    });

    it ('For Success, Update status to completed or return status 404.', (done) => {


        request(tasksRouter.tasks).put('/api/tasks/2')
            .send({ isCompleted: true })
            .then((response) => {

                expect(response.statusCode).to.be.within(200, 404);
                
                const body = response.body

                expect(body).to.contain.property('success')
                expect(body).to.contain.property('message')

                if (response.statusCode === 200) {
                    expect(body).to.contain.property('task')
                    expect(body.message).to.equal("Task was updated.")
                }

                
                done()
                
            }).catch((err) => done(err));
        
    });

})