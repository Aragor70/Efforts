const expect = require('chai').expect;
const request = require('supertest');
const tasksRouter = require('../../../server')


describe('Test DELETE /api/tasks/:id', () => {
    
    this.tasks = [{title: "title1", id: 1}, {title: "title2", id: 2}, {title: "title3", id: 3}, ];

    before((done) => {

        for (let i = 0; i < this.tasks.length; i++) {
            request(tasksRouter.tasks).post('/api/tasks/')
                .send({ title: this.tasks[i].title })
                .catch((err) => done(err));
        }
        done();
        
    })
    

    it ('For Success, Return a deleted task or 404 not found.', (done) => {

        request(tasksRouter.tasks).post('/api/tasks')
            .send({ title: this.tasks[0].title }).then(() => {

                request(tasksRouter.tasks).delete('/api/tasks/' + this.tasks[0].id)
                .send({ })
                .then((response) => {

                    expect(response.statusCode).to.be.within(200, 404);


                    const body = response.body

                    expect(body).to.contain.property('success')
                    expect(body).to.contain.property('message')
                    
                    done()
                    
                }).catch((err) => done(err));

            
        })
        .catch((err) => done(err));
    });

    it ('For Fail, Return 404 when task was not found.', (done) => {

        request(tasksRouter.tasks).delete('/api/tasks/' + 3)
            .send({ }).then(() => {

                request(tasksRouter.tasks).delete('/api/tasks/' + 3)
                    .send({ })
                    .then((response) => {
                        
                        expect(response.statusCode).to.equal(404)
                        
                        const body = response.body

                        expect(body).to.contain.property('success')
                        expect(body).to.contain.property('message')

                        
                        expect(body.success).to.equal(false)

                        done()
                        
                    }).catch((err) => done(err));

            
        })
        .catch((err) => done(err));


        
        
    });
    

})