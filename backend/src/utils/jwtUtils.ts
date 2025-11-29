import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET as string;

if (!secret) throw new Error("JWT_SECRET not defined");

export const generateToken = (email: string, id: string | Object): string => {
  return jwt.sign({ email, id }, secret, { expiresIn: "2d" });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, secret);
};
