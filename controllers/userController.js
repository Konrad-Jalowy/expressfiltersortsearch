const User = require("../models/userModel");
const catchAsync = require("../catchAsync");

exports.main = (req, res) => {
    return res.json({"msg": "main page"});
}


exports.byId = catchAsync(async (req, res, next) => {
    let _user = await User.findOne({_id: req.params.id});
    console.log(_user);
    return res.json({"user": _user});
});

exports.errorHandler = (err, req, res, next) => {
    res.status(500).json({"Error": "Some kind of error occurred."});
};

exports.notFound = function(req, res){
    res.status(404).json({"Error": "Endpoint doesnt exist"});
  }

exports.manualGetAll = catchAsync(async (req, res, next) => {

    let queryObj = { ...req.query };

    const excludedFields = ['page', 'sort', 'limit', 'fields'];

    excludedFields.forEach(el => delete queryObj[el]);
    
    
    return res.json({"msg": "manual get all here",
        "queryObj": queryObj,
        "query": req.query,
        "excludedFields": excludedFields.join(", "),
    });
});

exports.fluentGetAll = catchAsync(async (req, res, next) => {
    // let _user = await User.findOne({_id: req.params.id});
    // console.log(_user);
    return res.json({"msg": "fluent get all here"});
});