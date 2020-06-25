const request = require('supertest');

const server = require('../api/server.js');

const db = require('../data/dbConnection.js');


describe('auth-router.js', () => {

  it("should user the testing environment", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  beforeEach(async () => {
    await db('users').truncate();
    await db('plants').truncate();
  });

  describe('POST /register', () => {

    it('Should return an Object with "new_user" info, and a token', () => {
      return request(server)
        .post('/api/auth/register')
        .send(
          {
            username: "PamelaIsley",
            password: "strongpassword",
            phone_number: "1234567890",
          } // closes object line 26
        ) // closes .send line 25
        .then(res => {
          expect(res.body)
            .toEqual(
              expect.objectContaining(
                {
                  new_user: {
                    id: 1,
                    username: "PamelaIsley",
                    phone_number: "1234567890"
                  },
                  token: expect.any(String)
                } // closes object line 36
              ) // closes expect.objectContaining line 35
            ) // closes .toEqual line 34
        }) // closes .then line 32

    }) // closes it('Should return an Object...) line 21
    
    
    it('Should return Error message when some user info is missing', () => {
      return request(server)
        .post('/api/auth/register')
        .then(res => {
          expect(res.status).toBe(401)
          expect(res.body).toEqual({message: 'No User Data provided'})
        })
    })


  }) //closes describe('POST /register') line 19


  describe('POST /login', () => {
    it('Should return Error message when credentials are not provided', () => {
      return request(server)
        .post('/api/auth/login')
        .send({username: "user"})
        .then(res => {
          expect(res.status).toBe(400)
          expect(res.body).toEqual({message: 'Username AND Password are REQUIRED!'})
        })// closes .then line 68
    })

    it('Should return Welcome, user id, phone number, and token', async () => {
      await request(server)
        .post('/api/auth/register')
        .send(
          {
            username: "PamelaIsley",
            password: "strongpassword",
            phone_number: "1234567890",
          }
        )

      return request(server)
          .post('/api/auth/login')
          .send({username: "PamelaIsley", password: "strongpassword"})
          .then(res => {
            expect(res.body)
              .toEqual(
                expect.objectContaining({
                  welcome: "PamelaIsley",
                  user_id: 1,
                  phone_number: "1234567890",
                  token: expect.any(String)
                })// closes expect.objectContaining line 91
              )//closes .toEqual line 90
          })//closes .then line 88
    })//closes It('should return Welcome, user id...) line 74
  })// closes Describe (POST /login) line 63


  describe('GET /plants', () => {
    it('Should return an array of all plants in the database', ()=>{
      return request(server)
        .get('/api/auth/plants')
        .then(res => {
          expect(res.status).toBe(200)
          expect(res.body).toHaveLength(0)
        })
    })
  })
}) //closes describe('auth-router.js') line 8