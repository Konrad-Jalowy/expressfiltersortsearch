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


function getMinMax(fieldObj){
    const min = Object.hasOwn(fieldObj, "min") ? fieldObj.min : Number.NEGATIVE_INFINITY;
    const max = Object.hasOwn(fieldObj, "max") ? fieldObj.max : Number.POSITIVE_INFINITY;
    return {min, max};
}

function hasMinOrMax(fieldObj){
    return Object.hasOwn(fieldObj, "min") || Object.hasOwn(fieldObj, "max");
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

    _bodyHas(fieldname){
        return Object.hasOwn(this.body, fieldname)
    }

    _bodyGet(fieldname){
        return this.body[fieldname];
    }

    _validateField(fieldObj){

        const _requiredEnabled = requiredEnabled(fieldObj);
        const _bodyHasThisField = this._bodyHas(fieldObj.name);

        if(_requiredEnabled){
            if(!_bodyHasThisField){
                    this._addErrorMessage(fieldObj.name, `Field ${fieldObj.name} is required`);
            }
        }

        if(!_bodyHasThisField){
            //no need to validate further
            return;
        }

        const _hasSpecifiedType = hasSpecifiedType(fieldObj);

        if(_hasSpecifiedType){
            if(fieldObj.type !== typeof this.body[fieldObj.name]){
                this._addErrorMessage(fieldObj.name, `Field ${fieldObj.name} must be of type ${fieldObj.type}`)
            }
        }

        const _notEmptyEnabled = notEmptyEnabled(fieldObj);
        if(_notEmptyEnabled){
            if(this._bodyGet(fieldObj.name) === "" ){
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