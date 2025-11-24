export const selectPackage = (
  removedPackageIndex: number,
  prevIndex: number,
  packagesLength: number
) => {
  if (removedPackageIndex < prevIndex) {
    return prevIndex - 1
  }
  if (removedPackageIndex === prevIndex) {
    if (prevIndex >= packagesLength - 1) {
      return Math.max(0, packagesLength - 2)
    }
    return prevIndex
  }
  return prevIndex
}
