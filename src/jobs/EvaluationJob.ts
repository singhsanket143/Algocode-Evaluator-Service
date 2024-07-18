import { Job } from "bullmq";

import { IJob } from "../types/bullMqJobDefinition";
import { EvaluationPayload } from "../types/evaluationPayload";

class EvaluationJob implements IJob {
    name: string;
    payload?: Record<string, EvaluationPayload>;

    constructor(payload: Record<string, EvaluationPayload>) {
        this.name = this.constructor.name;
        this.payload = payload;
    }

    handle = async (job?: Job) => {
        console.log(`Evaluation Handler Initialized - Payload: ${JSON.stringify(this.payload)}`);
        if (job && this.payload) {
            try {
                console.log(`Job Handling - payload: ${JSON.stringify(this.payload)}`);
                const response = Object.keys(this.payload);
                if (response) {
                    console.log(`Evaluation executed Successfully - ${JSON.stringify(this.payload)}`);
                }
            } catch (error) {
                console.error(`Error in Pushing Evaluation - ${error}`);
            }
        }
    };

    failed = (job?: Job) => {
        console.error(`Evaluation Handler Failed`);
        if (job) {
            console.error(`Evaluation Failed - ID: ${job.id}`);
        }
    };
}

export default EvaluationJob;