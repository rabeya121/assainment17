const CartItemModel = require("../models/cartItemModel");
const OrderModel = require("../models/orderModel");
const ProductModel = require("../models/productModel");
const User = require("../models/userModel");

const registration = async (req, res) => {
  let reqBody= req.body;
  try {
      let result = await User.create(reqBody);
      res.status(200).json({status: "Success", data: result});
  }
  catch(e){
      res.status(200).json({status: "Fail", data: e.toString()});
  }
};
const createProduct=async (req,res)=>{
  let reqBody= req.body;
  try {
      let result = await ProductModel.create(reqBody);
      res.status(200).json({status: "Success", data: result});
  }
  catch(e){
      res.status(200).json({status: "Fail", data: e.toString()});
  }

}

const cart=async (req,res)=>{
  let reqBody= req.body;
  try {
      let result = await CartItemModel.create(reqBody);
      res.status(200).json({status: "Success", data: result});
  }
  catch(e){
      res.status(200).json({status: "Fail", data: e.toString()});
  }

}

const createOrder=async (req,res)=>{
  let reqBody= req.body;
  try {
      let result = await OrderModel.create(reqBody);
      res.status(200).json({status: "Success", data: result});
  }
  catch(e){
      res.status(200).json({status: "Fail", data: e.toString()});
  }

}

module.exports = {
  registration, createProduct , cart, createOrder

};
