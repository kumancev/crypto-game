// import React, { useState, useEffect } from 'react';
// import { ethers } from 'ethers';
// import { useAccount } from 'wagmi'
// import {RPSGameABI, RPSGameAddress} from "../abi/RPSGame";

// // import RPSGame from "./contracts/RPSGame.json";

// function PlayCrypto() {
//   const [gameContract, setGameContract] = useState(null);
//   const [gameResult, setGameResult] = useState(null);
//   const [playerChoice, setPlayerChoice] = useState(null);

//   const { address } = useAccount();

//   const [gameResults, setGameResults] = useState([]);

//   useEffect(() => {
//     const fetchGameResults = async () => {
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const signer = provider.getSigner();
//       const game = new ethers.Contract(RPSGameAddress, RPSGameABI, signer);

//       game.on('GameResult', (player, playerChoice, contractChoice, playerWon, event) => {
//         const newGameResult = { player, playerChoice, contractChoice, playerWon };
//         setGameResults(prevState => [...prevState, newGameResult]);
//       });
//     };

//     fetchGameResults();
//   }, [playerChoice]);

//   console.log(gameResults);
//   // Connect to the game contract on the blockchain
//   useEffect(() => {
//     async function connectToContract() {
//       try {
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         const signer = provider.getSigner();
//         const game = new ethers.Contract(RPSGameAddress, RPSGameABI, signer);
//         setGameContract(game);
//       } catch (error) {
//         console.error(error);
//       }
//     }

//     connectToContract();
//   }, [address])


//   // Play the game and display the results
//   async function playGame(choice) {
//     try {
//       // const result = await gameContract.play(choice, { value: ethers.utils.parseEther("0.1") });
//       const overrides = {
//         value: ethers.utils.parseEther('0.1')
//       };
//       const tx = await gameContract.play(choice, overrides);
//       await tx.wait();
//       setPlayerChoice(choice);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   return (
//     <div className="playcrypto-wrapper">
//       {/* <h1>Rock Paper Scissors Game</h1> */}
//       <p>Price per game: 0.1 ETH</p>
//       {gameResults.playerWon ? "You won!" : "You lost!"}
//       {gameContract && (
//         <div>
//           <h2>Make your choice:</h2>
//           <button onClick={() => playGame(0)}>Rock</button>
//           <button onClick={() => playGame(1)}>Paper</button>
//           <button onClick={() => playGame(2)}>Scissors</button>
//           {gameResult && (
//             <div>
//               <h2>You chose: {playerChoice === 0 ? "Rock" : playerChoice === 1 ? "Paper" : "Scissors"}</h2>
//               <h2>{gameResult}</h2>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default PlayCrypto;




// // function PlayCrypto() {
// //   const [contract, setContract] = useState(null);
// //   const [gameResult, setGameResult] = useState(null);
// //   const [provider, setProvider] = useState(null);
// //   // const [switch, setSwitch] = useState(false);
// //   // const [switcher, setSwitcher] = useState(false);
// //   const { address } = useAccount()
// //   const [balance, setBalance] = useState(0);

// //   console.log(gameResult);

// //   useEffect(() => {
// //     const getProvider = async () => {
// //       const provider = new ethers.providers.Web3Provider(window.ethereum);
// //       await window.ethereum.enable();
// //       setProvider(provider);
// //     };
// //     getProvider();
// //   }, []);

// //   useEffect(() => {
// //     const getContract = async () => {
// //       if (provider) {
// //         const signer = provider.getSigner();
// //         // const network = await provider.getNetwork();
// //         // const contractAddress = RPSGameABI.networks[network.chainId].address;
// //         const contract = new ethers.Contract(RPSGameAddress, RPSGameABI, signer);
// //         // const contract = new ethers.Contract(RPSGameAddress, RPSGameABI, signer);
// //         setContract(contract);
// //       }
// //     };
// //     getContract();
// //   }, [balance]);

// //   useEffect(() => {
// //     // const getUserBalance = async () => {
// //     //   if (provider) {
// //     //     const signer = provider.getSigner();
// //     //     const etherBalance = ethers.utils.formatEther(signer.balance);
// //     //     const balance = parseFloat(etherBalance);
// //     //     // return BigInt(etherBalance)
// //     //     console.log(`Balance of ${address}: ${balance} ETH`);
// //     //   }
// //     // };
// //     // getUserBalance();
// //     // provider.getBalance(address).then((balance) => {
// //     //   // Convert the balance to ETH
// //     //   const etherBalance = ethers.utils.formatEther(balance);
// //     //   console.log(`Balance of ${address}: ${etherBalance} ETH`);
// //     // }).catch((error) => {
// //     //   console.error(error);
// //     // });
// //   })

// //   const getBalance = async () => {
// //     try {
// //       const balance = await provider.getBalance(address);
// //       setBalance(ethers.utils.formatEther(balance));
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   };
  
// //   useEffect(() => {
// //     if (!contract) return;

// //     contract.on('GameResult', (player, playerChoice, contractChoice, playerWon) => {
// //       setGameResult({ player, playerChoice, contractChoice, playerWon });
// //     });

// //     return () => {
// //       // remove the listener when the component unmounts
// //       contract.removeAllListeners('GameResult');
// //     };
// //   }, [provider]);

// //   const playGame = async (choice) => {
// //     try {
// //       // const tx = await contract.play(choice, { value: contract.priceOneGame });
// //       // await tx.wait();
// //       const overrides = {
// //         value: ethers.utils.parseEther('0.1')
// //       };
// //       const tx = await contract.play(choice, overrides);
// //       await tx.wait();

// //     } catch (error) {
// //       console.error(error);
// //     }
// //   };

// //   return (
// //     <div className='playcrypto-wrapper'>
// //       {gameResult ? (
// //         <p>
// //           You {gameResult.playerWon ? 'won' : 'lost'}! Your choice: {gameResult.playerChoice}, Contract choice:{' '}
// //           {gameResult.contractChoice}.
// //         </p>
// //       ) : (
// //         <div>
// //           <button onClick={() => playGame(0)}>Play Rock</button>
// //           <button onClick={() => playGame(1)}>Play Paper</button>
// //           <button onClick={() => playGame(2)}>Play Scissors</button>

// //           <button onClick={getBalance}>Get Balance</button>
// //           <p>Balance: {balance} ETH</p>
// //         {/* <button onClick={() => playGame(0)}>Play game</button> */}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default PlayCrypto;







// // Connect to the network
// // const provider = new ethers.providers.Web3Provider(window.ethereum);
// // const signer = provider.getSigner();
// // const contract = new ethers.Contract(RPSGameAddress, RPSGameABI, signer);

// // function PlayCrypto() {
// //   const [didWin, setDidWin] = useState(false);
// //   const [choice, setChoice] = useState(null);

// //   const playGame = async () => {
// //     try {
// //       // Call the play function on the contract
// //       // const tx = await contract.play(choice, { value: ethers.utils.parseEther('0.1') });
// //       // await tx.wait();
// //       const overrides = {
// //         value: ethers.utils.parseEther('0.1')
// //       };
// //       const tx = await contract.play(choice, overrides);
// //       await tx.wait();

// //       // Get the current user's address
// //       const currentUserAddress = await signer.getAddress();

// //       // Read the isWin mapping for the current user
// //       const isUserWin = await contract.isWin(currentUserAddress);

// //       // Update the UI with the result
// //       setDidWin(isUserWin);
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   };

// //   console.log(choice);
// //   return (
// //     <div className='playcrypto-wrapper'>
// //       {/* <button onClick={() => playGame(0)}>Play Rock</button>
// //       <button onClick={() => playGame(1)}>Play Paper</button>
// //       <button onClick={() => playGame(2)}>Play Scissors</button> */}
// //       <button onClick={() => setChoice(0)}>Rock</button>   
// //       <button onClick={() => setChoice(1)}>Paper</button>
// //       <button onClick={() => setChoice(2)}>Scissors</button>
// //       <button onClick={playGame}>Play</button>

// //       <p>{didWin ? "You won!" : "You lost!"}</p>
// //     </div>
// //   );
// // }

// // export default PlayCrypto;




// // function PlayCrypto() {
// //   const [provider, setProvider] = useState(null);
// //   const [contract, setContract] = useState(null);
// //   const [isOwner, setIsOwner] = useState(false);
// //   const [choice, setChoice] = useState(null);
// //   const [win, setWin] = useState(null);
// //   const [gameEnd, setGameEnd] = useState(null);
// //   const { address, isConnecting, isDisconnected } = useAccount()
// //   // const [balance, setBalance] = useState(null);

// //   console.log(choice);
// //   console.log(isOwner);

// //   useEffect(() => {
// //     async function fetchData() {
// //       const provider = new ethers.providers.Web3Provider(window.ethereum);
// //       const signer = provider.getSigner();
// //       const contract = new ethers.Contract(RPSGameAddress, RPSGameABI, signer);
// //       setProvider(provider);
// //       setContract(contract);
  
// //       const owner = await contract.owner();
// //       const address = await signer.getAddress();
// //       setIsOwner(owner === address);
// //     }

// //     fetchData();
// //     getResult(contract, address);

// //   }, [address])
  
// //   // Connect to the Ethereum network and instantiate the contract
// //   async function connect() {
// //     const provider = new ethers.providers.Web3Provider(window.ethereum);
// //     const signer = provider.getSigner();
// //     const contract = new ethers.Contract(RPSGameAddress, RPSGameABI, signer);
// //     setProvider(provider);
// //     setContract(contract);

// //     // Check if the current user is the contract owner
// //     const owner = await contract.owner();
// //     const address = await signer.getAddress();
// //     setIsOwner(owner === address);

// //     // Get the user's balance
// //     // const userBalance = await provider.getBalance(address);
// //     // setBalance(userBalance);
// //   }

// //   // Play the game
// //   async function play() {
// //     // const provider = new ethers.providers.Web3Provider(window.ethereum);
// //     // const signer = provider.getSigner();
// //     // const contract = new ethers.Contract(RPSGameAddress, RPSGameABI, signer);
// //     // setProvider(provider);
// //     // setContract(contract);

// //     const overrides = {
// //       value: ethers.utils.parseEther('0.1')
// //     };
// //     const tx = await contract.play(choice, overrides);
// //     await tx.wait();

// //     // Check if the user won
// //     // const isWinner = await contract.isWin(await contract.signer.getAddress());
// //   }

// //   async function getResult(contract, address) {
// //     const isWinner = await contract.isWin(address)
    
// //     setWin(isWinner);
// //   }

// //   console.log("WIN >>> ", win)

// //   // Withdraw the contract balance (only for the owner)
// //   async function withdraw() {
// //     const tx = await contract.withdraw();
// //     await tx.wait();

// //     // Update the user's balance
// //     // const address = await contract.signer.getAddress();
// //     // const userBalance = await provider.getBalance(address);
// //     // setBalance(userBalance);
// //   }

// //   return (
// //     <div className='playcrypto-wrapper'>
// //         <div>
// //           {isOwner && (
// //             <button onClick={withdraw}>Withdraw balance</button>
// //           )}
// //           {/* <p>Balance: {ethers.utils.formatEther(balance)} BNB</p> */}
// //           {/* <p>Price of one game: {ethers.utils.formatEther(await contract.priceOneGame())} BNB</p> */}
// //           <p>Choose your move:</p>
// //           <button onClick={() => setChoice(0)}>Rock</button>
// //           <button onClick={() => setChoice(1)}>Paper</button>
// //           <button onClick={() => setChoice(2)}>Scissors</button>
// //           <button onClick={play}>Play</button>
// //           {/* <div>
// //             {isGameEnd ? 'Congratulations, you won!' : 'Sorry, you lost.'}
// //           </div> */}

// //           {win !== null && (
// //             <p>{win ? 'You won!' : 'You lost.'}</p>
// //           )}
// //         </div>
// //     </div>
// //   );
// // }

// // export default PlayCrypto;

// // import React, { useState } from "react";
// // import { ethers } from "ethers";
// // import {RPSGameABI, RPSGameAddress} from "../abi/RPSGame";


// // function PlayCrypto() {
// //   const [loading, setLoading] = useState(false);
// //   const [choice, setChoice] = useState(null);
// //   const [result, setResult] = useState(null);
// //   const [win, setWin] = useState(null);

// //   console.log(choice);
// //   async function playGame() {
// //     setLoading(true);
// //     const provider = new ethers.providers.Web3Provider(window.ethereum);
// //     const signer = provider.getSigner();
// //     const contract = new ethers.Contract(RPSGameAddress, RPSGameABI, signer);

// //     try {
// //       const tx = await contract.play(choice, { value: ethers.utils.parseEther("0.1") });
// //       await tx.wait();
      
// //       // Check if the user won
// //       const isWinner = await contract.isWin(await contract.signer.getAddress());
// //       setWin(isWinner);
// //       console.log(isWinner);
// //       setResult("You won!");
// //     } catch (err) {
// //       console.error(err);
// //       setResult("You lost!");
// //     }

// //     setLoading(false);
// //   }

// //   return (
// //     <div className="playcrypto-wrapper">
// //       <h1>Rock-Paper-Scissors</h1>
// //       <div>
// //         <button onClick={() => setChoice(0)}>Rock</button>
// //         <button onClick={() => setChoice(1)}>Paper</button>
// //         <button onClick={() => setChoice(2)}>Scissors</button>
// //       </div>
// //       <button onClick={playGame} >
// //         Play
// //       </button>
// //       {result && <p>{result}</p>}
// //     </div>
// //   );
// // }

// // export default PlayCrypto;
