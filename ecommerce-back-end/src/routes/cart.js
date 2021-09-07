const express = require("express");
const { addItemToCart}=require('../controller/cart')
const { requireSignin ,userMiddelware} = require("../common-middleware");
const router = express.Router();

router.post('/user/cart/addtocart',requireSignin,userMiddelware,addItemToCart );

module.exports =router;
