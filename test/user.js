import chai from 'chai'
import chaiHttp from "chai-http"
import server from "../server"
import User from "../db/model/user"

process.env.NODE_ENV = 'test'

chai.should()
chai.use(chaiHttp)

describe('Users', () => {
    beforeEach((done) => {
        User.remove({}, (err) => { 
           done();         
        });     
    });

    describe('register valid user', () => {
        it('should save user to database', (done) => {
            chai.request(server)
            .post('/register')
            .send({username: "a", email: "a@a", password: "a", password_v: "a"})
            .end((err, res) => {
                res.should.have.status(200)
                res.body.message.should.equal('userInfo saved in db')
                done()
            })
        })
    })
})