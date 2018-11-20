var cassandra = require('../../models/cassandra');


var index = {

  getHomePage: function(req, res) {


      res.render('index',
      {
         SiteParameter_PageTitle: 'Business - 724',
         SomeData: {name: 'Shahzad', age:67},


         partials:
         {
            Public_Header:'partials/publicheader',
            Public_Footer:'partials/publicfooter',
            Common_Header:'partials/commonheader',
            Common_Footer:'partials/commonfooter',
          }
      });

  }

};

module.exports = index;
