import { Signer } from '@ethersproject/abstract-signer';
import { Contract } from '@ethersproject/contracts';
import { Provider } from '@ethersproject/providers';
import Perpetual from 'src/sdk/abis/gate/Perpetual.json'
import ERC20ABI from 'src/sdk/abis/ERC20.json'
import { BigNumber } from '@ethersproject/bignumber';

interface Props {
  provider?: Provider
  signer?: Signer
}

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
export const ROUTER_ADDRESS = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
export const contractAddress = '0x4F091e8f52092E7Ce70Fc385ae3B2d1301476293'
export const tokenAddress = '0x475EbfBF2367d5C42f55bd997f9E65D8b35Ded65'

function getERC20Contract(address: string, signerOrProvider?: Signer | Provider) {
  return new Contract(address, ERC20ABI.abi, signerOrProvider);
}

export class Ether {
  static instance = null

  public provider

  public signer

  constructor(props: Props) {
    console.log(props)
    this.provider = props?.provider || null
    this.signer = props?.signer || null
  }

  //充值合约
  public getPerpetualContract() {
    return new Contract(contractAddress, Perpetual, this.signer)
  }

  // 查授权额度 
  public async getTokenAllowance(tokenAddr: string, owner: string, spender: string): Promise<BigNumber> {
    const contract = getERC20Contract(tokenAddr, this.provider);
    const allowance = await contract.allowance(owner, spender)
    return allowance
  }

  // 授权
  public async approve(token: string, spender: string, value): Promise<any> {
    const contract = getERC20Contract(token, this.provider);
    if (this.signer) {
      const signerContract = contract.connect(this.signer);
      const tx = await signerContract.approve(spender, value);
      return tx;
    }
    return '';
  }

  // 获取可提现的余额
  public getWithdrawalBalance(address: string, tokenAddr: string) {
    const contract = this.getPerpetualContract()
    return contract.getWithdrawalBalance(address, tokenAddr)
  }

  // 获取可提现的余额
  public withdraw(address: string, tokenAddr: string) {
    const contract = this.getPerpetualContract()
    return contract.withdraw(address, tokenAddr)
  }

  // 获取token 信息
  public async getTokenDetailV2(address: string): Promise<any> {
    let token: any;
    try {
      const contract = new Contract(address, ERC20ABI.abi, this.provider)
      const [symbol, decimals, name] = await Promise.all([
        contract.symbol(),
        contract.decimals(),
        contract.name(),
      ])
      token = {
        address: address,
        symbol: symbol,
        decimals: decimals,
        name: name,
      };
      return token;
    } catch (err) {
      return Promise.reject(token)
    }
  }

  static getInstance(props?: Props): Ether {
    if (Ether.instance) {
      return Ether.instance
    }
    Ether.instance = new Ether(props)
    return Ether.instance
  }
}
