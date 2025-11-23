import { getProductByCode } from "utils/getProductByCode";

import { mockLineItems } from "./mocks";

describe("getProductByCode", () => {
  it("should return the correct product when code matches", () => {
    const result = getProductByCode(mockLineItems, "SKU-002");
    expect(result).toEqual(
      {
        id: 2,
        quantity: 5,
        sku: 'SKU-002',
        location: 'B2'
      }
    );
  });

  it("should return undefined when code does not match any product", () => {
    const result = getProductByCode(mockLineItems, "SKU-D000");
    expect(result).toBeUndefined();
  });

  it("should return undefined when items array is empty", () => {
    const result = getProductByCode([], "SKU-002");
    expect(result).toBeUndefined();
  });
});
