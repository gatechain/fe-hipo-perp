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