import express, { Express } from "express";

import serverConfig from "./config/serverConfig";
import apiRouter from "./routes";


const app: Express = express();

app.use('/api', apiRouter);

app.listen(serverConfig.PORT, () => {
  console.log(`Server started at *:${serverConfig.PORT}`);
});
