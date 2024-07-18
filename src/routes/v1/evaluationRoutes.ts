import express from 'express';

import { addEvaluation } from '../../controllers/evaluationController';
import { AddEvaluationZodSchema } from '../../dtos/AddEvaluation';
import { validateAddEvaluationDto } from '../../validators/zodValidator';

const evaluationRouter = express.Router();
evaluationRouter.post(
    '/',
    validateAddEvaluationDto(AddEvaluationZodSchema),
    addEvaluation
);

export default evaluationRouter;