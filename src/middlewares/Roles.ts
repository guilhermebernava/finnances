const jwt = require("jsonwebtoken");
import jwt_decode from "jwt-decode";
import express from "express";
import { isValidRole } from "../services/Roles";

const roles = (validRole: string) => {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const token = res.locals.token;

    const tokenDecoded = jwt_decode<any>(token);
    const role: string = tokenDecoded.role;

    if (!isValidRole(role.toUpperCase())) {
      return res.status(401).json({ message: "Your role is not a valid ROLE" });
    }

    if (role.toUpperCase() !== validRole.toUpperCase()) {
      return res
        .status(403)
        .json({ message: "you don't have this perimission" });
    }

    next();
  };
};

export default roles;
