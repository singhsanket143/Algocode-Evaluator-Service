import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";
import express, { Express } from "express";

import serverConfig from "./config/serverConfig";
import sampleQueueProducer from "./producers/sampleQueueProducer";
import sampleQueue from "./queues/sampleQueue";
import apiRouter from "./routes";
import SampleWorker from "./workers/SampleWorker";

const app: Express = express();

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/queues/ui");

createBullBoard({
  queues: [new BullMQAdapter(sampleQueue)],
  serverAdapter: serverAdapter,
});
app.use("/api", apiRouter);

app.use("/queues/ui", serverAdapter.getRouter());
app.listen(serverConfig.PORT, () => {
  console.log(`Server started at *:${serverConfig.PORT}`);

  SampleWorker("SampleQueue");

  sampleQueueProducer("SampleJob", {
    name: "Sanket",
    company: "Microsoft",
    position: "SDE 2 L61",
    locatiion: "Remote | BLR | Noida",
  });
  sampleQueueProducer("SampleJob", {
    name: "abc",
    company: "xyz",
    position: "SDE 2 L61",
    locatiion: "Remote | BLR | Noida",
  });
});
