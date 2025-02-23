class ErrorGenerator extends Error {
  constructor() {
    super();
  }
  generate(message, statusCode, statusText, data = null) {
    (this.message = message),
      (this.statusCode = statusCode),
      (this.statusText = statusText),
      (this.data = data);
    return this;
  }
}
module.exports = new ErrorGenerator();
