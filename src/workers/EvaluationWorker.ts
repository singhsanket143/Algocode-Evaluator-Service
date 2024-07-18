import { Job, Worker } from 'bullmq';

import redisConnection from '../config/redisConfig';
import EvaluationJob from '../jobs/EvaluationJob';

function EvaluationWorker(queueName: string) {
    new Worker(
        queueName,
        async (job: Job) => {
            console.log(`Processing job: ${job.name} - ID: ${job.id} - Data: ${JSON.stringify(job.data)}`);
            if (job.name === 'EvaluationJob') {
                const evaluationJobInstance = new EvaluationJob(job.data);
                await evaluationJobInstance.handle(job);
                return true;
            }
        },
        {
            connection: redisConnection
        }
    );
}

export default EvaluationWorker;