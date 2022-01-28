export enum OrderType { 
  position = 'position',
  order = 'order',
  allSuccess = 'allsuccess',
  pay = 'pay',
}

export enum OrderTypeForC { 
  MARKET = '市价',
  LIMIT = '限价',
  TRAILING_STOP = '追踪止损',
  TAKE_PROFIT = '获利止盈',
  STOP_LIMIT = '限价止损',
}