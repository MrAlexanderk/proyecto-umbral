import "dotenv/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import { authModel } from "../models/auth.model.js";
import { isValidEmail } from "../../utils/validators/email.validate.js";

const sign = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES || "7d",
  });

const login = async (req, res) => {
  try {
    const { email = "", password = "" } = req.body;
    
    if (!email.trim() || !password.trim())
      return res.status(400).json({ error: "Email and password are required" });
    if (!isValidEmail(email))
      return res.status(400).json({ error: "Invalid email" });
    if (password.length < 6)
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters" });

    const user = await authModel.getUserByEmail(email);
    if (!user) return res.status(400).json({ error: "User not found" });

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(400).json({ error: "Invalid password" });

    const token = sign({ email: user.email, id: user.id, role: user.role });
    return res.json({ email: user.email, token });
  } catch (error){
    console.error("Login failed:", error?.response?.data);
    return res.status(500).json({ error: "Server error" });
  }
};

export const register = async (req, res) => {
  try {
    const { email = "", password = "", username } = req.body;

    if (!email.trim() || !password.trim()) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    if (!isValidEmail(email)) return res.status(400).json({ error: "Invalid email" });
    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    const exists = await authModel.getUserByEmail(email);
    if (exists) return res.status(409).json({ error: "User already exists" });

    const passwordHash = await bcrypt.hash(password, 10);
    const safeUsername =
      (username && username.trim()) || email.split("@")[0] || `user_${Date.now()}`;

    const user = await authModel.addUser({
      email,
      passwordHash,
      username: safeUsername,
    });

    const token = sign({ id: user.id, email: user.email, role: user.role });
    return res.status(201).json({ email: user.email, token });
  } catch (err) {
    if (err?.code === "23505") {
      return res.status(409).json({ error: "Email already exists" });
    }
    console.error("REGISTER_ERROR:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

const me = async (req, res) => {
  try {
    const profile = await authModel.getUserById(req.user.id);
    if (!profile) return res.status(404).json({ error: "User not found" });
    return res.json(profile);
  } catch {
    return res.status(500).json({ error: "Server error" });
  }
};

const updateMe = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const fields = {};

    if (email !== undefined) {
      if (!email.trim() || !isValidEmail(email)) {
        return res.status(400).json({ error: "Invalid email" });
      }
      fields.email = email.trim();
    }

    if (username !== undefined) {
      if (!username.trim()) {
        return res.status(400).json({ error: "Username cannot be empty" });
      }
      fields.username = username.trim();
    }

    if (password !== undefined) {
      if (password.length < 6) {
        return res
          .status(400)
          .json({ error: "Password must be at least 6 characters" });
      }
      fields.password_hash = await bcrypt.hash(password, 10);
    }


    if (Object.keys(fields).length === 0) {
      const me = await authModel.getUserById(req.user.id);
      return res.json(me);
    }

    const updated = await authModel.updateUser(req.user.id, fields);
    return res.json(updated);
  } catch (err) {
    if (err?.code === "23505") {
      return res.status(409).json({ error: "Email already exists" });
    }
    console.error("UPDATE_ME_ERROR:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

export const authController = { login, register, me, updateMe };
