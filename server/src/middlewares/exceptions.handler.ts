import { NextFunction, Request, Response } from "express";

/**
 * @see https://expressjs.com/en/guide/error-handling.html
 */
export const ExceptionsHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err.status && err.detail) {
    return res.status(err.status).json(err);
  }

  return res.status(500).json({ error: "Internal error" });
};
