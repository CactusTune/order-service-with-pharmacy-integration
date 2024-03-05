import { IncomingMessage, ServerResponse } from "http";

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

export function sendResponse(
  res: ServerResponse,
  statusCode: number,
  body: string | object,
  contentType: string = "application/json"
) {
  res.writeHead(statusCode, { "Content-Type": contentType });

  if (contentType === "application/json" && typeof body === "object") {
    res.end(JSON.stringify(body));
  } else {
    res.end(body);
  }
}
