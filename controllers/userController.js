const User = require("../models/userModel");
const catchAsync = require("../catchAsync");
const ObjectId = require('mongoose').Types.ObjectId;

exports.main = (req, res) => {
    return res.json({"msg": "main page"});
}

exports.paramMiddlewareID = async (req, res, next, val) => {

    const _validID = ObjectId.isValid(val);
    if (! _validID) {
      console.log("here")
      return res.status(404).json('Invalid ID');
    }
    let _user = await User.findOne({_id: val});
    if(_user === null){
        return res.status(404).json('User doesnt exist');
    }
    next();
  };


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

    let _page = req.query.page;
    let _limit = req.query.limit;
    let _shouldPaginate = (_page !== undefined || _limit !== undefined);

    excludedFields.forEach(el => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    parsedQueryObj = JSON.parse(queryStr);
    
    let _query = User.find(parsedQueryObj);

    if(_shouldPaginate){
        const page = _page * 1 || 1;
        const limit = _limit * 1 || 5;
        const skip = (page - 1) * limit;
        _query = _query.skip(skip).limit(limit);

    }
   
    const _users = await _query;

    

    
    return res.json({"msg": "manual get all here",
        "queryObj": queryObj,
        "query": req.query,
        "excludedFields": excludedFields.join(", "),
        "queryStr": JSON.parse(queryStr),
        "users": _users
    });
});

exports.fluentGetAll = catchAsync(async (req, res, next) => {
    // let _user = await User.findOne({_id: req.params.id});
    // console.log(_user);
    return res.json({"msg": "fluent get all here"});
});