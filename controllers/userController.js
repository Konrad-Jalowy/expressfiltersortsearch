const User = require("../models/userModel");
const catchAsync = require("../catchAsync");
const FluentAPI = require("../fluentAPI");
const ObjectId = require('mongoose').Types.ObjectId;

exports.main = (req, res) => {
    return res.json({"msg": "main page"});
}

exports.paramMiddlewareID = async (req, res, next, val) => {

    const _validID = ObjectId.isValid(val);

    if (! _validID) {
      return res.status(404).json({"Error": "Invalid ID"});
    }

    let _user = await User.findOne({_id: val});

    if(_user === null){
        return res.status(404).json({"Error": "Such user doesnt exist"});
    }
   
    next();

  };


exports.byId = catchAsync(async (req, res, next) => {
    let _user = await User.findOne({_id: req.params.id});
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
    let _shouldSort = (req.query.sort !== undefined);
    let _sortBy = "-createdAt";
    let _fields = "-__v";
    console.log(req.query.fields !== undefined)

    if(req.query.fields !== undefined){
        _fields = req.query.fields.split(',').join(' ');
    }
    
    excludedFields.forEach(el => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    parsedQueryObj = JSON.parse(queryStr);
    
    let _query = User.find(parsedQueryObj).select(_fields);
   
    if(_shouldSort){
        _sortBy = req.query.sort.split(',').join(' ');
    }

    if(_shouldPaginate){
        const page = _page * 1 || 1;
        const limit = _limit * 1 || 5;
        const skip = (page - 1) * limit;
        _query = _query.skip(skip).limit(limit);

    }

    _query = _query.sort(_sortBy);
   
    const _users = await _query;
    
    return res.json({"msg": "manual get all here",
        "users": _users
    });
});

exports.fluentGetAll = catchAsync(async (req, res, next) => {

    let filter = {};

    const features = new FluentAPI(User.find(filter), req.query)
                    .filter()
                    .sort()
                    .limitFields()
                    .paginate();

    const _users = await features.query;

    return res.json({"users": _users});
});

exports.postUser =  async (req, res) => {
    return res.json({"body": req.body});
};