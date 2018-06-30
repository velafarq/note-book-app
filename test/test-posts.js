'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const { runServer, app, closeServer } = require('../server');

const { Post } = require('../api/post/post.model');
// const { TEST_DATABASE_URL } = require('../config/globals.config');

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
    const categories = ['Lessons', 'Practice Sessions', 'Performances', 'Master Classes', 'Other']
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    for (let i = 1; i <= 10; i++) {
      seedData.push({
        author: "5b37d6df9b4eb968b0303bc5",
        title: faker.lorem.sentence(),
        content: faker.lorem.text(),
        category: randomCategory
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
                .post('/auth/login')
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
                return Post.count({author: "5b37d6df9b4eb968b0303bc5"});
            })
            .then(count => {
                expect(res.body).to.have.lengthOf(count);
            });
        });

    });

    describe('POST endpoint', function() {
  
        it('should add a new post to the database', function () {
            const newPost = {
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
            console.log(response.body);
            expect(response.status).to.equal(201);
            expect(response.body).to.include.key('_id');

            return Post.findOne({_id: response.body._id, author: "5b37d6df9b4eb968b0303bc5"});
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
            .findOne({author: "5b37d6df9b4eb968b0303bc5"})
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
            .findOne({author: "5b37d6df9b4eb968b0303bc5"})
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




