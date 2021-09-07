const express = require("express");
const { requireSignin ,adminMiddelware} = require("../common-middleware");
const router = express.Router();

const { addCategory, getCategories } = require("../controller/category");

router.post('/category/create',requireSignin,adminMiddelware,addCategory );
router.get('/category/getcategory',getCategories );

module.exports =router;
