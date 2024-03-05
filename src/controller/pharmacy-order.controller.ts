import { IncomingMessage, ServerResponse } from "http";
import { OrderService } from "../services/pharmacy-order.service";
import { parseJSONBody } from "../utils/utils";
import { GenericOrderPaylooad } from "../interface/generic-order.interface";
import { orderSchema } from "../validations/make-order.validation";

export async function getOrder(
  req: IncomingMessage,
  res: ServerResponse,
  pharmacy_id: string,
  order_id: string
): Promise<void> {
  try {
    const order = await OrderService.getOrderById(order_id, pharmacy_id);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(order));
  } catch (error) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Order not found");
  }
}

export async function makeOrder(
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> {
  try {
    const json_data = await parseJSONBody<GenericOrderPaylooad>(req);

    const { error } = orderSchema.validate(json_data);

    if (error) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Validation error",
          details: error.details[0].message,
        })
      );
      return;
    }

    const response = await OrderService.makeOrder(json_data);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(response));
  } catch (error) {
    if (error instanceof SyntaxError) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Invalid JSON");
    } else {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    }
  }
}
