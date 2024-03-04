import * as http from "http";
import url from "url";
import { IncomingMessage, ServerResponse } from "http";
import { makeOrder, getOrder } from "./controller/pharmacy-order.controller";

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const parsedUrl = url.parse(req.url as string, true);
    const pathname = parsedUrl.pathname;
    const queryParams = parsedUrl.query;

    if (req.method === "POST" && pathname === "/order") {
      makeOrder(req, res);
    } else if (req.method === "GET" && pathname === "/order") {
      const pharmacy_id = queryParams.pharmacy_id;
      const order_id = queryParams.order_id;

      if (typeof pharmacy_id === "string" && typeof order_id === "string") {
        getOrder(req, res, pharmacy_id, order_id);
      } else {
        notFoundRoute(req, res);
      }
    } else {
      notFoundRoute(req, res);
    }
  }
);

function notFoundRoute(req: IncomingMessage, res: ServerResponse): void {
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("404 Not Found");
}

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
