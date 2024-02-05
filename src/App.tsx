import { ConnectKitButton } from 'connectkit';
import { ethers } from 'ethers';
import { useSigner, useAccount, useProvider } from 'wagmi';
import React, { useState, useEffect } from 'react';
import { Theme, SwapWidget } from '@uniswap/widgets';
import type { Web3Provider } from '@ethersproject/providers'
import { JsonRpcSigner } from '@ethersproject/providers';
import { EventEmitter } from 'events';
import '@uniswap/widgets/fonts.css';

function App() {
  const eventEmitter = new EventEmitter();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [defaultInputTokenAddress, setDefaultInputTokenAddress] = useState('NATIVE');
  const [defaultOutputTokenAddress, setDefaultOutputTokenAddress] = useState('0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889');
  const provider = useProvider();
  const executeSigner = useSigner<JsonRpcSigner>().data;
  const [executeProvider, setExecuteProvider] = useState<ethers.providers.JsonRpcProvider | null>(null);
  const jsonRpcUrlMap = {
    1: [`https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`], // Ethereum Mainnet
    137: [`https://polygon-mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`], // Polygon Mainnet
    80001: [`https://polygon-mumbai.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`] // Polygon Mumbai Testnet
  }

  useEffect(() => {
    let myprovider = executeSigner 
      ? executeSigner.provider as ethers.providers.JsonRpcProvider 
      : provider;
      setExecuteProvider(myprovider);
  }, [executeSigner]);

  // if (executeProvider) {
  //   executeProvider = new Proxy(executeProvider, {
  //     get: function(target: any, propKey: any) {
  //       const originalMethod = target[propKey];
  //       if (typeof originalMethod === 'function') {
  //         return (...args: any) => {
  //           console.log(`${propKey}, params:`, args);
  //           const result = originalMethod.apply(target, args);
  //           if (propKey === 'getSigner' && result) {
  //             for (const key in result) {
  //               if (typeof result[key] === 'function') {
  //                 result[key] = new Proxy(result[key], {
  //                   apply: function(target, thisArg, argumentsList) {
  //                     console.log(`${key}, params:`, argumentsList);
  //                     return Reflect.apply(target, thisArg, argumentsList);
  //                   }
  //                 });
  //               }
  //             }
  //           }
  //           return result;
  //         };
  //       }
  //       return originalMethod;
  //     }
  //   });
  // }
  /*
  When using wagmi@v0.11, useProvider() will return the fallback provider, not the wallet-connected provider. 
  You should instead pass useSigner<JsonRpcSigner>().data?.provider to reflect the user's connected wallet.
  */
  // eventEmitter.on('uniswapSendTransaction', (transactionParams) => {
  //   console.log('Received uniswapSendTransaction event with params:', transactionParams);
  // });

  useEffect(() => {
    if (provider) {
      const getNetwork = async () => {
        const network = await provider.getNetwork();
        if (network.chainId === 80001) {
          setDefaultInputTokenAddress('NATIVE');
          setDefaultOutputTokenAddress('0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889');
        } else {
          setDefaultInputTokenAddress('0xc2132D05D31c914a87C6611C10748AEb04B58e8F'); // USDT
          setDefaultOutputTokenAddress('0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6'); // wBTC
        }
      };
  
      getNetwork();
    }
  }, [provider]);

  const handleChangePage = (event: any, newPage: React.SetStateAction<number>) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: { target: { value: string; }; }) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const theme: Theme = {
    accent: '#ff3131'
  }

  const greenColor = '#22c55e';
  const { address, isConnecting, isDisconnected } = useAccount();
  const { data: signer } = useSigner();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-darkStart to-darkEnd text-white">
       {/* Navbar */}
        <nav className="bg-black p-4">
          <div className="flex justify-between items-center">
          <img src="banner.png" alt="Banner" className="text-xl font-bold" style={{height: '50px'}} />          
          <ConnectKitButton />
          </div>
        </nav>
        {/* Navbar end */}
        {/* Main Content */}
        <div className="flex-grow p-4 flex justify-center mt-4">
          <div className="Uniswap">
            <SwapWidget 
            provider={executeProvider} 
            theme={theme} 
            defaultInputTokenAddress={defaultInputTokenAddress} 
            defaultOutputTokenAddress={defaultOutputTokenAddress} 
            defaultInputAmount={0.001}
            jsonRpcUrlMap={jsonRpcUrlMap}
            onConnectWalletClick={() => {
              console.log('Connect wallet button clicked');
              return Promise.resolve(false);
            }}
            onReviewSwapClick={() => {
              console.log('Review swap button clicked');
              return Promise.resolve(true);
            }}
            hideConnectionUI={true}
            />
          </div>
        </div>
        {/* Main Content end */}
      </div>
      );
}

export default App;
