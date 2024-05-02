import express, { Express } from "express";

import bullBoardAdapter from "./config/bullBoardConfig";
import serverConfig from "./config/serverConfig";
import sampleQueueProducer from "./producers/sampleQueueProducer";
import apiRouter from "./routes";
import SampleWorker from "./workers/SampleWorker";

const app: Express = express();

app.use('/api', apiRouter);
app.use('/dashboard', bullBoardAdapter.getRouter());

app.listen(serverConfig.PORT, () => {
  console.log(`Server started at *:${serverConfig.PORT}`);
  console.log(`BullBoard is running on: http://localhost:${serverConfig.PORT}/dashboard`);
  
  SampleWorker('SampleQueue');

  sampleQueueProducer('SampleJob', {
    name: "Sanket",
    company: "Microsoft",
    position: "SDE 2 L61",
    locatiion: "Remote | BLR | Noida"
  });
});
