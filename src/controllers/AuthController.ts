import express from "express";
import bcrypt from "bcrypt";
const database = require("../models/");
const { Op } = require("sequelize");

class AuthController {
  static async post(req: express.Request, res: express.Response) {
    const { email, password } = req.body;

    const user = await database.User.findOne({
      where: { email: email},
    });

    if (user === null) return res.status(404);

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword)
      return res.status(401).json("INVALID PASSWORD OR EMAIL");

    return res.status(201).json(user);
  }
}

export default AuthController;
