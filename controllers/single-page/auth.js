var jwt = require('jwt-simple');

var auth = {

  login: function(req, res) {

    var username = req.body.username || '';
    var password = req.body.password || '';

    if (username == '' || password == '') {
        res.status(401);
        res.json({
          "status": 401,
          "message": "Invalid credentials"
        });
        return;
    }

    // Fire a query to your DB and check if the credentials are valid

    var dbUserObj = auth.validate(username, password);

    if (!dbUserObj) { // If authentication fails, we send a 401 back
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials"
      });
      return;
    }

    if (dbUserObj) {

      // If authentication is success, we will generate a token
      // and dispatch it to the client

      res.json(genToken(dbUserObj));
    }

  },


  validate: function(username, password) {

    for(var i = 0; i < LoginUsers.length; i++) {
        var obj = LoginUsers[i];
        if(obj.username == username && obj.password == password)
        {
              return {
                name: obj.name,
                role: obj.role,
                username: obj.username
            };
        }
    }
    return null;
  },


  validateUser: function(username) {
    for(var i = 0; i < LoginUsers.length; i++) {
        var obj = LoginUsers[i];
        if(obj.username == username)
        {
              return {
                name: obj.name,
                role: obj.role,
                username: obj.username
            };
        }
    }
  },
}

// private method
function genToken(user) {
  var expires = expiresIn(7); // 7 days
  var token = jwt.encode({
    exp: expires
  }, require('./jwt-simple-secret')());

  return {
    token: token,
    expires: expires,
    user: user
  };
}

function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}


var LoginUsers = [
    {
          name: 'admin1',
          role: 'admin',
          username: 'admin1@myapp.com',
          password: 'p1'
    }, {
          name: 'user1',
          role: 'user',
          username: 'user1@myapp.com',
          password: 'u1'
    }, {
          name: 'user2',
          role: 'user',
          username: 'user2@myapp.com',
          password: 'u2'
    }
];



module.exports = auth;
