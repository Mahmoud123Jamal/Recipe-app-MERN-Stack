import { Request, Response } from "express";
import User from "../models/userModel";
import { hashPassword, comparePassword } from "../utils/hashPassword";
import { generateToken } from "../utils/jwtUtils";
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await hashPassword(password);
    const newUser = new User({ email, password: hashedPassword });
    const token = generateToken(email, newUser._id);
    await newUser.save();
    res.status(201).json({ status: "success", data: { token, user: newUser } });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = generateToken(email, user._id);
    res.status(200).json({ status: "success", data: { token, user } });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ status: "success", data: { user } });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
