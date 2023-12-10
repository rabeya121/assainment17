const User = require("../models/userModel")

const findUserService =async (req) =>{

const userId = {$match:{id: req.params.id}}

 const data = await User.findById(userId)
return data


}