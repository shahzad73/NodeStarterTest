var products = {

  getAll: function(req, res) {
    var allProducts = data; // Spoof a DB call
    res.json(allProducts);
  },

  getOne: function(req, res) {
    var id = req.params.id;

    for(var i = 0; i < data.length; i++) {
        var obj = data[i];
        if(obj.id == id)
        {
            obj.status = 1;
            res.json(obj);
            return;
        }
    }

    res.json({"status":"0"});
  },

  create: function(req, res) {
    var newProduct = req.body;
    data.push(newProduct); // Spoof a DB call
    res.json(newProduct);
  },

  update: function(req, res) {
    var updateProduct = req.body;
    var id = req.params.id;
    data[id] = updateProduct // Spoof a DB call
    res.json(updateProduct);
  },

  delete: function(req, res) {
    var id = req.params.id;
    data.splice(id, 1) // Spoof a DB call
    res.json(true);
  }
};

var data = [{
  name: 'product 1',
  id: '1'
}, {
  name: 'product 2',
  id: '2'
}, {
  name: 'product 3',
  id: '3'
}];

module.exports = products;
