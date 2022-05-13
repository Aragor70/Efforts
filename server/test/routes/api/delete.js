const expect = require('chai').expect;
const request = require('supertest');
const tasksRouter = require('../../../server')


describe('Test DELETE /api/tasks/:id', () => {
    
    before((done) => {
        const titles = ["title1", "title2", "title3", ]

        for (let i = 0; i < titles.length; i++) {
            request(tasksRouter.tasks).post('/api/tasks/')
                .send({ title: titles[i] })
                .catch((err) => done(err));
        }
        done();
        
    })
    
    it ('For Success, Return a deleted task.', (done) => {

        request(tasksRouter.tasks).delete('/api/tasks/1')
            .send({ })
            .then((response) => {
                
                const body = response.body

                expect(body).to.contain.property('success')
                expect(body).to.contain.property('message')

                expect(body.success).to.equal(false)
                
                done()
                
            }).catch((err) => done(err));
        
    });

    it ('For Fail, Return 404 when task was not found.', (done) => {

        request(tasksRouter.tasks).delete('/api/tasks/1')
            .send({ })
            .then((response) => {
                
                expect(response.statusCode).to.equal(404)
                
                const body = response.body

                expect(body).to.contain.property('success')
                expect(body).to.contain.property('message')
                done()
                
            }).catch((err) => done(err));
        
    });
    

})