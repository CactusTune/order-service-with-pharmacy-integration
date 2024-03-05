import { IncomingMessage, ServerResponse } from "http";
import { OrderService } from "../services/pharmacy-order.service";
import { parseJSONBody, sendResponse } from "../utils/utils";
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
    sendResponse(res, 200, order);
  } catch (error) {
    sendResponse(res, 404, "Order not found", "text/plain");
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
      sendResponse(res, 400, {
        message: "Validation error",
        details: error.details[0].message,
      });
      return;
    }

    const response = await OrderService.makeOrder(json_data);
    sendResponse(res, 200, response);
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
