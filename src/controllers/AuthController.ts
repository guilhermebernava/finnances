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

    //verifica se a SENHA que mandou na REQUEST é a mesma do BANCO
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword)
      return res.status(401).json("INVALID PASSWORD OR EMAIL");

    const token = jwt.generateJWT({
      email: user.email,
      role: user.role,
      name: user.name,
    });

    //coloca o TOKEN dentro do HEADER da authorization o TOKEN
    res.set("Authorization", token);
    return res.status(204).send();
  }
}

export default AuthController;
