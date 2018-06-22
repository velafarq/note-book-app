const chai = require('chai');
const chaiHttp = require('chai-http');

const { runServer, app, closeServer } = require('../server');

chai.use(chaiHttp);
const expect = chai.expect;
const { TEST_DATABASE_URL } = require('../config');
describe('a login function', () => {
  before(function() {
    return runServer();
  });

  after(function() {
      return closeServer();
  });

  it('should return 200 and a token on successful login', () => {
    return chai
      .request(app)
      .get('/auth/login')
      .send({ email: 'some@email.com', password: 'some_password' })
      .then(response => {
        expect(response.status).to.equal(200);
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.key('token');
      });
  });

  it('should return 401 and an error message when incorrect password', () => {
    return chai
      .request(app)
      .get('/auth/login')
      .send({ email: 'some@email.com', password: 'wrong_password' })
      .then(response => {
        expect(response.status).to.equal(401);
        expect(response.body).to.have.key('message');
        expect(response.body.message).to.equal('Password mismatch');
      });
  });

    it('should return 404 and an error message when user not found', () => {
        return chai
            .request(app)
            .get('/auth/login')
            .send({ email: 'no@user.com' })
            .then(response => {
                expect(response.status).to.equal(404);
                expect(response.body).to.have.key('message');
                expect(response.body.message).to.equal('User not found!');
            });
    });
});

describe('a register function', () => {
    before(function() {
        return runServer();
      });
    
      after(function() {
          return closeServer();
      });
      
      it('should return 201 on successful registering', () => {
          return chai
          .request(app)
          .post('/auth/register')
          .send({ email: 'new@user.com', password: 'user_password' })
          .then(response => {
              console.log('HELLOOO', response.body);
              expect(response.status).to.equal(201);

          });
      });

      let token = '';

      it('should return 200 and a token on successful login', () => {
          return chai
              .request(app)
              .get('/auth/login')
              .send({ email: 'new@user.com', password: 'user_password' })
              .then(response => {
                  expect(response.status).to.equal(200);
                  expect(response.body).to.be.a('object');
                  expect(response.body).to.have.key('token');
                  token = response.body.token;
              });
      });

      it('should allow the the newly registered user in the db to login', () => {
        return chai
        .request(app)
        .get('/auth/login')
        .set('authorization', `bearer ${token}`)
        .send({ email: 'new@user.com', password: 'user_password' })
        .then(response => {
            expect(response.status).to.equal(200);
            expect(response.body).to.be.a('object');
            expect(response.body).to.have.key('token');
        
      });
    });
});
