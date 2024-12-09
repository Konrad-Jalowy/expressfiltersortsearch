class BodyValidator {
    constructor(body, fields) {
      this.errors = [];
      this.body = body;
      this.fields = [...fields];
    }

    //TODO: validate fields, return error-list

    _validateField(fieldObj){
        if(Object.hasOwn(fieldObj, 'required')){
            if(fieldObj.required === true){
                if(! Object.hasOwn(this.body, fieldObj.name)){
                    this.errors.push({field: fieldObj.name, message: `Field ${fieldObj.name} is required`});
                }
            }
        }
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