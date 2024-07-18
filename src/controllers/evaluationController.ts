import { Request, Response } from "express";

import { AddEvaluationDto } from "../dtos/AddEvaluation";

export function addEvaluation(req: Request, res: Response) {
    const evaluationDto = req.body as AddEvaluationDto;
    console.log(evaluationDto);
    if (evaluationDto) {
        return res.status(201).json({
            success: true,
            error: {},
            message: 'Succesfully collected the evaluation',
            data: evaluationDto
        });
    }
    return res.status(404).json({
        success: false,
        error: {},
        message: 'Evaluation had not collected',
        data: {}
    });
}