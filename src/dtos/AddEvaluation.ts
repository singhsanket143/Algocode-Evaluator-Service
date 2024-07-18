import { z } from 'zod';

export type AddEvaluationDto = z.infer<typeof AddEvaluationZodSchema>;

export const AddEvaluationZodSchema = z.object({
    stdout: z.string(),
    stderr: z.string(),
}).strict();