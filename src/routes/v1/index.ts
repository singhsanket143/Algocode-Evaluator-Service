import express from "express";

import { pingCheck } from "../../controllers/pingController";
import evaluationRouter from "./evaluationRoutes";
import submissionRouter from "./submissionRoutes";

const v1Router = express.Router();

v1Router.use('/submissions', submissionRouter);
v1Router.use('/evaluations', evaluationRouter);

v1Router.get('/ping', pingCheck);

export default v1Router;