import bodyParser from "body-parser";
import express from "express";
import users from "./userRoute";

//exporta as rotas para ser usado dentro do SERVER.TS
export default (app: express.Express) => {
  //diz que vai usar JSON
  app.use(bodyParser.json(), users);
  app.get("/", (req: express.Request, res: express.Response) =>
    res.send("Hello from Express API")
  );
};
