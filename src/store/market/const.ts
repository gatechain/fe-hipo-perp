export enum MarketType {
  market = 'market',          //市价
  limit = 'limit',            //限价
  stopLimit = 'stop_limit',    //止损限价
  trackStop = 'trailing_stop',    //追踪止损
  profitLimit = 'take_profit', //获利止损
}
export enum DirectionType { 
  buy = 'buy',
  sell = 'sell',
}

export enum OrderSideMapping { 
  BUY = '买单',
  SELL = '卖单',
}

