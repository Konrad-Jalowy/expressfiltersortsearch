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
        for (const fieldObj of this.fields) {
            this._validateField(fieldObj);
        }
        return true;
    }

    validate(){
        this._validateFields();
        return this.errors;
    }

  }

  module.exports = BodyValidator;