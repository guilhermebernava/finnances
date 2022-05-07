import express from "express";
import bcrypt from "bcrypt";
import jwt from "../services/JWT";
const database = require("../models/");

class AuthController {
  static async post(req: express.Request, res: express.Response) {
    const { email, password } = req.body;

    const user = await database.User.findOne({
      where: { email: email },
    });

    if (!user) {
      return res.status(404).json("NÃO EXISTE ESSE USER");
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword)
      return res.status(401).json("INVALID PASSWORD OR EMAIL");

    const token = jwt.generateJWT({
      email: user.email,
      role: user.role,
      name: user.name,
    });
    res.set("Authorization", token);
    return res.status(204).send();
  }
}

export default AuthController;
