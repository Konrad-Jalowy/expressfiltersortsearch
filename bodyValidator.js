class BodyValidator {
    constructor(body, fields) {
      this.errors = [];
      this.body = body;
      this.fields = [...fields];
    }

    //TODO: validate fields, return error-list

    _validateField(fieldObj){
        return true;
    }

    _validateFields(){
        return true;
    }

    validate(){
        return this.errors;
    }

  }

  module.exports = BodyValidator;