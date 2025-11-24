import { restoreItems } from "../restoreItems";

import { mockLineItems } from "./mocks";


describe("restoreItems", () => {
  it("adds multiple quantities to multiple matching items", () => {
    const itemsToReturn = [
      { id: 1, quantity: 2, sku: "SKU-001", location: "A1" },
      { id: 2, quantity: 3, sku: "SKU-002", location: "B2" }
    ];

    const result = restoreItems(mockLineItems, itemsToReturn);

    expect(result.find(i => i.id === 1)?.quantity).toBe(12);
    expect(result.find(i => i.id === 2)?.quantity).toBe(8);
  });

  it("adds a new item when it does not exist in the list", () => {
    const itemsToReturn = [
      { id: 999, quantity: 4, sku: "SKU-999", location: "Z9" }
    ];

    const result = restoreItems(mockLineItems, itemsToReturn);

    expect(result.length).toBe(4);
    expect(result.find(i => i.id === 999)).toEqual({
      id: 999,
      quantity: 4,
      sku: "SKU-999",
      location: "Z9"
    });
  });

  it("returns original items when itemsToReturn is empty", () => {
    const result = restoreItems(mockLineItems, []);
    expect(result).toEqual(mockLineItems);
  });
});
