const CartItem = require("../models/cartItemModel");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const createCart = async (req) => {
  try {
    let user_id = req.headers.id;
    let reqBody = req.body;
    let productID = reqBody.product;

    // Price Calculation
    let product = await Product.findOne({ _id: productID });
   

    reqBody.userID = user_id;

    const res = await CartItem.updateOne(
      { user: user_id, product: reqBody.product },
      { $set: reqBody },
      { upsert: true }
    );

    return { status: "success", message: "Cart List Created", res };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong" };
  }
};

const cart = async (req) => {
  try {
    let user_id = new ObjectId(req.headers.id);
    console.log(user_id);
    let matchStage = { $match: { user: user_id } };
    let JoinStageProduct = {
      $lookup: {
        from: "products",
        localField: "product",
        foreignField: "_id",
        as: "product",
      },
    };
    let JoinStageUser = {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    };
    let unwindProductStage = { $unwind: "$product" };
    let unwindUserStage = { $unwind: "$user" };


    let data = await CartItem.aggregate([
      matchStage,
      JoinStageProduct,
      unwindProductStage,
      JoinStageUser,
      unwindUserStage
    ]);
    return { status: "success", data: data };
  } catch (e) {
    console.log(e);
    return { status: "fail", message: "Something Went Wrong" };
  }
};

const removeCart = async (req)=>{
    try{
        
     const delt=   await  CartItem.deleteOne({_id: req.params.id})
        return {status:"success", message:"Cart Item Deleted", delt}
    }
    catch (e) {
        return {status:"fail", message:"Something Went Wrong"}
    }
}
module.exports = { createCart, cart, removeCart };
