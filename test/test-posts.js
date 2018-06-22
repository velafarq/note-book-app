'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const { runServer, app, closeServer } = require('../server');

const Post = require('../post-model');
const { TEST_DATABASE_URL } = require('../config');

chai.use(chaiHttp);
const expect = chai.expect;

function tearDownDb() {
    return new Promise((resolve, reject) => {
      console.warn('Deleting database');
      mongoose.connection.dropDatabase()
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  }

  
  function seedPostData() {
    console.info('seeding post data');
    const seedData = [];
    for (let i = 1; i <= 10; i++) {
      seedData.push({
        email: 'some@email.com',
        title: faker.lorem.sentence(),
        body: faker.lorem.text(),
        category: 'Lesson'
      });
    }
    // this will return a promise
    return Post.insertMany(seedData);
  } 


describe('posts API resource', function() {
    before(function() {
        return runServer();
    });

    // beforeEach(function() {
    //     return seedPostData();
    // });

    // afterEach(function () {
    //     return tearDownDb();
    // });

    after(function() {
        return closeServer();
    });

    let token = '';
    describe('GET endpoint', function () {

   
        it('should return 200 and a token on successful login', () => {
            return chai
                .request(app)
                .get('/auth/login')
                .send({ email: 'some@email.com', password: 'some_password' })
                .then(response => {
                    expect(response.status).to.equal(200);
                    expect(response.body).to.be.a('object');
                    expect(response.body).to.have.key('token');
                    token = response.body.token;
                });
        });

        it('should return all posts', function() {
            let res;
            return chai.
            request(app)
            .get('/posts')
            .set('authorization', `bearer ${token}`)
            .then(response => {
                res = response;
                expect(res.status).to.equal(200);
                expect(res.body).to.have.lengthOf.at.least(1);  
                return Post.count({});
            })
            .then(count => {
                expect(res.body).to.have.lengthOf(count);
            });
        });

    });

    describe('POST endpoint', function() {
        //do I need to have this again or is it OK to reuse the value from the previous test?

        // it('should return 200 and a token on successful login', () => {
        //     return chai
        //         .request(app)
        //         .get('/auth/login')
        //         .send({ email: 'some@email.com', password: 'some_password' })
        //         .then(response => {
        //             expect(response.status).to.equal(200);
        //             expect(response.body).to.be.a('object');
        //             expect(response.body).to.have.key('token');
        //             token = response.body.token;
        //         });
        // });

        it('should add a new post to the database', function () {
            const newPost = {
                email: "some@email.com",
                title: faker.lorem.sentence(),
                content: faker.lorem.text(),
                category: "Performance"
            };
            
        return chai
        .request(app)
        .post('/posts')
        .set('authorization', `bearer ${token}`)
        .send(newPost)
        .then(response => {
            expect(response.status).to.equal(201);
            expect(response).to.be.json;
            expect(response.body).to.be.a('object');
            expect(response.body).to.include.keys("email", "title", "content", "category", "_id");
            expect(response.body.email).to.equal(newPost.email),
            expect(response.body.category).to.equal(newPost.category)
            expect(response.body.content).to.equal(newPost.content),
            expect(response.body._id).to.not.be.null;
            return Post.findById(response.body._id);
        })   
        .then(post => {
            expect(post.category).to.equal(newPost.category);
            expect(post.title).to.equal(newPost.title);
            expect(post.content).to.equal(newPost.content);
            expect(post.email).to.equal(newPost.email);
            });
        });
    });

    describe('PUT endpoint', function() {
        it('should update a post based on its _id', function() {

            const updatedPost = {
                title: faker.lorem.sentence(),
                category: "Master Class",
            
            };

            return Post
            .findOne()
            .then(post => {
                updatedPost._id = post._id;

                return chai
                .request(app)
                .put(`/posts/${post._id}`)
                .set('authorization', `bearer ${token}`)
                .send(updatedPost);
            })
            .then(res => {
                expect(res.status).to.equal(204);
            });

        });
    });

    describe('DELETE endpoint', function() {
        it('should delete a post based on its _id', function() {
            let post;

            return Post
            .findOne()
            .then(_post => {
                post = _post;
                return chai
                .request(app)
                .delete(`/posts/${post._id}`)
                .set('authorization', `bearer ${token}`)
            })
            .then(res => {
                expect(res.status).to.equal(204);
                return Post.findById(post._id);
            })
            .then(_post => {
                expect(_post).to.be.null;
            });
        });
    });

});




