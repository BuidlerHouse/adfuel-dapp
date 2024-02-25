import { ethers } from 'ethers';
import { encodeRouteToPath } from '@uniswap/v3-sdk';

export const tokenABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"userAddress","type":"address"},{"indexed":false,"internalType":"address payable","name":"relayerAddress","type":"address"},{"indexed":false,"internalType":"bytes","name":"functionSignature","type":"bytes"}],"name":"MetaTransactionExecuted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"CHILD_CHAIN_ID","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"CHILD_CHAIN_ID_BYTES","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DEPOSITOR_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ERC712_VERSION","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ROOT_CHAIN_ID","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ROOT_CHAIN_ID_BYTES","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"name_","type":"string"}],"name":"changeName","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"bytes","name":"depositData","type":"bytes"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"},{"internalType":"bytes","name":"functionSignature","type":"bytes"},{"internalType":"bytes32","name":"sigR","type":"bytes32"},{"internalType":"bytes32","name":"sigS","type":"bytes32"},{"internalType":"uint8","name":"sigV","type":"uint8"}],"name":"executeMetaTransaction","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getChainId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"getDomainSeperator","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getNonce","outputs":[{"internalType":"uint256","name":"nonce","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getRoleMember","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleMemberCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"name_","type":"string"},{"internalType":"string","name":"symbol_","type":"string"},{"internalType":"uint8","name":"decimals_","type":"uint8"},{"internalType":"address","name":"childChainManager","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"move","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"holder","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"bool","name":"allowed","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"pull","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"push","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}, 

{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
{"inputs":[],"name":"EIP712_VERSION","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}
];

// export const permitAddress = '0x000000000022D473030F116dDEE9F6B43aC78BA3';
export const spenderAddress = '0xEdaBF85f42712c4ccd2cd4bF74558c8875f75247';
interface CheckPermitSupportProps {
  provider: ethers.providers.Web3Provider;
  tokenAddress: string;
}

export const checkPermitSupport = async ({ provider, tokenAddress }: CheckPermitSupportProps): Promise<boolean> => {
  try {
    console.log('checkPermitSupport:', tokenAddress);
    const tokenContract = new ethers.Contract(tokenAddress, tokenABI, provider);    
    const res = await tokenContract.PERMIT_TYPEHASH();    
    console.log('Permit type hash:', res);
    return true;
  } catch (error) {
    console.log("Check permit support error:", error);
    return false;
  }
};

// export const checkAllowance = async ({ provider, tokenAddress }: CheckPermitSupportProps): Promise<string> => {
//   try {
//     const tokenContract = new ethers.Contract(tokenAddress, tokenABI, provider);    
//     const result = await tokenContract.allowance(tokenAddress, permitAddress);    
//     console.log('Allowance:', result.toString());
//     return result.toString();
//   } catch (error) {
//     console.log("Check allowance support error:", error);
//     return "";
//   }
// };

async function getContractVersion(contract: any) {
  try {
    return await contract.ERC712_VERSION();
  } catch (error) {
    console.log('ERC712_VERSION function does not exist, trying EIP712_VERSION');
    return await contract.EIP712_VERSION();
  }
}

async function getContractNonce(contract: any, userAddress: string) {
  try {
    return await contract.getNonce(userAddress);
  } catch (error) {
    console.log('getNonce function does not exist, trying nonces');
    return await contract.nonces(userAddress);
  }
}

export async function signPermit(signer: any, provider: ethers.providers.Web3Provider,  tokenAddress: string, userAddress: string, value: string, deadline: string, event: any, token: string) {
  // const path = getPathFromRoute(event.trade.routes[0].pools);
  const path = encodeRouteToPath(event.trade.routes[0], false);
  const pool = event.trade.routes[0].pools[0]
  const fee = pool.fee
  const sqrtRatioX96 = 0// pool.sqrtRatioX96
  console.log("path", encodeRouteToPath)
  const amountOutMin = event.trade!.minimumAmountOut(event.slippage.allowed)
  const exactAmountString = amountOutMin.toExact();
  const amountOutMinDecimals = amountOutMin.currency.decimals;
  const amountOutMinStr = ethers.utils.parseUnits(exactAmountString, amountOutMinDecimals).toString();
  
  const outputToken = event.trade.swaps[0].outputAmount;
  const tokenOut = event.trade.swaps[0]["outputAmount"]["currency"];

  let tokenOutAddress = tokenOut.address;
  if(tokenOut.tokenInfo) {
    tokenOutAddress = tokenOut.tokenInfo.address;
  }

  const contract = new ethers.Contract(tokenAddress, tokenABI, provider);
  console.log("name")
  const name = await contract.name();
  console.log("getNonce")
  const nonce = await getContractNonce(contract, userAddress);
  console.log("ERC712_VERSION")
  const version = await getContractVersion(contract);
  let domain = {
      name: name,
      version: version,
      // chainId: await provider.getNetwork().then(net => net.chainId),
      verifyingContract: tokenAddress
  };
  // https://gist.github.com/nyp0x/fca5a05210818651073828de084f6aa4
  let isLegacyDomain = false;
  // https://github.com/ethers-io/ethers.js/discussions/2886
  if ([
    '0x2791bca1f2de4661ed88a30c99a7a9449aa84174' // USDC POS
  ].includes(tokenAddress.toLowerCase())) {
    console.log('using legacy EIP712Domain')
    isLegacyDomain = true
    const chainId = await provider.getNetwork().then(net => net.chainId);
    domain = Object.assign(domain, {
      salt: ethers.utils.hexZeroPad(ethers.BigNumber.from(chainId).toHexString(), 32)
    })
  } else {
    domain = Object.assign(domain, {
      chainId: await provider.getNetwork().then(net => net.chainId),
    })
  }
  console.log("domain", domain);
  const types = {
      Permit: [
          { name: 'owner', type: 'address' },
          { name: 'spender', type: 'address' },
          { name: 'value', type: 'uint256' },
          { name: 'nonce', type: 'uint256' },
          { name: 'deadline', type: 'uint256' }
      ]
  };
  const message = {
      owner: userAddress,
      spender: spenderAddress,
      value,
      nonce: nonce.toString(),
      deadline
  };
  console.log("sign" , signer, userAddress, domain, types, message);
  const signature = await signer._signTypedData(domain, types, message);
  console.log("Signed", signature, message);
  const sig = ethers.utils.splitSignature(signature);
  console.log(sig.r, sig.s, sig.v);
  let jsonObject = {
      r: sig.r,
      s: sig.s,
      v: sig.v,
      // sg: sig
  };
  let jsonString = JSON.stringify(jsonObject);
  /*
  exactInput(
        IERC20Permit token,
        address payable from,
        uint256 amount,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s,
        ISwapRouter router,
        uint amountOutMin,
        address contractToApprove,
        uint approvalAmount,
        bytes calldata path        
    )
  */
  try {
      const transactionData = {
          token: tokenAddress,
          from: userAddress,
          amount: value,
          extra: jsonString,
          deadline: deadline,
          amountOutMin: amountOutMinStr,
          path: path,
          sqrtRatioX96: sqrtRatioX96,
          fee: fee,
          tokenOut: tokenOutAddress,
          cfToken: token
      };
      console.log(transactionData);
      const url = process.env.API_URL ?? 'http://127.0.0.1:5000/execute';
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(transactionData)
      });
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Process the response
      const data = await response.json();
      console.log(data);
      // If the response includes a transaction hash, display it in a toast
      if (data && data['hash']) {
        console.log(data['hash'])
        localStorage.setItem('transactionHash', data.hash);
        window.location.reload();
      }

  } catch (error) {
      console.error('Error creating transaction:', error);
  }
}

// https://ethereum.stackexchange.com/questions/142406/uniswap-encode-path-in-typescript