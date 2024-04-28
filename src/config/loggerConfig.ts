import winston from "winston";

const allowedTransport = [];

allowedTransport.push(new winston.transports.Console());

allowedTransport.push(
  new winston.transports.File({
    filename: "app.log",
  })
);

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.printf(
      (log) => `${log.timestamp} ${log.level.toUpperCase()}: ${log.message}`
    )
  ),
  transports: allowedTransport,
});

export default logger;
