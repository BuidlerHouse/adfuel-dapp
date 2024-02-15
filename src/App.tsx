import { ConnectKitButton } from 'connectkit';
import { ethers } from 'ethers';
import { useSigner, useAccount, useProvider } from 'wagmi';
import React, { useState, useEffect, useRef } from 'react';
import { Theme, SwapWidget, InjectedCallbackContext } from '@adfuel/uniswap-widgets';
import { Web3Provider } from '@ethersproject/providers'
import '@uniswap/widgets/fonts.css';
import AdsVideo from './AdsVideo'

function App() {
  const theme: Theme = {
    accent: '#ff3131'
  }
  const [showAdsVideo, setShowAdsVideo] = useState(false); // 新增的状态
  const adsVideoRef = useRef() as any;
  const [defaultInputTokenAddress, setDefaultInputTokenAddress] = useState('NATIVE');
  const [defaultOutputTokenAddress, setDefaultOutputTokenAddress] = useState('0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889');
  const [provider, setProvider] = useState<Web3Provider | undefined>()
  const { connector } = useAccount()
  const jsonRpcUrlMap = {
    1: [`https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`], // Ethereum Mainnet
    137: [`https://polygon-mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`], // Polygon Mainnet
    80001: [`https://polygon-mumbai.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`] // Polygon Mumbai Testnet
  }
  
  useEffect(() => {
    if (!connector) {
      const infuraProvider = new ethers.providers.JsonRpcProvider(`https://polygon-mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`);
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
      // adsVideoRef.current.play();
      setShowAdsVideo(true);
      const getNetwork = async () => {
        const network = await provider.getNetwork();
        if (network.chainId === 137) {
          setDefaultInputTokenAddress('NATIVE');
          setDefaultOutputTokenAddress('0xc2132D05D31c914a87C6611C10748AEb04B58e8F');
        }
      };
      getNetwork();
    }
  }, [provider]);

  const handleVideoEnd = (token: string) => {
    console.log('Video ended in App');
  }

  const handleRightClick = (event: React.MouseEvent) => {
    // event.preventDefault();
  }

  return (
    <div className="flex flex-col min-h-screen" onContextMenu={handleRightClick}> 
    {/*bg-gradient-to-r from-darkStart to-darkEnd text-white*/}
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
          {/* <InjectedCallbackContext.Provider value={{
              onConfirmSwap(event) {
                console.log('onConfirmSwap', event)
                return {
                  interrupt: true,
                }
              },
            }}>
              <SwapWidget 
              provider={provider} 
              theme={theme} 
              defaultInputTokenAddress='NATIVE' 
              defaultOutputTokenAddress={defaultOutputTokenAddress} 
              defaultInputAmount={0.001}
              jsonRpcUrlMap={jsonRpcUrlMap}
              hideConnectionUI={true}
              />
            </InjectedCallbackContext.Provider>  */}
          </div>
          <div className="adsContainer">
            { showAdsVideo && <AdsVideo ref={adsVideoRef} src={"ads.mov"}  onEnd={handleVideoEnd} />  }    
          </div>
          </div>
        {/* Main Content end */}
      </div>
      );
}

export default App;
