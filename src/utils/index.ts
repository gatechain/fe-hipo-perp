export function showHeadAndEnd(value: string) {
  if (!value || value.length < 10) {
    return value || ''
  }

  return `${value.slice(0, 6)}....${value.slice(-4)}`
}

export function formatNumber(value: string) {
  const [int, dec] = `${value}`.split('.')
  if (!dec) {
    return int.replace(/\d{1,3}(?=(\d{3})+(\.|$))/g, '$&,')
  } else {
    return int.replace(/\d{1,3}(?=(\d{3})+(\.|$))/g, '$&,') + `.${dec}`
  }
}

export function transfromFromData(data: any = {}): object {
  const fd = new FormData()
  Object.keys(data).forEach((key) => {
    fd.append(key, data[key])
  })
  return fd
}