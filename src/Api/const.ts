export interface OnboardingParams {
  ethereum_address: string
  signature: string
  timestamp: string
}

export interface DepositParams {
  ethereum_address: string
  signature: string
  txn_hash: string
  amount: string
  timestamp: string
}