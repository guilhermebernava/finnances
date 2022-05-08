const jwt = require("jsonwebtoken");
import express from "express";

function auth(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  //pega o token do headers
  const authHeader = req.headers["authorization"];
  //pega o token de fato
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  //valida se o token está correto
  jwt.verify(
    token,
    process.env.TOKEN_SECRET as string,
    (err: any, user: any) => {
      console.log(err);

      if (err && err.name === "TokenExpiredError")
        return res.status(401).json({ error: "TOKEN EXPIRED" });

      if (err) return res.status(403).send("INVALID SIGNTURE FROM TOKEN");

      //se ele estiver correto vamos colocar ele dentro dessa parte LOCALS
      //para usar no proximo MIDDLEWARE

      //LOCALS é uma boa forma de passar informações entre MIDDLEWARES
      res.locals.token = token;
      next();
    }
  );
}

export default auth;
