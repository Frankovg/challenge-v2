import { LineItemType } from "types";

export const getProductByCode = (
  items: LineItemType[],
  code: string
): LineItemType | undefined => {
  return items.find((item) => item.sku === code)
}
