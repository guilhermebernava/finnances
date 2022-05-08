import express from "express";
import bcrypt from "bcrypt";
import jwt_decode from "jwt-decode";
import { sendEmail, resetPassword } from "../services/email";
import JWT from "../services/JWT";
const database = require("../models/");
const { Op } = require("sequelize");

class AclController {
  static async getAllUsers(req: express.Request, res: express.Response) {
    const allUsers = await database.User.findAll();
    return res.status(200).json(allUsers);
  }

  static async getById(req: express.Request, res: express.Response) {
    const { id } = req.params;
    const allUsers = await database.User.findAll({
      where: {
        id: Number(id),
      },
    });
    return res.status(200).json(allUsers);
  }

  static async getByName(req: express.Request, res: express.Response) {
    const { name } = req.query;

    const users = await database.User.findAll({
      where: {
        //define que so vai ser nessa COLUNA a QUERY
        name: {
          //passa os OPERATORS para essa coluna e o que retornar TRUE
          //vai ser devolvido como dado
          [Op.substring]: `${name}`,
        },
      },
    });

    return res.json(users);
  }

  static async post(req: express.Request, res: express.Response) {
    const { name, email, password, role } = req.body;
    //criando HASH da senha para salvar no banco de dados
    const encryptedPassword = await bcrypt.hash(password, 12);
    try {
      //criando o USER
      const user = await database.User.create({
        name: name,
        email: email,
        password: encryptedPassword,
        role: role,
      });

      //gerando o TOKEN
      const token = JWT.generateJWT({
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      });

      //criando LINK para enviar no EMAIL
      const link = `${process.env.URL}/user/verify_email/` + token;

      //mandando email
      await sendEmail(user, link);

      return res.status(201).json({
        user: user,
      });
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }

  static async put(req: express.Request, res: express.Response) {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    //vai primeiro tentar fazer INSERTS no banco e só depois
    //de ter funcionado, ele vai COMITAR esses dados pro banco.
    await database.sequelize.transaction(async (t: any) => {
      await database.User.update(
        {
          name: name,
          email: email,
          password: password,
          role: role,
        },
        {
          where: {
            id: Number(id),
          },
        },
        { transaction: t }
      );

      return res.status(200).json("UPDATED SUCESSFULLY");
    });
  }

  static async delete(req: express.Request, res: express.Response) {
    const { id } = req.params;
    await database.User.destroy({
      where: {
        id: Number(id),
      },
    });

    return res.status(200).json("Delete was sucessfull");
  }

  static async restore(req: express.Request, res: express.Response) {
    const { id } = req.params;

    await database.User.restore({
      where: {
        id: Number(id),
      },
    });

    return res.status(200).json("the user was restored sucessfully");
  }

  static async verifyEmail(req: express.Request, res: express.Response) {
    //pega o TOKEN dos parametros da REQUEST
    const { token } = req.params;

    const validToken = await JWT.verifyToken(token);

    if (validToken === null) return res.status(401).json("INVALID TOKEN");

    const tokenDecoded = jwt_decode<any>(token);

    const emailVerified = await database.User.update(
      { emailVerified: true },
      {
        where: {
          id: Number(tokenDecoded.id),
        },
      }
    );

    if (emailVerified === 0) {
      return res.status(200).json("ERROR OCURRIED!");
    }

    return res.status(200).json("sucess");
  }

  static async forgotPassword(req: express.Request, res: express.Response) {
    const { email } = req.body;

    if (email == null) return res.status(400).json("enter a valid email");

    const user = await database.User.findOne({
      where: {
        email: email,
      },
    });

    if (user == null) return res.status(400).json("enter a valid email");

    //gerando o TOKEN
    const token = JWT.generateJWT({
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    });

    //criando LINK para enviar no EMAIL
    const link = `${process.env.URL}/user/change_password/` + token;

    await resetPassword(email, link);

    return res.status(200).json(link);
  }

  static async changePassword(req: express.Request, res: express.Response) {
    //pega o TOKEN dos parametros da REQUEST
    const { token } = req.params;
    const { password } = req.body;

    const validToken = await JWT.verifyToken(token);

    if (validToken === null) return res.status(401).json("INVALID TOKEN");

    const tokenDecoded = jwt_decode<any>(token);
    const encryptedPassword = await bcrypt.hash(password, 12);

    const changePassword = await database.User.update(
      { password: encryptedPassword },
      {
        where: {
          id: Number(tokenDecoded.id),
        },
      }
    );

    if (changePassword === 0) {
      return res.status(200).json("ERROR OCURRIED!");
    }

    return res.status(200).json("sucess");
  }
}

export default AclController;
