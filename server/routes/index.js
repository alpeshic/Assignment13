var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')

var dbUrl = 'mongodb+srv://alps_node_user:alps1208@nodeproject-9oieq.mongodb.net/NodeJSAssignment?retryWrites=true&w=majority'

mongoose.connect(dbUrl, {useNewUrlParser: true }, (err) =>{
  console.log('MongoDB database connection', err);
})
//var db = mongoose.connection;
var productSchema = new mongoose.Schema({
  id: Number,
  product:[{
      productid: Number,
      category: String,
      price: Number,
      name: String,
      instock: Boolean
  }]
})
var Product = mongoose.model('Product', productSchema, 'Products')

router.get('/product/get', function(req, res){
  Product.find({}, (err, products) => {
    if (err) return console.error(err);
    res.json(products)
  })
  
  //res.json('Welcome To React');
})
router.post('/product/create', function(req, res){
  var product = new Product(req.body)
  product.save((err) => {
    if(err) {
      console.log(err)
      res.sendStatus(500)
    } else {
      res.sendStatus(200)
    }
  })
})
router.post('/product/update', function(req, res){
  var product = new Product(req.body)
  Product.updateOne( product)
  
})


router.get('/product/delete', function(req, res){
  var product = new Product(req.body)
  Product.deleteOne({id : req.query.id}, function(err)
  {
    if(err){
      console.log(err)
      //res.sendStatus(500)
    } else {
      //res.sendStatus(200)
    }
  })
  res.sendStatus(200)
})
router.get('/product/getById', function(req, res){
  console.log(req.query.id);
  var product = new Product(req.body)
  Product.findOne({id : req.query.id}, function(err, product)
  {
    if(err){
      console.log(err)
      //res.sendStatus(500)
    } else {
      res.json(product)
    }
  })  
})
module.exports = router;
