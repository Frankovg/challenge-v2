import { selectPackage } from "../selectPackage";

describe("selectPackage", () => {
  it("decrements index when removedPackageIndex is less than prevIndex", () => {
    const removedPackageIndex = 1
    const prevIndex = 3
    const packagesLength = 5

    const result = selectPackage(removedPackageIndex, prevIndex, packagesLength);
    expect(result).toBe(2);
  });

  it("keeps the same index when removedPackageIndex is greater than prevIndex", () => {
    const removedPackageIndex = 4
    const prevIndex = 1
    const packagesLength = 5

    const result = selectPackage(removedPackageIndex, prevIndex, packagesLength);
    expect(result).toBe(1);
  });

  it("returns prevIndex when removed is the same index and not the last package", () => {
    const removedPackageIndex = 2
    const prevIndex = 2
    const packagesLength = 5

    const result = selectPackage(removedPackageIndex, prevIndex, packagesLength);
    expect(result).toBe(2);
  });

  it("returns the previous package when removing the last one", () => {
    const removedPackageIndex = 4
    const prevIndex = 4
    const packagesLength = 5

    const result = selectPackage(removedPackageIndex, prevIndex, packagesLength);
    expect(result).toBe(3);
  });

  it("returns 0 when removing last package and there are only 2 packages", () => {
    const removedPackageIndex = 1
    const prevIndex = 0
    const packagesLength = 2

    const result = selectPackage(removedPackageIndex, prevIndex, packagesLength);
    expect(result).toBe(0);
  });
});
