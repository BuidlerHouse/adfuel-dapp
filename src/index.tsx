import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import 'video-react/dist/video-react.css';
import { WagmiConfig, createClient, chain } from 'wagmi';
import { ConnectKitProvider, getDefaultClient } from 'connectkit';
import * as amplitude from '@amplitude/analytics-browser';

// https://github.com/Uniswap/widgets/issues/627#issuecomment-1930627298
declare global {
  interface Window {
    Browser: {
      T: () => void;
    };
  }
}

window.Browser = {
  T: () => {}
};

// Subscribe to messages
interface ProviderMessage {
  type: string;
  data: unknown;
}

const client = createClient(
  getDefaultClient({
    appName: 'AdFuel',
    infuraId: process.env.REACT_APP_INFURA_ID,
    // alchemyId: process.env.REACT_APP_ALCHEMY_ID,
    chains: [chain.polygon],
  })
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const eventProperties = {};
root.render(
  // <React.StrictMode>
    <WagmiConfig client={client}>
      <ConnectKitProvider theme="auto" options={{
        disclaimer: (
          <>
            By connecting your wallet you agree to the{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://en.wikipedia.org/wiki/Terms_of_service"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://en.wikipedia.org/wiki/Privacy_policy"
            >
              Privacy Policy
            </a>
          </>
        ),
      }}
    >
        <App />
      </ConnectKitProvider>
    </WagmiConfig>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
