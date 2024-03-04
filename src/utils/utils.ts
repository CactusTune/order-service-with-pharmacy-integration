import { IncomingMessage } from "http";
import { createLogger, format, transports } from "winston";

/**
 * Parses the JSON body of an incoming HTTP request.
 * @param req The incoming HTTP request.
 * @returns A promise that resolves with the parsed JSON object.
 */
export function parseJSONBody<T>(req: IncomingMessage): Promise<T> {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const json = JSON.parse(body);
        resolve(json);
      } catch (error) {
        reject(new Error("Invalid JSON"));
      }
    });

    req.on("error", (error) => {
      reject(error);
    });
  });
}

const logger = createLogger({
  level: "error", // Log only error level messages or higher
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.errors({ stack: true }), // Log the full stack trace
    format.splat(),
    format.json()
  ),
  // Define different transports (e.g., console, file)
  transports: [
    new transports.Console(), // Log errors to the console
    new transports.File({ filename: "error.log", level: "error" }), // Additionally, log errors to a file
  ],
});

/**
 * Logs an error using Winston.
 * @param error The error to log.
 */
export function logError(error: Error): void {
  logger.error(error.message, { error });
}
