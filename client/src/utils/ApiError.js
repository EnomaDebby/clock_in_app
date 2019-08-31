// import FormatError from 'FormatError';

class ApiError {
  constructor(response) {
    // super(response.statusText);
    this.name = this.constructor.name;
    this.statusText = response.statusText;
    this.responseStatus = response.status;
    try {
      this.errors = JSON.parse(response.responseText).errors;
    } catch (e) {
      this.errors = [response.responseText];
    }
    try {
      this.error = JSON.parse(response.responseText).error;
    } catch (e) {
      this.error = [response.responseText];
    }
  }

  formErrors() {
    let errorObj = {};

    this.errors.map(err => {
      errorObj[err.attribute] = err.error;
    });

    return errorObj;
  }
}

export default ApiError;
