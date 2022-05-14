const expect = require('chai').expect;
const request = require('supertest');
const tasksRouter = require('../../../server');




describe('Test POST /api/tasks/', () => {
    
    
    this.tasks = [{title: "title1", id: 1}, {title: "title2", id: 2}, {title: "title3", id: 3}, ];

    

    it ('For Fail, Return err msg when req title contains wrong characters.', (done) => {


        request(tasksRouter.tasks).post('/api/tasks')
            .send({ title: '#error//' })
            .then((response) => {
                
                expect(response.statusCode).to.equal(422)
                
                const body = response.body

                expect(body).to.contain.property('success')
                expect(body).to.contain.property('message')

                expect(body.success).to.equal(false)
                expect(body.message).to.equal("Use letters, numbers, spaces, commas (,) dots (.) dashes (-), or underlines (_).")
                
                done()
                
            }).catch((err) => done(err));
        
    });
    
    it ('For Fail, Return err msg when req body is empty.', (done) => {


        request(tasksRouter.tasks).post('/api/tasks')
            .send({ })
            .then((response) => {
                
                expect(response.statusCode).to.equal(422)
                
                const body = response.body

                expect(body).to.contain.property('success')
                expect(body).to.contain.property('message')

                expect(body.success).to.equal(false)
                expect(body.message).to.equal("Use letters, numbers, spaces, commas (,) dots (.) dashes (-), or underlines (_).")
                
                done()
                
            }).catch((err) => done(err));
        
    });


    it ('For Success, Create a new task.', (done) => {


        request(tasksRouter.tasks).post('/api/tasks')
            .send({ title: "Create a new task with letters, dots, and commas." })
            .then((response) => {
                               
                expect(response.statusCode).to.equal(201)
                
                const body = response.body

                expect(body).to.contain.property('success')
                expect(body).to.contain.property('task')
                expect(body).to.contain.property('message')

                expect(body.message).to.equal("Task Created")
                expect(body.task.title).to.equal("Create a new task with letters, dots, and commas.")
                
                done()
                
            }).catch((err) => done(err));
        
    });

})