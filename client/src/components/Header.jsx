import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Header() {
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
