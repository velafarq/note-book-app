'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const jsonwebtoken = require('jsonwebtoken');

const JWT_SECRET = '12345';

const { runServer, app, closeServer } = require('../server');

const { Post } = require('../api/post/post.model');
const User = require('../api/user/user.model');
const { TEST_DATABASE_URL } = require('../config/globals.config');

chai.use(chaiHttp);
const expect = chai.expect;

//fake user info
const fakeEmail = faker.internet.email();
const fakePassword = faker.internet.password();
let testUser = {};

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
    const categories = ['Lessons', 'Practice Sessions', 'Performances', 'Master Classes', 'Other']
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    for (let i = 1; i <= 10; i++) {
      seedData.push({
        author: testUser._id,
        title: faker.lorem.sentence(),
        content: faker.lorem.text(),
        category: randomCategory
      });
    }
 
    return Post.insertMany(seedData);
  } 


describe('posts API resource', function() {
    before(function() {
        return runServer(TEST_DATABASE_URL);
    });

    before(function() {
        
        return User
        .create({email: fakeEmail, password: fakePassword})
        .then(user => {
            testUser._id = user._id;
            

        });
 
    });


    before(function() {
        
        return seedPostData();
    });

    after(function () {
        return tearDownDb();
    });

    after(function() {
        return closeServer();
    });

    let token = '';
 

    describe('GET endpoint', function () {
        seedPostData();
        it('should return 200 and a token on successful login', () => {
            return chai
                .request(app)
                .post('/auth/login')
                .send({ email: fakeEmail, password: fakePassword })
                .then(response => {
                    expect(response.status).to.equal(200);
                    expect(response.body).to.be.a('object');
                    expect(response.body).to.have.key('token');
                    
                    token = response.body.token;
                    
                    
                });
        });

        it('should return all posts from a specific user', function() {
            
            let res;
            return chai.
            request(app)
            .get('/posts')
            .set('authorization', `bearer ${token}`)
            .then(response => {
                res = response;
                expect(res.status).to.equal(200);
                expect(res.body).to.have.lengthOf.at.least(1);  
                return Post.count({author: testUser._id});
            })
            .then(count => {
                expect(res.body).to.have.lengthOf(count);
            });
        });

    });

    describe('GET by Id endpoint', function() {
        
        it('should find a post based on its unique id', function () {
            let foundPost = {};
            
            Post.findOne({author: testUser._id})
            .then(post => {
                foundPost._id = post._id;

                 return chai
                .request(app)
                .get(`/posts/${foundPost._id}`)
                .set('authorization', `bearer ${token}`)
                .then(res => {
                    expect(res.status).to.equal(200);
                    expect(res.body._id).to.equal(post._id);
                    expect(res.body._id).to.equal(foundPost._id);
                    expect(res.body.author).to.equal(post.author);
                    expect(res.body.title).to.equal(post.title);
                    expect(res.body.category).to.equal(post.category);
                    expect(res.body.content).to.equal(post.conetnt);

                });
            });

        });
    });

    describe('POST endpoint', function() {
  
        it('should add a new post to the database', function () {
            const newPost = {
                title: faker.lorem.sentence(),
                content: faker.lorem.text(),
                category: "Performance",
            };
            
        return chai
        .request(app)
        .post('/posts')
        .set('authorization', `bearer ${token}`)
        .send(newPost)
        .then(response => {
            
            expect(response.status).to.equal(201);
            expect(response.body).to.include.keys('_id');
            expect(response.body._id).to.not.be.null;

            return Post.findOne({_id: response.body._id, author: testUser._id});
        })
        .then(post => {
            expect(post.category).to.equal(newPost.category);
            expect(post.title).to.equal(newPost.title);
            expect(post.content).to.equal(newPost.content);
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
            .findOne({author: testUser._id})
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
            .findOne({author: testUser._id})
            .then(_post => {
                post = _post;
                return chai
                .request(app)
                .delete(`/posts/${post._id}`)
                .set('authorization', `bearer ${token}`)
            })
            .then(res => {
                expect(res.status).to.equal(200);
                return Post.findById(post._id);
            })
            .then(_post => {
                expect(_post).to.be.null;
            });
        });
    });

});




