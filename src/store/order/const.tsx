export enum OrderType { 
  position = 'position',
  order = 'order',
  allSuccess = 'allsuccess',
  pay = 'pay',
}

export enum OrderTypeMapping { 
  MARKET = '市价',
  LIMIT = '限价',
  TRAILING_STOP = '追踪止损',
  TAKE_PROFIT = '获利止盈',
  STOP_LIMIT = '限价止损',
}

export enum OrderTimeInForceMapping { 
  GTT = '有效时间截止',
  FOK = '全部成交否则取消指令',
  IOC = '立即否则取消',
}