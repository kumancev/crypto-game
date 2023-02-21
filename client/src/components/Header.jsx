import React from "react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Scorebox from "./Scorebox";

function Header(props) {
    return (
        <div>
            <div className="header__connect">
                <ConnectButton />
            </div>
            <header>
                <h1 className="header__title">
                    <span>Rock</span>
                    <span>Paper</span>
                    <span>Scissors</span>
                </h1>
                {/* <Scorebox score={props.score}/> */}
            </header>
        </div>
    )
}

export default Header;