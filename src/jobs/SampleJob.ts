import { Job } from "bullmq";

import logger from "../config/loggerConfig";
import { IJob } from "../types/bullMqJobDefinition";

export default class SampleJob implements IJob {
  name: string;
  payload: Record<string, unknown>;
  constructor(payload: Record<string, unknown>) {
    this.payload = payload;
    this.name = this.constructor.name;
  }

  handle = (job?: Job) => {
    logger.info("Handler of the job called");
    if (job) {
      logger.info(job.name, job.id, job.data);
    }
  };

  failed = (job?: Job): void => {
    logger.error("Job failed");
    if (job) {
      logger.info(job.id);
    }
  };
}
