const router = require('express').Router();

const Plants = require('./plants-model.js');


router.get('/:id', validateID, (req, res) => {
  Plants.findByID(req.params.id)
    .then(plant => res.status(200).json(plant))
    .catch(err => {
      console.log(err)
      res.status(500).json({message: `An Error occurred when retrieving Plant with ID ${req.params.id}`})
    })
})


router.put('/:id', validateID, validatePlant, (req, res) => {
  Plants.update(req.params.id, req.body)
    .then(updated => res.status(201).json(updated))
    .catch( err => {
      console.log(err)
      res.status(500).json({message: `An Error occurred when attempting to Update Plant with ID ${req.params.id}`})
    })
})


router.delete('/:id', validateID, (req, res) => {
  Plants.remove(req.params.id)
    .then(removed => res.status(200).json({message: `Plant with ID ${req.params.id} has been deleted`}))
    .catch(err => {
      console.log(err);
      res.status(500).json({message: `An Error occurred when attempting to Delete Plant with ID ${req.params.id}`});
    });
})


function validateID (req, res, next){
  Plants.findByID(req.params.id)
    .then(user => {
      if (!user) {
        res.status(400).json({message: 'Invalid Plant ID'});
      } else {
        next();
      }
    });
}

function validatePlant (req, res, next){
  if(Object.keys(req.body).length === 0){
    res.status(401).json({message: 'No User Data provided'});
  } else if(!req.body.nickname || !req.body.species || !req.body.h2o_frequency){
    res.status(401).json({message: 'Nickname, Species, and H20 Frequency are ALL REQUIRED!'});
  } else {
    next();
  }
}


module.exports = router;