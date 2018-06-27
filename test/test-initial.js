const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { runServer, app, closeServer } = require('../server');

describe('My root url is working', function() {
    before(function() {
        return runServer();
    });

    after(function() {
        return closeServer();
    });

    let token = '';

    it('should return 200 and a token on successful login', () => {
        return chai
            .request(app)
            .post('/auth/login')
            .send({ email: 'some@email.com', password: 'some_password' })
            .then(response => {
                expect(response.status).to.equal(200);
                expect(response.body).to.be.a('object');
                expect(response.body).to.have.key('token');
                token = response.body.token;
            });
    });

    it('should get a 200 status code and html', function() {
        return chai.request(app)
        .get('/')
        .set('authorization', `bearer ${token}`)
        .then(function(res){
            expect(res.status).to.equal(200);
            expect(res).to.be.html;

        });
    });
    
});

// Add one test Add one test that verifies that when 
// you hit up the root url for your client, 
// you get a 200 status code and HTML.