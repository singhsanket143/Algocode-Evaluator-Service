import evaluationQueue from "../queues/evaluationQueue";

export default async function (payload: Record<string, unknown>) {
    await evaluationQueue.add('EvaluationJob', payload);
    console.log(`Successfully added a new job in Evaluation Queue: Payload: ${JSON.stringify(payload)}`);
}