import { ConnectKitButton } from 'connectkit';
import { ethers } from 'ethers';
import { useSigner, useAccount, useProvider } from 'wagmi';
import React, { useState, useEffect, useRef } from 'react';
import { Theme, SwapWidget, InjectedCallbackContext, SupportedChainId } from '@adfuel/uniswap-widgets';
import { Web3Provider } from '@ethersproject/providers'
import AdsVideo from './AdsVideo'
import '@uniswap/widgets/fonts.css';

function App() {
  const theme: Theme = {
    accent: '#BA020A' //'#ff3131'
  }
  const [token, setToken] = useState('1' as string);
  const [showAdsVideo, setShowAdsVideo] = useState(false); 
  const adsVideoRef = useRef() as any;
  const [defaultInputTokenAddress, setDefaultInputTokenAddress] = useState('0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'); // 0xc2132D05D31c914a87C6611C10748AEb04B58e8F
  const [defaultOutputTokenAddress, setDefaultOutputTokenAddress] = useState('0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270');
  const [provider, setProvider] = useState<Web3Provider | undefined>()
  const { connector } = useAccount()
  const rpcEndPoint = `https://polygon-mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_ID}` // `https://polygon-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_ID}`;
  const jsonRpcUrlMap = {
    1: [rpcEndPoint],
    137: [rpcEndPoint]
  }
  interface ProviderMessage { type: string; data: unknown; }
  useEffect(() => {
    if (!connector) {
      const infuraProvider = new ethers.providers.JsonRpcProvider(rpcEndPoint);
      return () => setProvider(infuraProvider as Web3Provider)
    }
    connector.getProvider().then((provider) => {
      setProvider(new Web3Provider(provider))
    })
  }, [connector])
  
  /*
  When using wagmi@v0.11, useProvider() will return the fallback provider, not the wallet-connected provider. 
  You should instead pass useSigner<JsonRpcSigner>().data?.provider to reflect the user's connected wallet.
  */
  useEffect(() => {
    if (provider) {
      const getNetwork = async () => {
        const network = await provider.getNetwork();
        if (network.chainId === 137) {
          setDefaultInputTokenAddress('0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174');
          setDefaultOutputTokenAddress('0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270');
        }
      };
      getNetwork();
    }
  }, [provider]);

  const handleVideoEnd = (token: string) => {
    console.log('Video ended in App');
    setToken(token);
    setShowAdsVideo(false);
  }

  const handleSwap = (event: any): { interrupt: boolean } => {
    const tokenIn = event.trade.swaps[0]["inputAmount"]["currency"];
    return {
        interrupt: true,
    }
  }

  const handleRightClick = (event: React.MouseEvent) => {
    // event.preventDefault();
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
              // onReviewSwapClick={() => {
              //     console.log('onReviewSwapClick');
              //     return Promise.resolve(true);
              // }}
              className='mb-4'
              provider={provider} 
              theme={theme} 
              defaultInputTokenAddress={defaultInputTokenAddress}
              defaultOutputTokenAddress={defaultOutputTokenAddress} 
              defaultInputAmount={0.001}
              // defaultChainId={SupportedChainId.POLYGON}
              jsonRpcUrlMap={jsonRpcUrlMap}
              hideConnectionUI={true}
              brandedFooter={false}
              routerUrl='https://api.uniswap.org/v1/'
              />
              <div className="notification text-black" onClick={() => {
                if(!token) {
                  setShowAdsVideo(true);
                } else {
                  window.open("https://axieinfinity.com/", '_blank');
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
            <AdsVideo additionalText={"Start your adventure with free starter Axies each with unique abilities and playstyles."} sponsorText={"Sponsored by Axie Infinity"} url={"https://axieinfinity.com/"} ref={adsVideoRef} src={"ads.mov"}  onEnd={handleVideoEnd} /> 
          </div>}
          </div>
        {/* Main Content end */}
        <footer className="footer">Copyright © 2024 AdFuel All Rights Reserved</footer>
      </div>
      );
}

export default App;
