import type { Request, Response, NextFunction } from "express";

export const asyncHandler = (fn: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      return fn(req, res, next);
    } catch (error) {
      console.error("Something went wrong: ", error);
      return res
        .status(400)
        .json({ Message: error || "Something went wrong." });
    }
  };
};
