export function getEnumValues(values) {
  const result: any[] = []
  for (let property of Object.values(values)) {
    if (Number(property) >= 0) {
      result.push(property)
    }
  }

  return result
}