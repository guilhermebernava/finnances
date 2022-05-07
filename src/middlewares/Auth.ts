const jwt = require("jsonwebtoken");
import express from "express";

function auth(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(
    token,
    process.env.TOKEN_SECRET as string,
    (err: any, user: any) => {
      console.log(err);

      if (err) return res.status(403).send("INVALID SIGNTURE FROM TOKEN");

      res.locals.token = token;
      next();
    }
  );
}

export default auth;
