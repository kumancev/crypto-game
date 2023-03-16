import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useAccount } from 'wagmi'
import {RPSGameABI, RPSGameAddress} from "../abi/RPSGame";
import bgTriangle from '../images/bg-triangle.svg';
import paperIcon from "../images/icon-paper.svg";
import scissorsIcon from "../images/icon-scissors.svg";
import rockIcon from "../images/icon-rock.svg";


export default function Home() {
  const [gameContract, setGameContract] = useState(null);
  const [playerChoice, setPlayerChoice] = useState(null);

  const { address } = useAccount();

  const [gameResults, setGameResults] = useState([]);
  
  useEffect(() => {
    const fetchGameResults = async () => {
      try {
        if(!window.ethereum) return
  
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner();
        const game = new ethers.Contract(RPSGameAddress, RPSGameABI, signer);
  
        game.on('GameResult', (player, playerChoice, contractChoice, playerWon, event) => {
          const newGameResult = { player, playerChoice, contractChoice, playerWon };
          setGameResults(prevState => [...prevState, newGameResult]);
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchGameResults();
  }, [playerChoice]);

  console.log(gameResults);
  // Connect to the game contract on the blockchain
  useEffect(() => {
    async function connectToContract() {
      try {
        if(!window.ethereum) return
    
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner();
        const game = new ethers.Contract(RPSGameAddress, RPSGameABI, signer);
        setGameContract(game);
      } catch (error) {
        console.error(error);
      }
    }

    connectToContract();
  }, [address])


  // Play the game and display the results
  async function playGame(choice) {
    try {
      const overrides = {
        value: ethers.utils.parseEther('0.1'),
      };
      const tx = await gameContract.play(choice, overrides);
      await tx.wait();
      setPlayerChoice(choice);
    } catch (error) {
      console.error(error);
    }
  }
    return (
        <div className="home">
            <h2>Price per game: 0.1 BNB</h2>
              {gameResults.length === 0 ? "" : gameResults.playerWon ? <h3>You win!</h3> : <h3>You lose!</h3>}
            <img className="triangle" src={bgTriangle}/>
                <div data-id="paper" className="home__item home__paper" style={{backgroundImage: `url(${paperIcon})`}}>
                    <button className="play__btn" onClick={() => playGame(1)}></button>
                </div>
                <div data-id="scissors" className="home__item home__scissors" style={{backgroundImage: `url(${scissorsIcon})`}}>
                    <button className="play__btn"  onClick={() => playGame(2)}></button>
                </div>
                <div data-id="rock" className="home__item home__rock" style={{backgroundImage: `url(${rockIcon})`}}>
                    <button className="play__btn"  onClick={() => playGame(0)}></button>
                </div>
        </div>
    )
}
