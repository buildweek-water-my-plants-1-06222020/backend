const request = require('supertest');

const server = require('../api/server.js');

const db = require('../data/dbConnection.js');


describe('users-router.js', () => {

  it("should user the testing environment", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  beforeEach(async () => {
    await db('users').truncate();
    await db('plants').truncate();
  });

  describe('GET /', ()=>{
    it('Should return an array of users', async ()=>{
      let token = ""

      await request(server)
        .post('/api/auth/register')
        .send({
          username: "user",
          password: "password",
          phone_number: "1234567890"
        })//closes .send line 23
        .then(result => token = result.body.token);
      
      return request(server)
        .get('/api/users')
        .set({authorization: token})
        .then(res => {
          expect(res.body).toHaveLength(1)
        })//closes .then line 35
      
    })//closes it('Should return an array...) line 20
    

    it('Should return an error when no token is provided', async ()=>{
      let token = ""

      await request(server)
        .post('/api/auth/register')
        .send({
          username: "user",
          password: "password",
          phone_number: "1234567890"
        })//closes .send line 44
        .then(result => token = result.body.token);
      
      return request(server)
        .get('/api/users')
        .then(res => {
          expect(res.status).toBe(401)
          expect(res.body).toEqual({ message: "You must be logged in to access this data" })
        })//closes .then line 56

    })//closes it('Should return an error...) line 42

  })//closes describe('GET /') line 19


  describe('GET /:id', ()=>{

    it('Should return the users info', async ()=>{
      let token = ""

      await request(server)
        .post('/api/auth/register')
        .send({
          username: "user",
          password: "password",
          phone_number: "1234567890"
        })//closes .send line 71
        .then(result => token = result.body.token);
      
      return request(server)
        .get('/api/users/1')
        .set({authorization: token})
        .then(res => {
          expect(res.body)
            .toEqual(expect.objectContaining(
              {
                id: 1,
                username: "user",
                phone_number: "1234567890"
              }//closes object line 87
            ))//closes .toEqual line 85
        })//closes .then line 83
      
    })//closes it('Should return users info) line 68
    

    it('Should return an error when no token is provided', async ()=>{
      let token = "";

      await request(server)
        .post('/api/auth/register')
        .send({
            username: "user",
            password: "password",
            phone_number: "1234567890"
        })//closes .send line 93
        .then(result => token = result.body.token);
      
      return request(server)
        .get('/api/users/1')
        .then(res => {
          expect(res.status).toBe(401)
          expect(res.body).toEqual({ message: "You must be logged in to access this data" })
        })//closes .then line 104
        
    })//closes it('Should return an error...) line 90

  })//closes describe('GET /:id') line 66


  describe('GET /:id/plants', ()=>{
    
    it('Should return a list of plants for the user', async ()=>{
      let token = "";

      await request(server)
        .post('/api/auth/register')
        .send({
            username: "user",
            password: "password",
            phone_number: "1234567890"
        })//closes .send line 128
        .then(result => token = result.body.token);
      
      return request(server)
        .get('/api/users/1/plants')
        .set({authorization: token})
        .then(res => {
          expect(res.status).toBe(200)
          expect(res.body).toHaveLength(0)
        })//closes .then line 139
        
    })


    it('should return an error if no token is provided', async () =>{
      let token = "";

      await request(server)
        .post('/api/auth/register')
        .send({
            username: "user",
            password: "password",
            phone_number: "1234567890"
        })//closes .send line 150
        .then(result => token = result.body.token);
      
      return request(server)
        .get('/api/users/1/plants')
        .then(res => {
          expect(res.status).toBe(401)
          expect(res.body).toEqual({ message: "You must be logged in to access this data" })
        })//closes .then line 161
        
    })

  })


  describe('POST /:id/plants', ()=>{
    it('Should return newly created plant info', async ()=>{
      let token = "";

      await request(server)
        .post('/api/auth/register')
        .send({
            username: "user",
            password: "password",
            phone_number: "1234567890"
        })
        .then(result => token = result.body.token);
      
      return request(server)
        .post('/api/users/1/plants')
        .send({
          nickname: "Poison Ivy",
          species: "Toxicodendron radicans",
          h2o_frequency: "2 times per week"
        })
        .set({authorization: token})
        .then(res => {
          expect(res.status).toBe(201)
          expect(res.body).toEqual({
            plant_id: 1,
            nickname: "Poison Ivy",
            species: "Toxicodendron radicans",
            h2o_frequency: "2 times per week",
            img_url: null,
            user: "user"
          })
        })
        
    })

  })


  describe('PUT /:id', ()=>{
    it('Should return UPDATED user info', async ()=>{
      let token = "";

      await request(server)
        .post('/api/auth/register')
        .send({
            username: "user",
            password: "password",
            phone_number: "1234567890"
        })
        .then(result => token = result.body.token);
      
      return request(server)
        .put('/api/users/1')
        .send({phone_number: "5555555555"})
        .set({authorization: token})
        .then(res => {
          expect(res.status).toBe(200)
          expect(res.body).toEqual({
            id: 1,
            username: "user",
            phone_number: "5555555555"
          })
        })
        
    })

  })


  describe('DELETE /:id', ()=>{
    it('Should return a success message after deletion', async ()=>{
      let token = "";

      await request(server)
        .post('/api/auth/register')
        .send({
            username: "user",
            password: "password",
            phone_number: "1234567890"
        })
        .then(result => token = result.body.token);
      
      return request(server)
        .delete('/api/users/1')
        .set({authorization: token})
        .then(res => {
          expect(res.status).toBe(200)
          expect(res.body).toEqual({message: `User with ID 1 has been deleted`})
        })
        
    })
  
  })

})