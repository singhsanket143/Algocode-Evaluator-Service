import bodyParser from "body-parser";
import express, { Express } from "express";

import bullBoardAdapter from "./config/bullBoardConfig";
import serverConfig from "./config/serverConfig";
import JavaExecutor from "./containers/javaExecutor";
import evaluationQueueProducer from "./producers/evaluationQueueProducer";
import submissionQueueProducer from "./producers/submissionQueueProducer";
import apiRouter from "./routes";
import { evaluation_queue, submission_queue } from "./utils/constants";
import EvaluationWorker from "./workers/EvaluationWorker";
import SampleWorker from "./workers/SampleWorker";
import SubmissionWorker from "./workers/SubmissionWorker";

const app: Express = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use('/api', apiRouter);
app.use('/ui', bullBoardAdapter.getRouter());

app.listen(serverConfig.PORT, async () => {
  console.log(`Server started at *:${serverConfig.PORT}`);
  console.log(`BullBoard dashboard running on: http://localhost:${serverConfig.PORT}/ui`);

  SampleWorker('SampleQueue');
  SubmissionWorker(submission_queue);
  EvaluationWorker(evaluation_queue);

  // testing snippet
  const code = `
  import java.util.*;
  public class Main{
      public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        int input=sc.nextInt();
        for(int i=0;i<input;i++){
          System.out.println(i);
        }
      }
  }
  `;
  const testCase = `10`;
  const outputTestCase = `0\n1\n2\n3\n4\n5\n6\n7\n8\n9\n`;
  const javaExecutor = new JavaExecutor();
  const { output, status } = await javaExecutor.execute(code, testCase, outputTestCase);
  console.log(`The response: ${JSON.stringify(output)}`);
  submissionQueueProducer({
    'userId': output
  });
  console.log(`Producer response :${JSON.stringify(output)}`);
  if (status) {
    evaluationQueueProducer({ 'userId': { output, status } });
  }
//   const userCode = `
  
//     class Solution {
//       public:
//       vector<int> permute() {
//           vector<int> v;
//           v.push_back(10);
//           return v;
//       }
//     };
//   `;

//   const code = `
//   #include<iostream>
//   #include<vector>
//   #include<stdio.h>
//   using namespace std;
  
//   ${userCode}

//   int main() {

//     Solution s;
//     vector<int> result = s.permute();
//     for(int x : result) {
//       cout<<x<<" ";
//     }
//     cout<<endl;
//     return 0;
//   }
//   `;

// const inputCase = `10
// `;

// submissionQueueProducer({"1234": {
//   language: "CPP",
//   inputCase,
//   code
// }});

  
//   runCpp(code, inputCase);

});
