import express from "express";
import {
  ValidationError,
  UniqueConstraintError,
  ForeignKeyConstraintError,
} from "sequelize";
import { AppError } from "@helpers/appError";

const handleUniqueConstraintErrorDB = (err: UniqueConstraintError) => {
  // Get the field name that caused the unique constraint error
  const field = err.errors?.[0]?.path || "field";
  const value = err.errors?.[0]?.value || "";
  const message = `Duplicate value for ${field}: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err: ValidationError) => {
  const errors = err.errors.map((error) => error.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleForeignKeyConstraintError = (err: ForeignKeyConstraintError) => {
  const message = `Foreign key constraint failed: ${
    err.table || "Unknown table"
  }`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError("Invalid token, pls log in again.", 401);

const handleJWTExpiredError = () =>
  new AppError("Your token has expired, pls log in again.", 401);

export const errorHandler = (
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  let error = { ...err, message: err.message };

  // Sequelize specific error handling
  if (err instanceof UniqueConstraintError) {
    error = handleUniqueConstraintErrorDB(err);
  } else if (err instanceof ValidationError) {
    error = handleValidationErrorDB(err);
  } else if (err instanceof ForeignKeyConstraintError) {
    error = handleForeignKeyConstraintError(err);
  } else if (err.name === "SequelizeDatabaseError") {
    // Handle general database errors
    error = new AppError(err.message || "Database error occurred", 500);
  } else if (err.name === "JsonWebTokenError") {
    error = handleJWTError();
  } else if (err.name === "TokenExpiredError") {
    error = handleJWTExpiredError();
  }

  // Return error response
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "An unexpected error occurred",
    ...(process.env.NODE_ENV === "development" ? { stack: err.stack } : {}),
  });
};
