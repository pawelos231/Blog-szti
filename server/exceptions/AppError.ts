class AppError extends Error {
    status: number
    constructor(message, httpCode = 500) {
      super(message);
      this.status = httpCode;
    }
  }
  
  export default AppError;