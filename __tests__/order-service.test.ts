import axios from "axios";
import { OrderService } from "../src/services/pharmacy-order.service";

jest.mock("axios");

/* explicitly declare axios.get and axios.post a mock function */
axios.get = jest.fn();
axios.post = jest.fn();

const mockedAxios = axios as jest.Mocked<typeof axios>;

const validPayload = {
  pharmacyId: "healthmart",
  product: "Aspirin",
  quantity: 2,
  customerInfo: {
    name: "John Doe",
    address: "123 Main St",
    city: "Anytown",
    state: "Anystate",
    zip_code: "12345",
    country: "USA",
  },
};

const expectedResponse = {
  carePlusId: "1709593453458",
  carePlusProduct: "Painkiller for today",
  carePlusQuantity: 3,
  carePlusClientInfo: {
    carePlusClientName: "Micheal Ayomide",
    carePlusClientAddress: "123 Main Street",
    carePlusClientCity: "Abuja",
    carePlusClientState: "FCT",
    carePlusClientZipcode: "12345",
    carePlusClientCountry: "Nigeria",
  },
};

describe("OrderService", () => {
  describe("makeOrder", () => {
    it("should make an order successfully with valid payload", async () => {
      mockedAxios.post.mockResolvedValueOnce({ data: expectedResponse });

      const response = await OrderService.makeOrder(validPayload);

      expect(response).toEqual(expectedResponse);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Object)
      );
    });

    it("should check if it is a valid pharmacyId", async () => {
      const validPharmacies = ["healthmart", "careplus", "quickcare"];

      for (let pharmacy of validPharmacies) {
        expect(OrderService.isValidPharmacy(pharmacy)).toBe(true);
      }
    });

    it("should throw an error with an invalid pharmacyId", async () => {
      const invalidPayload = { ...validPayload, pharmacyId: "unknownpharmacy" };

      await expect(OrderService.makeOrder(invalidPayload)).rejects.toThrow(
        "Pharmacy not found"
      );
    });

    describe("GetOrderById", () => {
      it("should check if it is a valid pharmacyId", async () => {
        const validPharmacies = ["healthmart", "careplus", "quickcare"];

        for (let pharmacy of validPharmacies) {
          expect(OrderService.isValidPharmacy(pharmacy)).toBe(true);
        }
      });

      it("should return an order by pharmacyId and orderId", async () => {
        const pharmacyId = validPayload.pharmacyId;
        const orderId = expectedResponse.carePlusId;

        mockedAxios.get.mockResolvedValueOnce({ data: expectedResponse });

        const response = await OrderService.getOrderById(orderId, pharmacyId);

        expect(response).toEqual(expectedResponse);
        expect(mockedAxios.get).toHaveBeenCalledWith(expect.any(String));
      });
    });
  });
});
