const request = require('supertest');

const server = require('../api/server.js');

const db = require('../data/dbConnection.js');

describe('plants-router.js', () => {

  it("should user the testing environment", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  beforeEach(async () => {
    await db('plants').truncate();
    await db('users').truncate();
  });

  describe('GET /:id', ()=>{
    it('Should return info for plant with given ID', async ()=>{
      await request(server)
        .post('/api/auth/register')
        .send({
          username: "user",
          password: "password",
          phone_number: "1234567890"
        })
        .then(async result => {
          const token = result.body.token
          await request(server)
            .post('/api/users/1/plants')
            .send({
              nickname: "Poison Ivy",
              species: "Toxicodendron radicans",
              h2o_frequency: "2 times per week"
            })
            .set({authorization: token})
            .then(()=>{
              return request(server)
                .get('/api/plants/1')
                .set({authorization: token})
                .then(res => {
                  expect(res.status).toBe(200)
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
    })
  })


  describe('PUT /:id', ()=>{
    it('Should return UPDATED info for plant with given ID', async ()=>{
      await request(server)
        .post('/api/auth/register')
        .send({
          username: "user",
          password: "password",
          phone_number: "1234567890"
        })
        .then(async result => {
          const token = result.body.token
          await request(server)
            .post('/api/users/1/plants')
            .send({
              nickname: "Poison Ivy",
              species: "Toxicodendron radicans",
              h2o_frequency: "2 times per week"
            })
            .set({authorization: token})
            .then(()=>{
              return request(server)
                .put('/api/plants/1')
                .send({
                  nickname: "Super Poison Ivy",
                  species: "Toxicodendron Radicans",
                  h2o_frequency: "200 times per week"
                })
                .set({authorization: token})
                .then(res => {
                  expect(res.status).toBe(201)
                  expect(res.body).toEqual({
                    plant_id: 1,
                    nickname: "Super Poison Ivy",
                    species: "Toxicodendron Radicans",
                    h2o_frequency: "200 times per week",
                    img_url: null,
                    user: "user"
                  })
                })
            })
        })
    })
  })


  describe('DELETE /:id', ()=>{
    it('Should return successful delete message', async ()=>{
      await request(server)
        .post('/api/auth/register')
        .send({
          username: "user",
          password: "password",
          phone_number: "1234567890"
        })
        .then(async result => {
          const token = result.body.token
          await request(server)
            .post('/api/users/1/plants')
            .send({
              nickname: "Poison Ivy",
              species: "Toxicodendron radicans",
              h2o_frequency: "2 times per week"
            })
            .set({authorization: token})
            .then(()=>{
              return request(server)
                .delete('/api/plants/1')
                .set({authorization: token})
                .then(res => {
                  expect(res.status).toBe(200)
                  expect(res.body).toEqual({message: `Plant with ID 1 has been deleted`})
                })
            })
        })
    })
  })

})