import { useState, useEffect, useRef } from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import {
    getDefaultWallets,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { bsc, bscTestnet } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import { useAccount } from 'wagmi';
import './css/App.scss';

const { chains, provider } = configureChains(
    [bsc, bscTestnet],
    [
        alchemyProvider({ apiKey: import.meta.env.ALCHEMY_ID }),
        publicProvider()
    ]
);

const { connectors } = getDefaultWallets({
    appName: 'Rock Paper Scissors Game',
    chains
});

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
})

export default function App() {
    const { address } = useAccount();

    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains} coolMode>
                <div className="wrapper">
                    <Header />
                        {address 
                            ? <Home />
                            : <h2>Connect your wallet before start game!</h2>
                        }
                    <Footer />
                </div>
            </RainbowKitProvider>
        </WagmiConfig>
    )
}

