export default (_, args = {}) => {
  const { data = {} } = args
  const { packages = [] } = data

  // Return the mocked input as the response
  return { packages }
}
