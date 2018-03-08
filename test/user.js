let chai = require('chai')
let chaiHttp = require("chai-http");
let server = require("../server")

process.env.NODE_ENV = 'test'

chai.should()
chai.use(chaiHttp)

describe('Users', () => {
    describe('register valid user', () => {
        it('it should save user to database', (done) => {
            chai.request(server)
            .post('/register')
            .send({username: "b", email: "b@b", password: "b", password_v: "b"})
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
        })
    })
})