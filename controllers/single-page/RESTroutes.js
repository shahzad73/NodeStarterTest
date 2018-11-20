
var express = require('express');
var router = express.Router();


//-------------------------------------------------------------
//------------------REST Services------------------------------
//-------------------------------------------------------------
var auth = require('./auth.js');
var products = require('./products.js');
var user = require('./users2.js');


/*
 * Routes that can be accessed by any one
 */
router.post('/login', auth.login);
router.get('/rest/product/:id', products.getOne);   //i open this up from security for testing purpose in mocha tests. view test2.js in tests how this URL is called

/*
 * Routes that can be accessed only by autheticated users
 */
router.get('/rest/v1/products', products.getAll);
router.get('/rest/v1/product/:id', products.getOne);
router.post('/rest/v1/product/', products.create);
router.put('/rest/v1/product/:id', products.update);
router.delete('/rest/v1/product/:id', products.delete);

/*
 * Routes that can be accessed only by authenticated & authorized users
 */
router.get('/rest/v1/admin/users', user.getAll);
router.get('/rest/v1/admin/user/:id', user.getOne);
router.post('/rest/v1/admin/user/', user.create);
router.put('/rest/v1/admin/user/:id', user.update);
router.delete('/rest/v1/admin/user/:id', user.delete);

//-------------------------------------------------------------
//------------------REST Services------------------------------
//-------------------------------------------------------------




module.exports = router;
