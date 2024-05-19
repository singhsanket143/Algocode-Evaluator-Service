import bodyParser from "body-parser";
import express, { Express } from "express";

import bullBoardAdapter from "./config/bullBoardConfig";
import serverConfig from "./config/serverConfig";
import runPython from "./containers/runPythonDocker";
import apiRouter from "./routes";
import SampleWorker from "./workers/SampleWorker";


const app: Express = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use('/api', apiRouter);
app.use('/ui', bullBoardAdapter.getRouter());

app.listen(serverConfig.PORT, () => {
  console.log(`Server started at *:${serverConfig.PORT}`);
  console.log(`BullBoard dashboard running on: http://localhost:${serverConfig.PORT}/ui`);
  
  SampleWorker('SampleQueue');

  const code = `
val = input()
print("Value is: " , val)
i=0
while(i < 10000):\n\tprint("hello")
`;

const inputCase = `100
200
`;
  
  runPython(code, inputCase);

});
