import { Request, Response, NextFunction } from "express";
import { checkDbHealth } from "../services/healthService";
import type { HealthResponse } from "@types";

export const healthCheck = async (
  req: Request,
  res: Response<HealthResponse>,
  next: NextFunction
) => {
  try {
    await checkDbHealth();
    res.status(200).json({ status: "ok" });
  } catch (error) {
    next(error);
  }
};
