var jwt = require('jwt-simple');
var validateUser = require('./auth').validateUser;


//To access login send a POST request to    http://localhost:3000/login 
//{"username":"admin1@myapp.com", "password":"p1"}
//and get the token      user token and password as follow to access a secure link 

//Use this link in Postman or browser to access a resource 
//http://localhost:3000/rest/v1/products?access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MzM4MDU3MTI5OTR9.pMsBmvQhHUOWkd3fV_8h38beHaQylxXK69mkwCTKnxU&x_key=admin1@myapp.com


module.exports = function(req, res, next) {

  // When performing a cross domain request, you will recieve
  // a preflighted request first. This is to check if our the app
  // is safe.

  // We skip the token outh for [OPTIONS] requests.
  //if(req.method == 'OPTIONS') next();

  console.log("first check the user ----------");

  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
  var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];

  console.log(token)
  console.log(key)

  
  if (token || key) {
    try {
      var decoded = jwt.decode(token, require('./jwt-simple-secret.js')());

      if (decoded.exp <= Date.now()) {
        res.status(400);
        res.json({
          "status": 400,
          "message": "Token Expired"
        });
        return;
      }

      // Authorize the user to see if s/he can access our resources

      var dbUser = validateUser(key); // The key would be the logged in user's username
      if (dbUser) {


        if ((req.url.indexOf('admin') >= 0 && dbUser.role == 'admin') || (req.url.indexOf('admin') < 0 && req.url.indexOf('/rest/v1/') >= 0)) {
            next(); // To move to next middleware
        }
        else
        {
          res.status(403);
          res.json({
            "status": 403,
            "message": "Not Authorized"
          });
          return;
        }
      } else {
        // No user with this name exists, respond back with a 401
        res.status(401);
        res.json({
          "status": 401,
          "message": "Invalid User"
        });
        return;
      }

    } catch (err) {
      res.status(500);
      res.json({
        "status": 500,
        "message": "Oops something went wrong 111",
        "error": err
      });
    }
  } else {
    res.status(401);
    res.json({
      "status": 401,
      "message": "Invalid Token or Key"
    });
    return;
  }
};
