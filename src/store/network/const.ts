export enum ConnectStatus {
  connect = 'connect',
  disconnect = 'disconnect',
  accountsChanged = 'accountsChanged',
  chainChanged = 'chainChanged',
}

export enum ConnectButtonStatus {
  connect,
  disconnect,
  chainChanged,
}

export interface UserInfo {
  uid: string
  name: string,
  ether_address: string,
  email: string,
  maker_fee: string,
  taker_fee: string,
  is_verified: number,
  created_at: string,
  updated_at: string
}