class ApiError {
  constructor(response) {
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
