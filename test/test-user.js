

const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../server');

chai.use(chaiHttp);
const expect = chai.expect;

describe('a login function', () => {
    it('should return 200 and a token on successful login', done => {
        chai.request(app)
        .get('/auth/login')
        .send({email: 'some@email.com', password: 'some_password'})
        .then(response => {
            expect(response.status).to.equal(200);
            expect(response.body).to.be.a('object');
            expect(response.body).to.have.key('token');
            done();
        });
    });

    it('should return 404 and an error message when user not found', done => {
        chai.request(app)
        .get('/auth/login')
        .send({ email: 'no@user.com'})
        .then(respone => {
            expect(response.status).to.equal(404);
            expect(response.body).to.have.key('message');
            expect(response.body.message).to.equal('User not found!');
            done();
            
        });
    });

    it('should return 401 and an error message when incorrect password', done => {
        chai.request(app)
        .get('auth/login')
        .send({ email: 'some@email.com', password: 'wrong_password'})
        .then(response => {
            expect(response.status).to.equal(401);
            expect(response.body).to.have.key('message');
            expect(response.body.message).to.equal('Password mismatch');
            done();
        });
    });
});


