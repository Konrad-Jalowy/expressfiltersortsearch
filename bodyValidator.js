class BodyValidator {
    constructor(body, fields) {
      this.errors = [];
      this.body = body;
      this.fields = [...fields];
    }

    

  }

  module.exports = BodyValidator;