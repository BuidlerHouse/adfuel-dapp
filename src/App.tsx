import { ConnectKitButton } from 'connectkit';
import { ethers } from 'ethers';
import { useSigner, useAccount, useProvider } from 'wagmi';
import React, { useState, useEffect, useRef } from 'react';
import { Theme, SwapWidget, InjectedCallbackContext, SupportedChainId } from '@adfuel/uniswap-widgets';
import { Web3Provider } from '@ethersproject/providers'
import AdsVideo from './AdsVideo'
import { checkPermitSupport, checkAllowance, signPermit } from './api';
import '@uniswap/widgets/fonts.css';

function App() {
  const theme: Theme = {
    accent: '#BA020A' //'#ff3131'
  }
  const [support, setSupport] = useState(true);
  const [token, setToken] = useState('1' as string);
  const [showAdsVideo, setShowAdsVideo] = useState(false); 
  const adsVideoRef = useRef() as any;
  const [defaultInputTokenAddress, setDefaultInputTokenAddress] = useState('0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'); // 0xc2132D05D31c914a87C6611C10748AEb04B58e8F
  const [defaultOutputTokenAddress, setDefaultOutputTokenAddress] = useState('0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270');
  const [provider, setProvider] = useState<Web3Provider | undefined>()
  const { connector } = useAccount()
  const { data: signer } = useSigner();
  const rpcEndPoint = `https://polygon-mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_ID}` // `https://polygon-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_ID}`;
  const jsonRpcUrlMap = {
    1: [`https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_ID}` ],
    137: [rpcEndPoint]
  }
  const { address, isConnecting, isDisconnected } = useAccount();
  const defaultProvider = new ethers.providers.JsonRpcProvider(rpcEndPoint) as Web3Provider;
  interface ProviderMessage { type: string; data: unknown; }
  useEffect(() => {
    if (!connector) {
      const infuraProvider = new ethers.providers.JsonRpcProvider(rpcEndPoint);
      return () => setProvider(infuraProvider as Web3Provider)
    }
    connector.getProvider().then((provider: any) => {
      const handler = {
        get(target: any, propKey: string | symbol, receiver: any) {
          const origMethod = target[propKey];
          if (typeof origMethod === 'function') {
            return function(...args: any[]) {
              if(String(propKey) == "request")
              {
                // dirty fix for eth_call
                if(args[0].method == "eth_call") {
                  return Promise.resolve(false);
                }
              }
              // console.log(`Called ${String(propKey)} with args:`, args);
              const result = origMethod.apply(target, args);
              // console.log(`Result of ${String(propKey)}:`, result);
              return result;
            };
          } else {
            return origMethod;
          }
        },
      };
      const proxiedProvider = new Proxy(provider, handler);
      setProvider(new ethers.providers.Web3Provider(proxiedProvider as ethers.providers.ExternalProvider));
    });
  }, [connector])
  
  /*
  When using wagmi@v0.11, useProvider() will return the fallback provider, not the wallet-connected provider. 
  You should instead pass useSigner<JsonRpcSigner>().data?.provider to reflect the user's connected wallet.
  */
  // useEffect(() => {
  //   if (provider) {
  //     const getNetwork = async () => {
  //       const network = await provider.getNetwork();
  //       if (network.chainId === 137) {
  //         setDefaultInputTokenAddress('0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174');
  //         setDefaultOutputTokenAddress('0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270');
  //       }
  //     };
  //     getNetwork();
  //   }
  // }, [provider]);

  const handleVideoEnd = async (token: string) => {
    console.log('Video ended in App');
    setToken(token);
    setShowAdsVideo(false);
  }

  const handleSwap = (event: any): { interrupt: boolean } => {
    const tokenIn = event.trade.swaps[0]["inputAmount"]["currency"];
    const value = event.trade.swaps[0]["inputAmount"]["numerator"][0].toString();
    
    console.log(tokenIn);
    if(!support) {
      return {
        interrupt: true,
      }
    }
    let tokenAddress = tokenIn.address;
    if(tokenIn.tokenInfo) {
      tokenAddress = tokenIn.tokenInfo.address;
    }
    const deadline = Math.floor(Date.now() / 1000) + 3600;
    const handleSignPermit = async () => {
      const result = await signPermit(await connector?.getSigner(), defaultProvider, tokenAddress, address as string, value, deadline.toString());
      console.log('signPermit', result);
    };
    handleSignPermit();

    return {
        interrupt: true,
    }
  }

  const handleRightClick = (event: React.MouseEvent) => {
    // TODO: production
    // event.preventDefault();
  }

  const checkPermit = async (token: any): Promise<boolean> => {
    if(token.isNative) {
      return false;
    }
    if(!defaultProvider) {
      return false;
    }
    let tokenAddress = token.address;
    if(token.tokenInfo) {
      tokenAddress = token.tokenInfo.address;
    }
    if(!await checkPermitSupport({ provider: defaultProvider, tokenAddress: token.address })) {
      return false;
    }
    return true;
  }

  return (
    <div className="flex flex-col min-h-screen" onContextMenu={handleRightClick}> 
    {/*bg-gradient-to-r from-darkStart to-darkEnd text-white*/}
       {/* Navbar */}
        <nav className="p-4">
          <div className="flex justify-between items-center">
          <img src="banner2.png" alt="Banner" className="text-xl font-bold" style={{height: '50px'}} />          
          <ConnectKitButton />
          </div>
        </nav>
        {/* Navbar end */}
        {/* Main Content */}
        <div className="flex-grow p-4 flex justify-center mt-4">
          <div className="Uniswap">
          <InjectedCallbackContext.Provider value={{
              onConfirmSwap(event) {
                console.log('onConfirmSwap', event);
                return handleSwap(event);
              },
            }}>
              <SwapWidget 
              onTokenChange={(type: string, token: any) => {
                console.log('onTokenChange', type, token);
                if(type === 'INPUT') {
                  setSupport(true);
                  // checkAllowance({ provider: defaultProvider, tokenAddress: token.address })
                  //   .then((result) => {
                  //     console.log('checkAllowance', result);
                  //   });
                  checkPermit(token).then((result) => {
                    console.log('checkPermit', result);
                    setSupport(result);
                  });
                  checkAllowance
                }
              }}
              onReviewSwapClick={() => {
                  console.log('onReviewSwapClick');
                  if(!token && support) {
                    setShowAdsVideo(true);
                  }
                  return Promise.resolve(true);
              }}
              className='mb-4'
              provider={provider} 
              theme={theme} 
              defaultInputTokenAddress={defaultInputTokenAddress}
              defaultOutputTokenAddress={defaultOutputTokenAddress} 
              defaultInputAmount={0.1}
              // defaultChainId={SupportedChainId.POLYGON}
              jsonRpcUrlMap={jsonRpcUrlMap}
              hideConnectionUI={true}
              brandedFooter={false}
              routerUrl='https://api.uniswap.org/v1/'
              />
              {
                !support && ( <p className="notification" style={{ fontFamily: 'Arial, sans-serif', color: '#808080' }}>Token not supported</p> )
              }
              <div className="notification text-black" onClick={() => {
                if(!token) {
                  setShowAdsVideo(true);
                } 
                else {
                  window.open("https://adfuel.app", '_blank');
                }
              }}>
                {!token ? '' : <div style={{ display: 'flex', alignItems: 'center',  justifyContent: 'center' }}>
                {/* <img src="29056010_0.webp" alt="Axie Infinity Logo" style={{ 
                    height: '30px',
                    marginRight: '10px',
                    borderRadius: '50%',
                }} />
                Sponsored by Axie Infinity */}
                </div>}
            </div>
            </InjectedCallbackContext.Provider> 
          </div>
          { showAdsVideo && <div className="adsContainer">
            <AdsVideo additionalText={"Start your adventure with free starter Axies each with unique abilities and playstyles."} sponsorText={"Sponsored by Axie Infinity"} url={"https://adfuel.app"} ref={adsVideoRef} src={"ads.mov"}  onEnd={handleVideoEnd} /> 
          </div>}
          </div>
        {/* Main Content end */}
        <footer className="footer">Copyright © 2024 AdFuel All Rights Reserved</footer>
      </div>
      );
}

export default App;
