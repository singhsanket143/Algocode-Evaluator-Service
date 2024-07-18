import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

import { AddEvaluationDto } from "../dtos/AddEvaluation";
import { CreateSubmissionDto } from "../dtos/CreateSubmissionDto";

export const validateCreateSubmissionDto = (schema: ZodSchema<CreateSubmissionDto>) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            ...req.body
        });
        next();
    } catch (error) {
        console.error(`Error in validating Submission: ${error}`);
        res.status(500).json({
            success: false,
            error: error,
            message: 'Something went Wrong in Validating submission',
            data: {}
        });
    }
};

export const validateAddEvaluationDto = (schema: ZodSchema<AddEvaluationDto>) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            ...req.body
        });
        next();
    } catch (error) {
        console.error(`Error in validating Evaluation: ${error}`);
        res.status(500).json({
            success: false,
            error: error,
            message: 'Something went Wrong in Validating Evaluation',
            data: {}
        });
    }
};      