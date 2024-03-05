import axios from "axios";
import { GenericOrderPaylooad } from "../interface/generic-order.interface";
import { OrderPayload } from "../interface/pharmacy-order.interface";

const BASE_URL =
  "http://pharmacy-mock-service-env.eba-xzj3bbnm.us-east-1.elasticbeanstalk.com";

export class OrderService {
  static async makeOrder(payload: GenericOrderPaylooad) {
    if (this.isValidPharmacy(payload.pharmacyId) == false) {
      throw new Error("Pharmacy not found");
    }

    const data = this.generatePayload(payload);

    const response = await axios.post(
      `${BASE_URL}/${payload.pharmacyId}/orders`,
      data
    );
    return response.data;
  }

  static isValidPharmacy(pharmacyId: string): boolean {
    switch (pharmacyId) {
      case "healthmart":
      case "careplus":
      case "quickcare":
        return true;
      default:
        return false;
    }
  }

  static async getOrderById(orderId: string, pharmacyId: string) {
    if (this.isValidPharmacy(pharmacyId) == false) {
      throw new Error("Pharmacy not found");
    }

    const response = await axios.get(
      `${BASE_URL}/${pharmacyId}/orders/${orderId}`
    );

    return response.data;
  }

  static generatePayload(payload: GenericOrderPaylooad): OrderPayload {
    switch (payload.pharmacyId) {
      case "healthmart":
        const healthmartObject = {
          healthMartProduct: payload.product,
          healthMartQuantity: payload.quantity,
          healthMartCustomerInfo: {
            healthMartCustName: payload.customerInfo.name,
            healthMartCustAddress: payload.customerInfo.address,
            healthMartCustCity: payload.customerInfo.city,
            healthMartCustState: payload.customerInfo.state,
            healthMartCustZipcode: payload.customerInfo.zip_code,
            healthMartCustCountry: payload.customerInfo.country,
          },
        };
        return healthmartObject;
      case "careplus":
        const careplusObject = {
          carePlusProduct: payload.product,
          carePlusQuantity: payload.quantity,
          carePlusClientInfo: {
            carePlusClientName: payload.customerInfo.name,
            carePlusClientAddress: payload.customerInfo.address,
            carePlusClientCity: payload.customerInfo.city,
            carePlusClientState: payload.customerInfo.state,
            carePlusClientZipcode: payload.customerInfo.zip_code,
            carePlusClientCountry: payload.customerInfo.country,
          },
        };
        return careplusObject;
      case "quickcare":
        const quickcareObject = {
          quickCareProduct: payload.product,
          quickCareQuantity: payload.quantity,
          quickCareUserData: {
            quickCareUserName: payload.customerInfo.name,
            quickCareUserAddress: payload.customerInfo.address,
            quickCareUserCity: payload.customerInfo.city,
            quickCareUserState: payload.customerInfo.state,
            quickCareUserZipcode: payload.customerInfo.zip_code,
            quickCareUserCountry: payload.customerInfo.country,
          },
        };
        return quickcareObject;
    }
  }
}
