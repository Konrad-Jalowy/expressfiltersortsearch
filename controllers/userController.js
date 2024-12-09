const User = require("../models/userModel");
const catchAsync = require("../catchAsync");

exports.main = (req, res) => {
    return res.json({"msg": "main page"});
}


exports.byId =  catchAsync(async (req, res, next) => {
    let _user = await User.findOne({_id: req.params.id});
    console.log(_user);
    return res.json({"user": _user});
});