const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined') {
      
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];

      req.token = bearerToken;

      next();
    } else {
      res.sendStatus(403);
    }
  
  };

router.get('/getUsers', usersController.getUsers);
router.get('/getUserById', usersController.getUserById);
router.get('/getUserByEmail', usersController.getUserByEmail);
router.get('/getStatistics',verifyToken, usersController.getStatistics);
router.post('/insertUser', usersController.insertUser);
router.put('/updateUserByid', usersController.updateUserByid);


module.exports = router;