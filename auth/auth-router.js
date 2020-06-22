const router = require('express').Router();

const Users = require('../users/users-model.js');

const Plants = require('../plants/plants-model.js');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

const constants = require('../config/constants.js');

function createToken(user){
  const payload = {
    subject: user.id,
    username: user.username,
    phone_number: user.phone_number
  };
  const secret = constants.jwtSecret
  const options = {
    expiresIn: '5d'
  };
  return jwt.sign(payload, secret, options);
}

router.post('/register', validateNewUser, (req, res) => {
  const rounds = process.env.HASH_ROUNDS || 12;
  const hash = bcrypt.hashSync(req.body.password, rounds)
  const newUser = {
    username: req.body.username,
    password: hash,
    phone_number: req.body.phone_number
  }
  Users.add(newUser)
    .then(user => {
      console.log(user)
      const token = createToken(user)
      res.status(201).json({new_user: user, token})
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: `An Error occurred when attempting to register ${req.body.username}`})
    });
});


router.post('/login', validateLogin, (req, res) => {
  Users.login(req.body.username)
    .then(user => {
      console.log(user)
      if (Object.keys(user).length === 0) {
        res.status(401).json({message: 'Invalid Username'})
      } else if (Object.keys(user).length > 0 && bcrypt.compareSync(req.body.password, user.password)){
        const token = createToken(user);
        res.status(200).json({
          welcome: user.username,
          user_id: user.id,
          phone_number: user.phone_number,
          token
        });
      } else {
        res.status(401).json({message: 'Incorrect Password'});
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message: 'An Error occurred while attempting to log you in'});
    });
});


router.get('/plants', (req, res) => {
  Plants.find()
    .then(list => res.status(200).json(list))
    .catch(err => {
      console.log(err)
      res.status(500).json({message: 'An Error occurred when retrieving a list of Plants'})
    })
})


function validateNewUser (req, res, next){
  if(Object.keys(req.body).length === 0){
    res.status(401).json({message: 'No User Data provided'});
  } else if(!req.body.username || !req.body.password || !req.body.phone_number){
    res.status(401).json({message: 'Username, Password, and Phone Number are ALL REQUIRED!'});
  } else {
    next();
  }
}

function validateLogin (req, res, next){
  if(Object.keys(req.body).length === 0){
    res.status(400).json({message: 'No Credentials provided'});
  } else if(!req.body.username || !req.body.password){
    res.status(400).json({message: 'Username AND Password are REQUIRED!'});
  } else {
    next();
  }
}


module.exports = router;