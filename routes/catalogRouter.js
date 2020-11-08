const express = require('express');
const bodyParser = require('body-parser');
const  Product= require('../models/Products');
const authenticate = require('../authenticate');
const catalogRouter = express.Router();
catalogRouter.use(bodyParser.json());
catalogRouter.route('/')
.get((req, res, next) => {
    Product.find()
    .then( Products => {
        res.statusCode = 200;
        console.log( Products);
        res.setHeader('Content-Type', 'application/json');
        res.json( Products);
    })
    .catch(err => next(err));
})
.post(authenticate.verifyUser, authenticate.verifyAdmin,(req, res, next) => {
    Product.create(req.body)
    .then( Products => {
        console.log('  Product Created ',   Products);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json( Products);
    })
    .catch(err => next(err));
})
.put(authenticate.verifyUser, authenticate.verifyAdmin,(req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /items');
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin,(req, res, next) => {
    Product.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

catalogRouter.route('/:itemId')
.get((req, res, next) => {
    Product.findById(req.params.itemId)
    .then(item => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(item);
    })
    .catch(err => next(err));
})
.post(authenticate.verifyUser, authenticate.verifyAdmin,(req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /items/${req.params.itemId}`);
})
.put(authenticate.verifyUser, authenticate.verifyAdmin,(req, res, next) => {
    Product.findByIdAndUpdate(req.params.itemId, {
        $set: req.body
    }, { new: true })
    .then(item => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(item);
    })
    .catch(err => next(err));
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin,(req, res, next) => {
    Product.findByIdAndDelete(req.params.itemId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});
 

module.exports =catalogRouter; 