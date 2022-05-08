import jwt_decode from "jwt-decode";
import express from "express";
import { isValidRole } from "../services/roles";

const roles = (validRole: string) => {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    //pega o TOKEN do LOCALS
    const token = res.locals.token;

    //decoda o TOKEN
    const tokenDecoded = jwt_decode<any>(token);
    //pega o valor do token
    const role: string = tokenDecoded.role;

    if (!isValidRole(role.toUpperCase())) {
      return res.status(401).json({ message: "Your role is not a valid ROLE" });
    }

    if (role.toUpperCase() !== validRole.toUpperCase()) {
      return res
        .status(403)
        .json({ message: "you don't have this perimission" });
    }

    //se a role for valida ele vai ir pro ENDPOINT
    next();
  };
};

export default roles;
