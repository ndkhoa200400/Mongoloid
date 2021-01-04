
const AppError = require("../utils/appError");

const handleCastErrorDB = (err) => {
  
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  // const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

  const mess = `Các dữ liệu sau đã được sữ dụng: \n${Object.keys(
    err.keyValue
  ).join("\n")}\nVui lòng sử dụng giá trị khác!`;
  return new AppError(mess, 400);
};

const handleValidationErrorDB = (err) => {

  const errors = Object.values(err.errors).map((el) => el.message);
  const mess = `Lỗi nhập dữ liệu:\n${errors.join("\n")}`;
  return new AppError(mess, 400);
};

const handleJWTError = (err) =>
  new AppError("Vui lòng đăng nhập lại!", 401);

const handleJWTExpiredError = (err) =>
  new AppError("Hết thời hạn đăng nhập. Vui lòng đăng nhập lại!", 401);

const sendErrorDev = (err, res) => {
  // A) API

  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorPro = (err, req, res) => {
  // A) API
  if (req.originalUrl.startsWith("/api")) {
    // A) Operational, trusted error: send message to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    // B) Programming or other unknown error: don't leak error details
    // 1) Log error
    // 2) Send generic message
    return res.status(500).json({
      status: "error",
      message:  err.message,
    });
  }
};

module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  // if (process.env.NODE_ENV === "development") {
  //     sendErrorDev(err, res);
  // }
  // else if (process.env.NODE_ENV === "production") {

  if (error.name === "CastError") {
    error = handleCastErrorDB(error);
  }
  if (error.code === 11000) {
    error = handleDuplicateFieldsDB(error);
  }
  if (error.name === "ValidationError") error = handleValidationErrorDB(error);
  if (error.name === "JsonWebTokenError") error = handleJWTError(error);
  if (error.name === "TokenExpiredError") error = handleJWTExpiredError(error);
  
  

  sendErrorPro(error, req, res);
};