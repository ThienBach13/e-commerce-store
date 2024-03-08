import { ProductType } from "../misc/types";

export function sortByLowest(
  originalArray: ProductType[],
  key: keyof ProductType
): ProductType[] {
  if (!originalArray || !key) return [];

  const sortedArray = originalArray.reduce(
    (acc: ProductType[], current: ProductType) => {
      const index = acc.findIndex((item) => item[key] > current[key]);

      if (index === -1) {
        return [...acc, current];
      }

      return [...acc.slice(0, index), current, ...acc.slice(index)];
    },
    []
  );

  return sortedArray;
}

export function sortByHighest(
  originalArray: ProductType[],
  key: keyof ProductType
): ProductType[] {
  if (!originalArray || !key) return [];

  const sortedArray = originalArray.reduce(
    (acc: ProductType[], current: ProductType) => {
      const index = acc.findIndex((item) => item[key] < current[key]);

      if (index === -1) {
        return [...acc, current];
      }

      return [...acc.slice(0, index), current, ...acc.slice(index)];
    },
    []
  );

  return sortedArray;
}
