//const request = require('supertest');
const app = require('./server');
// Import database operations
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

let db;
/*beforeAll(async () => {

  //connect to Mongo DB
  const url = 'mongodb+srv://vscoder:vscoder@cluster0.tdk3o.mongodb.net/final?retryWrites=true&w=majority';
  db = await mongoose.connect(url);
})*/

async function removeAllCollections () {
  const collections = Object.keys(mongoose.connection.collections)
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName]
    await collection.deleteMany()
  }
}
//cleanup database
afterEach(async () => {
  await removeAllCollections()
})

const url = 'mongodb+srv://vscoder:vscoder@cluster0.tdk3o.mongodb.net/final?retryWrites=true&w=majority';
  db =  mongoose.connect(url);

describe('API & integration tests', () => {
  test.only('user saved to database', async done => {
    
    const res = await request(app).post('/api/user')
    .send({
      username:'test_user',
      firstname:'',
      lastname:'',
      password:''
    })
    const user = await db.findOne({ username:'test_user'});
    console.log(user);
    done();
  },10000)

  test('test 1: Register status code',  () => {
    const res = {
        username:'test_user',
        firstname:'',
        lastname:'',
        password:''
    };
  
      // Searches the user in the database
     // const user = await db.findOne({username:'testusername'});
      
    request(app)
    .post('/api/user')
    .send({res})//send post req 
    .expect(201)
  },)
    
})

 
/*
    test('The username is in the database', async () => {
        const insertedUser = await db.collection('User').findOne({ username: 'test_user' });
        request(app)
        post('/api/user').send(insertedUser)
        .expect(409)
        .then((response) => {
            expect(JSON.parse(response.text).error).toBe('User with this username already exists');
        });
      });
    /*
    test('test 2: Register status code',  () => {
        request(app)
        .post('/api/user')
        .send({username:'ll'})
        .expect(201); // testing the response status code
        
    })
    test('test 3: login success if credential is valid',  () => {
        request(app).post('/api/login')
        .send({username:'ll',password:'password'})
        .expect(200)
         // testing the response status code
    })
    test('test 4: login fail if password is non-valid',  (done) => {
        request(app).post('/api/login')
        .send({username:'ll',password:''})
        .expect(409)
        done();
         // testing the response status code
    })
    test('test 5: get user by id, not found',  async (done) => {
        request(app).post('/api/user/:id')
        .send({})
        .expect(409)
        done();
         // testing the response status code
    })
    test('test 6: get user by id',  () => {
        
        request(app).post('/api/user/:id')
        .send({_id})
        .expect(201)
        
         // testing the response status code
    })
    test('test 7: create new group',   () => {
        //const group_test =
        request(app).post('/api/group')
        .send({ name: 'group_test' })
        .expect(200)
        
        
         // testing the response status code
    })
*/


