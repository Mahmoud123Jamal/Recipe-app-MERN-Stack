import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwtUtils";

export const protect = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer "))
      return res.status(401).json({ status: "fail", message: "Unauthorized" });

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ status: "fail", message: "Invalid token" });
  }
};
