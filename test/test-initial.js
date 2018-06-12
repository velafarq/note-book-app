const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { app } = require('../server');

describe('My root url is working', function() {
    it('should get a 200 status code and html', function() {
        return chai.request(app)
        .get('/')
        .then(function(res){
            expect(res).to.have.status(200);
            expect(res).to.be.html;

        });
    });
    
});

// Add one test Add one test that verifies that when 
// you hit up the root url for your client, 
// you get a 200 status code and HTML.