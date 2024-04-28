import logger from "../config/loggerConfig";
import sampleQueue from "../queues/sampleQueue";

export default async function (name: string, payload: Record<string, unknown>) {
  await sampleQueue.add(name, payload);
  logger.info("Successfully added a new job");
}
