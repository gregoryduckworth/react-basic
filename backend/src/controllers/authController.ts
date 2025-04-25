import { Request, Response, NextFunction } from "express";
import prisma from "../services/db";
import bcrypt from "bcrypt";
import type {
  RegisterRequest,
  LoginRequest,
  AuthResponse,
  ApiResponse,
} from "@types";

const SALT_ROUNDS = 10;

export const register = async (
  req: Request<unknown, unknown, RegisterRequest>,
  res: Response<ApiResponse<AuthResponse>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password, first_name, last_name } = req.body;
    if (!email || !password) {
      res
        .status(400)
        .json({ errorKey: "email_and_password_required", status: 400 });
      return;
    }
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      res
        .status(409)
        .json({ errorKey: "email_already_registered", status: 409 });
      return;
    }
    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await prisma.user.create({
      data: { email, password: hashed, first_name, last_name },
      select: { id: true, email: true, first_name: true, last_name: true },
    });
    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request<unknown, unknown, LoginRequest>,
  res: Response<ApiResponse<AuthResponse>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res
        .status(400)
        .json({ errorKey: "email_and_password_required", status: 400 });
      return;
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(401).json({ errorKey: "invalid_credentials", status: 401 });
      return;
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      res.status(401).json({ errorKey: "invalid_credentials", status: 401 });
      return;
    }
    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      },
    });
  } catch (err) {
    next(err);
  }
};
