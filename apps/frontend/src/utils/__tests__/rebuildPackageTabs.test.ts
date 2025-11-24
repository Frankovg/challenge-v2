import { rebuildPackageTabs } from "../rebuildPackageTabs";

import { mockPackages } from "./mocks";


describe("rebuildPackageTabs", () => {
  it("removes the package with the given ID", () => {
    const result = rebuildPackageTabs(mockPackages, 1);

    expect(result.length).toBe(1);
    expect(result[0].data.id).toBe(0);
  });

  it("reindexes the remaining packages", () => {
    const result = rebuildPackageTabs(mockPackages, 1);

    expect(result[0].value).toBe(0);
    expect(result[0].label).toBe("Package 1");
  });
});
