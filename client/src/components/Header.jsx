import React from "react";
import { ConnectButton } from '@rainbow-me/rainbowkit';

function Header() {
    return (
        <div>
            <div className="header__connect">
                <ConnectButton />
            </div>
            <header>
                <h1 className="header__title">
                    Rock Paper Scissors
                </h1>
            </header>
        </div>
    )
}

export default Header;