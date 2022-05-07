import express from "express";
const database = require("../models/");

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

  static async post(req: express.Request, res: express.Response) {
    const { name, email, password, role } = req.body;
    const user = await database.User.create({
      name: name,
      email: email,
      password: password,
      role: role,
    });
    return res.status(201).json(user);
  }

  static async put(req: express.Request, res: express.Response) {
    const { id } = req.params;
    const { name, email, password, role } = req.body;
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
      }
    );

    return res.status(200).json("UPDATED SUCESSFULLY");
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
