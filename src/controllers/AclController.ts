import express from "express";
import bcrypt from "bcrypt";
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
      const user = await database.User.create({
        name: name,
        email: email,
        password: encryptedPassword,
        role: role,
      });
      return res.status(201).json(user);
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
}

export default AclController;
