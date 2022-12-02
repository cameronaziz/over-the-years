const getExtension = (name?: string) => {
  const split = name?.split('.') || []
  return split[split.length - 1]
}

export default getExtension
