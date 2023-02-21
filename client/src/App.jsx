import React, { useEffect, useState } from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { bsc, bscTestnet } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import './css/App.scss';

export default function App() {
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

    const [myPick, setMyPick] = useState("");
    const [housePick, setHousePick] = useState("");
    const [gameScore, setGameScore] = useState(0);

    function newHousePick() {
        const choices = ["rock", "paper", "scissors"];
        const randomChoice = choices[Math.floor((Math.random()*3))];
        setHousePick(randomChoice);
    }

    useEffect(() => {
        newHousePick();
    },[setMyPick]);

    return (
         <Router>
            <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains}>
                <div className="wrapper">
                <Header score={gameScore}/>
                <Switch className="main">
                    <Route path="/">
                        <Home setPick={setMyPick} />
                    </Route>
                </Switch>
                <Footer />
                </div>
            </RainbowKitProvider>
            </WagmiConfig>
        </Router>
    )
}

