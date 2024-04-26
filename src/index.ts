import express, { Express } from "express";

import logger from "./config/loggerConfig";
import serverConfig from "./config/serverConfig";
import sampleQueueProducer from "./producers/sampleQueueProducer";
import apiRouter from "./routes";
import SampleWorker from "./workers/SampleWorker";


const app: Express = express();

app.use('/api', apiRouter);

app.listen(serverConfig.PORT, () => {
  console.log(`Server started at *:${serverConfig.PORT}`);
  logger.info(`Server started at *:${serverConfig.PORT}`);

  SampleWorker('SampleQueue');

  sampleQueueProducer('SampleJob', {
    name: "Sanket",
    company: "Microsoft",
    position: "SDE 2 L61",
    locatiion: "Remote | BLR | Noida"
  });
});
