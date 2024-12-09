const User = require("../models/userModel");

exports.main = (req, res) => {
    return res.json({"msg": "main page"});
}


exports.byId =  async (req, res) => {
    let _user = await User.findOne({_id: req.params.id});
    console.log(_user);
    return res.json({"user": _user});
}