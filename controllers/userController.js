const User = require("../models/userModel");

exports.main = (req, res) => {
    return res.json({"msg": "main page"});
}


exports.byId = (req, res) => {
    return res.json({"id": req.params.id});
}