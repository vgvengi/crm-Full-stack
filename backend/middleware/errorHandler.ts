import { NextFunction, Request, Response } from "express";

interface AppError extends Error {
  statusCode?: number;
  status?: number;
}

const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || "Internal server error";

  console.error(`Error caught by errorHandler: ${req.method} ${req.originalUrl} - ${message}`);

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
}; 
export default errorHandler;
