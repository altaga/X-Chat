# X-Chat  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE) [<img src="https://img.shields.io/badge/View-Video-red">](pending)

<img src="https://i.ibb.co/BcFfwVX/xchat-logos.png" width="60%">

<br>

# IMPORTANT!

## Application:

X-Chat Wallet/Dapp APK: [LINK](./Xchat-APK/app-release.apk)

## Services and Chains:

- Connext: [Click Here](#connext)

- Gnosis : [Click Here](#gnosis)

- Scroll : [Click Here](#scroll)

- Optimism : [Click Here](#optimism)

- Mantle : [Click Here](#mantle)

- Taiko : [Click Here](#taiko)

## Here is our main demo video: 

[![Demo](https://i.ibb.co/g4W3ypx/image.png)](pending)

# Introduction and Problem:

Hello and welcome to X-Chat (Cross Chat), the revolutionary Dapp that allows you to chat and send assets across EVM and ZK compatible chains.

While we were looking for a problem to hack we saw that in almost every single one of the EVMs and rollups in the Ethereum ecosystem there was an inherent need to create a UI and protocol for address to address messaging within each one of these chains

<img src="https://i.ibb.co/6XfPzF6/article1.jpg">

In the world of blockchain technology, interoperability between different chains has always been a challenge. But with X-Chat, we have created a solution that enables users to seamlessly communicate and transact across various chains.
Whether you're an investor looking to move assets between different chains or a developer building a dapp that requires cross-chain communication, X-Chat has got you covered.

# Solution:

With our user-friendly interface and cutting-edge technology, X-Chat offers a secure and efficient way to chat and transact across chains. Our platform is built on the latest blockchain infrastructure, ensuring fast and reliable transactions at all times.

So, whether you're a seasoned blockchain enthusiast or new to the world of decentralized applications, X-Chat is the perfect platform for you to connect with others and explore the endless possibilities of the blockchain ecosystem.

# System's Architecture:

<img src="https://i.ibb.co/Cm6xn5P/Untitled-Diagram-drawio-2.png">

All messages, assets and files that are sent from one chain to another are sent through the xcall function in the contract deployed in the origin chain, which is passed to the Connext network to reach the xReciever in the contract deployed in the destination chain. The messages, assets and files that go within the same chain call the own contract of that chain, in this case the chains that are not compatible with connext have their own contract without xcall or xReciever.

- Connect:
   - Sending cross chain messages.
     - Using the xcall and xReciever commands of the SDK in our [Smart contract](Contracts/Xchat-crosschain.sol).
   - Sending USDC cross chain.
     - Through the xTransfer command of the SDK implemented in our [Smart contract](Contracts/Xchat-crosschain.sol).
- Gnosis
   - Sending messages, files and USDC to all chains compatible with Connext.
   - X-Chat Address:
     - Gnosis Explorer Contract Address: [0x4B50927d34b94Da4cD23c34c7Ce0a77469273fCE](https://gnosisscan.io/address/0x4B50927d34b94Da4cD23c34c7Ce0a77469273fCE)
   - Contract File: [FILE](./Contracts/Xchat-crosschain.sol)
- Optimism:
   - Sending messages, files and USDC to all chains compatible with Connext.
   - X-Chat Address:
     - Optimism Explorer Contract Address:  [0x423dB5c61bf3a0D140D8b2cDEe83617A32e56471](https://optimistic.etherscan.io/address/0x423dB5c61bf3a0D140D8b2cDEe83617A32e56471)
   - Contract File: [FILE](./Contracts/Xchat-crosschain.sol)
- Polygon
   - Sending messages, files and USDC to all chains compatible with Connext.
   - X-Chat Address:
     - Polygon Explorer Contract Address:  [0xb3112D34958e6Fe3aeC0052b7d845f396aE22049](https://polygonscan.com/address/0xb3112D34958e6Fe3aeC0052b7d845f396aE22049)
   - Contract File: [FILE](./Contracts/Xchat-crosschain.sol)
- Arbitrum
   - Sending messages, files and USDC to all chains compatible with Connext.
   - X-Chat Address:
     - Arbitrum Explorer Contract Address:  [0x423dB5c61bf3a0D140D8b2cDEe83617A32e56471](https://arbiscan.io/address/0x423dB5c61bf3a0D140D8b2cDEe83617A32e56471)
   - Contract File: [FILE](./Contracts/Xchat-crosschain.sol)
- BNB:
   - Sending messages, files and USDC to all chains compatible with Connext.
   - X-Chat Address:
     - BNB Explorer Contract Address: [0x423dB5c61bf3a0D140D8b2cDEe83617A32e56471](https://bscscan.com/address/0x423dB5c61bf3a0D140D8b2cDEe83617A32e56471)
   - Contract File: [FILE](./Contracts/Xchat-crosschain.sol)
- Scroll
   - Sending messages, files and USDC to the same secure and efficient chain thanks to the ZK incorporated into the network.
   - X-Chat Address:
     - Scroll Explorer Contract Address: [0x5589Ca69a02277af6019e6007D876095F1320F28](https://blockscout.scroll.io/address/0x5589Ca69a02277af6019e6007D876095F1320F28)
   - Contract File: [FILE](./Contracts/Xchat-onchain.sol)
- Taiko
   - Sending messages, files and USDC to the same secure and efficient chain thanks to the ZK incorporated into the network.
   - X-Chat Address:
     - Taiko Explorer Contract Address: [0x512Db9Ac59639AccEB521918cdFbdEA49a0A6A73](https://explorer.a2.taiko.xyz/address/0x512Db9Ac59639AccEB521918cdFbdEA49a0A6A73)
   - Contract File: [FILE](./Contracts/Xchat-onchain.sol)
- Mantle:
   - Sending messages, files and WETH to the same secure and efficient chain thanks to the ZK incorporated into the network.
   - X-Chat Address:
     - Mantle Explorer Contract Address: [0x512Db9Ac59639AccEB521918cdFbdEA49a0A6A73](https://explorer.testnet.mantle.xyz/address/0x512Db9Ac59639AccEB521918cdFbdEA49a0A6A73)
   - Contract File: [FILE](./Contracts/Xchat-onchain.sol)
- ChainSafe (Filecoin):
   - Upload files to IPFS through Chainsafe API.

# X-Chat React Native DApp:

X-Chat is a very complete Dapp, which provides us with all the wallet and chat services. Not to mention its ability to perform crosschain operations.

<img src="https://i.ibb.co/LQBLQNn/screen1.png">

Within the crosschain capabilities, the most important in our opinion is the fact of being able to send chat messages from one chain to another and in turn being able to transfer ERC20 tokens without any difficulty thanks to our simple UI and Connext services.

<img src="https://i.ibb.co/6HBCzZ4/screen2.png">

Finally, thinking about the performance of the app, a simple design was sought that could easily run on cell phones from high-end to low-intermediate range.

<img src="https://i.ibb.co/hFXTmbX/vlcsnap-2023-03-25-04h14m07s961.png">

# Connext:

All transactions that require communication from one chain to another use the [Connext SDK](https://www.npmjs.com/package/@connext/smart-contracts) this implementation is in the contract [Xchat-crosschain](Contracts/Xchat-crosschain.sol).

<img src="https://i.ibb.co/8d52WsP/scheme-drawio-2.png">

Before sending the message, we have to obtain a relayerFee which we have to send as a value within our transaction for the transfer to be successful, the script to obtain the relayer fee is as follows.

    const sdkConfig = {
            network: "mainnet",
            chains: {
                6648936: {
                    providers: ["https://api.securerpc.com/v1"],
                },
                1869640809: {
                    providers: ["https://mainnet.optimism.io"],
                },
                1886350457: {
                    providers: ["https://arbitrum-one.public.blastapi.io"],
                },
                1634886255: {
                    providers: ["https://arbitrum-one.public.blastapi.io"],
                },
                6450786: {
                    providers: ["https://bsc-dataseed1.defibit.io"],
                },
                6778479: {
                    providers: ["https://rpc.gnosis.gateway.fm"],
                }
            },
        };
        const { sdkBase } = await create(sdkConfig);
        const originDomain = chainIn.toString();
        const destinationDomain = chainOut.toString();
        // Estimate the relayer fee
        try{
            const relayerFee = await sdkBase.estimateRelayerFee({
                originDomain,
                destinationDomain
            })
            return (relayerFee.toString())
        }
        catch{
            return("0")
        }

The flow of sending the message is to call the sendMessageX function from the contract displayed in the source chain.

    function sendMessageX(
        address target,
        uint32 destinationDomain,
        address _to,
        string memory _message,
        uint256 relayerFee,
        uint256 _amount,
        address _token
    ) external payable {
        bytes memory callData = abi.encode(
            msg.sender,
            _to,
            _message,
            _amount,
            _token
        );
        connext.xcall{value: relayerFee}(
            destinationDomain, // _destination: Domain ID of the destination chain
            target, // _to: address of the target contract
            address(0), // _asset: address of the token contract
            msg.sender, // _delegate: address that can revert or forceLocal on destination
            0, // _amount: amount of tokens to transfer
            0, // _slippage: max slippage the user will accept in BPS (e.g. 300 = 3%)
            callData // _callData: the encoded calldata to send
        );
    }

Later, when calling xcall, it will send this information from the source chain to the destination chain, which has an xReciever implemented in its own contract, which will process the call and, in our case, will add the message to the history.

    function xReceive(
        bytes32 _transferId,
        uint256 _amount,
        address _asset,
        address _originSender,
        uint32 _origin,
        bytes memory _callData
    ) external returns (bytes memory) {
        (   
        address _from,
        address _to,
        string memory _message,
        uint256 amount,
        address token
        ) = abi.decode(_callData, (address, address, string, uint256, address));
        addMessageX(_from, _to, _message, _origin, amount, token);
        return "ok";
    }

Finally, the communication can be summarized in the following schematic.

<img src="https://i.ibb.co/hRbqbgy/scheme-Connext-drawio.png">

All the transactions that we show in the demos can be reviewed in the Connext Explorer.

https://connextscan.io/address/0x2A9EF6632842f2FB3da32Ac0A558B3b7062C0F13

# Gnosis:

In our development we use the Gnosis MAINNET, since it allows our application to have a secure layer and with a stable native token, in this case xDai, for our application it is very beneficial to be able to keep fees low when sending messages or USDC tokens from Gnosis to any of the other chains in Connext or to the same chain.

<img src="https://i.ibb.co/G2DPP8y/image.png">

- X-Chat Address:
  - Gnosis Explorer Contract Address:  [0x4B50927d34b94Da4cD23c34c7Ce0a77469273fCE](https://gnosisscan.io/address/0x4B50927d34b94Da4cD23c34c7Ce0a77469273fCE)
- Contract File: [FILE](./Contracts/Xchat-crosschain.sol)

In the following screens of our app, we can see the cost per message within the same chain is less than 1 cent and 6 cents in a crosschain transaction with polygon.

<img src="https://i.ibb.co/JtWSxpd/New-Project-1.png">

# Scroll:

Scroll has a very big benefit for our X-Chat application, since using it we were able to obtain presumable speeds of 3 seconds between messages, in addition to being able to quickly send USDC over the same network quickly.

<img src="https://i.ibb.co/ry2w8RZ/image.png">

- X-Chat Address:
  - Scroll Explorer Contract Address:  [0x5589Ca69a02277af6019e6007D876095F1320F28](https://blockscout.scroll.io/address/0x5589Ca69a02277af6019e6007D876095F1320F28)
- Contract File: [FILE](./Contracts/Xchat-onchain.sol)

As we mentioned the costs for sending messages by Scroll are quite low, here is a screen shot showing some costs per transaction which are not usually greater than 0.0008 dollars.

<img src="https://i.ibb.co/7N4GWfH/New-Project-2.png">

# Optimism:

For the Optimism network we wanted to attack a problem directly that they are looking for, which is creating a UI and protocol for address to address messaging and the contract is deployed on MAINNET.

<img src="https://i.ibb.co/3sSnqNf/Whats-App-Image-2023-03-23-at-01-57-19.jpg">

- X-Chat Address:
  - Optimism MAINNET Explorer Contract Address: [0x423dB5c61bf3a0D140D8b2cDEe83617A32e56471](https://optimistic.etherscan.io/address/0x423dB5c61bf3a0D140D8b2cDEe83617A32e56471)
- Contract File: [FILE](./Contracts/Xchat-crosschain.sol)

Something very remarkable about Optimism was the costs per transaction that it offered us to send messages on the same chain and crosschain, not exceeding 0.0008 usd and 0.0023 usd respectively.

<img src="https://i.ibb.co/pnSVrrQ/New-Project-3.png">

# Mantle:

The Mantle network offered us an architecture with low fees and high security, despite still being Testnet and having low gas fees at the time of uploading this project, it was a network that offered us good transaction speed and full compatibility to deploy our contract in it, working perfectly, managing to send WETH tokens, messages and files.

<img src="https://i.ibb.co/5c8pGnd/image.png">

- X-Chat Address:
    - Mantle Explorer Contract Address: [0x512Db9Ac59639AccEB521918cdFbdEA49a0A6A73](https://explorer.testnet.mantle.xyz/address/0x512Db9Ac59639AccEB521918cdFbdEA49a0A6A73)
  - Contract File: [FILE](./Contracts/Xchat-onchain.sol)

The network offered us good speed when sending messages and a very low cost in transactions. 

<img src="https://i.ibb.co/y8MP1dk/New-Project-4.png">

# Taiko:

For the use of Taiko, special attention was paid to the UI/UX of the project, since it is something that many applications, when they are very focused on developers, tend to lack, so we tried to make a simple interface to be able to send messages over the network. of Taiko and in turn one of its ERC20 Tokens BLL.

<img src="https://i.ibb.co/N3NwBGR/image.png">

- X-Chat Address:
  - Taiko Explorer Contract Address: [0x512Db9Ac59639AccEB521918cdFbdEA49a0A6A73](https://explorer.a2.taiko.xyz/address/0x512Db9Ac59639AccEB521918cdFbdEA49a0A6A73)
- Contract File: [FILE](./Contracts/Xchat-onchain.sol)

Here are some screenshots of our UI and how we send messages, files and show the balance of our wallet.

<img src="https://i.ibb.co/BtQhF0z/New-Project-5.png">

# Polygon

Al ser una de las Chains mas populares y con un enorme flujo de transacciones por minuto, es normal pensar que se puede utilizar para interactuar con otras chains a travez de mandar stablecoins como USDC o solo tener una amena conversacion entre amigos con un costo muy bajo por transaccion.

<img src="https://i.ibb.co/dc7Kwmh/image.png">

- X-Chat Address:
  - Polygon Explorer Contract Address:  [0xb3112D34958e6Fe3aeC0052b7d845f396aE22049](https://polygonscan.com/address/0xb3112D34958e6Fe3aeC0052b7d845f396aE22049)
- Contract File: [FILE](./Contracts/Xchat-crosschain.sol)

En esta red fue muy notorio que el costo por transaccion e incluso las transacciones crosschain era muy rapidas y de costo muy bajo, esto podia verse afectado si la red estaba muy congestionada, pero al ser una layer 2 con buena velocidad esto es raro que ocurra.

<img src="https://i.ibb.co/4J76pCv/New-Project-6.png">

# Current state and what's next:

With our user-friendly interface and cutting-edge technology, X-Chat offers a secure and efficient way to chat and transact across chains. Our platform is built on the latest blockchain infrastructure, ensuring fast and reliable transactions at all times.
So, whether you're a seasoned blockchain enthusiast or new to the world of decentralized applications, X-Chat is the perfect platform for you to connect with others and explore the endless possibilities of the blockchain ecosystem.
Thank you for reading!


# Team:

#### 3 Engineers with experience developing Blockchain, IoT, AI and hardware solutions. We have been working together now for 5 years since University.

[<img src="https://img.shields.io/badge/Luis%20Eduardo-Arevalo%20Oliver-blue">](https://www.linkedin.com/in/luis-eduardo-arevalo-oliver-989703122/)

[<img src="https://img.shields.io/badge/Victor%20Alonso-Altamirano%20Izquierdo-lightgrey">](https://www.linkedin.com/in/alejandro-s%C3%A1nchez-guti%C3%A9rrez-11105a157/)

[<img src="https://img.shields.io/badge/Alejandro-Sanchez%20Gutierrez-red">](https://www.linkedin.com/in/victor-alonso-altamirano-izquierdo-311437137/)
 
# References:

