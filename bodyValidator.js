//helper function for clearer code
function requiredEnabled(fieldObj){
    if(!Object.hasOwn(fieldObj, "required"))
        return false;
    return fieldObj.required;
}

function notEmptyEnabled(fieldObj){
    if(!Object.hasOwn(fieldObj, "notEmpty"))
        return false;
    return fieldObj.notEmpty;
}

function hasSpecifiedType(fieldObj){
    return Object.hasOwn(fieldObj, 'type');
}


class BodyValidator {
    constructor(body, fields) {
      this.errors = [];
      this.body = body;
      this.fields = [...fields];
    }

    //TODO: validate fields, return error-list

    _addErrorMessage(field, message){
        this.errors.push({field: field, message: message});
    }

    _validateField(fieldObj){
        if(Object.hasOwn(fieldObj, 'required')){
            if(fieldObj.required === true){
                if(! Object.hasOwn(this.body, fieldObj.name)){
                    this._addErrorMessage(fieldObj.name, `Field ${fieldObj.name} is required`);
                }
            }
        }
        if(Object.hasOwn(fieldObj, 'type')){
            if(fieldObj.type !== typeof this.body[fieldObj.name]){
                this._addErrorMessage(fieldObj.name, `Field ${fieldObj.name} must be of type ${fieldObj.type}`)
            }
        }
        if(Object.hasOwn(fieldObj, 'notEmpty')){
            if(fieldObj.notEmpty === true && (this.body[fieldObj.name] === "" )){
                this._addErrorMessage(fieldObj.name,`Field ${fieldObj.name} cant be empty`);
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