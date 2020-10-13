const con = require('../utils/database');


module.exports = auth = async (req, res, next) => {
    
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        //console.log(req.token);
        // Next middleware
        next();
      } else {
        // Forbidden
        res.sendStatus(403);
      }
}
