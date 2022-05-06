import express from "express";
import routes from "./routes"
import "dotenv/config";

const app = express();
const port = process.env.PORT;
routes(app)

app.listen(port, () => console.log(`API RODANDO NA PORTA: ${port} `));
