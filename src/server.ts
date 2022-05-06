import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";

const app = express();
const port = process.env.PORT;
app.use(bodyParser.json());

app.listen(port, () => console.log(`API RODANDO NA PORTA: ${port} `));

app.get("/", (req, res) => res.status(200).send({ message: "HELLO WORLD" }));
