export function showHeadAndEnd(value: string) {
  if (!value || value.length < 10) {
    return value || ''
  }

  return `${value.slice(0, 6)}....${value.slice(-4)}`
}