# X-Chat  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE) [<img src="https://img.shields.io/badge/View-Video-red">](pending)

<img src="https://i.ibb.co/BcFfwVX/xchat-logos.png" width="60%">

<br>

Welcome, this is our project for [Scaling Ethereum Hackathon](https://ethglobal.com/events/scaling2023).

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

In the world of blockchain technology, interoperability between different chains has always been a challenge. But with X-Chat, we have created a solution that enables users to seamlessly communicate and transact across various chains.

Whether you're an investor looking to move assets between different chains or a developer building a dapp that requires cross-chain communication, X-Chat has got you covered.

# Solution:

With our user-friendly interface and cutting-edge technology, X-Chat offers a secure and efficient way to chat and transact across chains. Our platform is built on the latest blockchain infrastructure, ensuring fast and reliable transactions at all times.

So, whether you're a seasoned blockchain enthusiast or new to the world of decentralized applications, X-Chat is the perfect platform for you to connect with others and explore the endless possibilities of the blockchain ecosystem.

# System's Architecture:

<img src="https://i.ibb.co/Cm6xn5P/Untitled-Diagram-drawio-2.png">

Todos los mensajes, assets y archivos que se mandan de una chain a otra son mandados mediante la funcion xcall en el contrato desplegado en la chain origen, el cual pasa a la red de Connext para que lleguen al xReciever en el contrato desplegado en la chain destino, los mensajes, assets y achivos que van dentro de una misma chain llaman al contrato propio de esa chain, en este caso las chains que no son compatibles con connext tienen su propio contrato sin xcall ni xReciever.

- Connext:
  - Envio de mensajes cross chain.
    - Mediante los comandos xcall y xReciever del SDK en nuestro [Smart contract](Contracts/Xchat-crosschain.sol).
  - Envio de USDC cross chain.
    - Mediante el comando xTransfer del SDK implementado en nuestro [Smart contract](Contracts/Xchat-crosschain.sol).
- Gnosis
  - Envio de mensajes, archivos y USDC a todas las chains compatibles con Connext.
  - X-Chat Address:
    - Gnosis Explorer Contract Address: [0x4B50927d34b94Da4cD23c34c7Ce0a77469273fCE](https://gnosisscan.io/address/0x4B50927d34b94Da4cD23c34c7Ce0a77469273fCE)
  - Contract File: [FILE](./Contracts/Xchat-crosschain.sol)
- Optimism:
  - Envio de mensajes, archivos y USDC a todas las chains compatibles con Connext.
  - X-Chat Address:
    - Optimism Explorer Contract Address: [0x423dB5c61bf3a0D140D8b2cDEe83617A32e56471](https://optimistic.etherscan.io/address/0x423dB5c61bf3a0D140D8b2cDEe83617A32e56471)
  - Contract File: [FILE](./Contracts/Xchat-crosschain.sol)
- Polygon
  - Envio de mensajes, archivos y USDC a todas las chains compatibles con Connext.
  - X-Chat Address:
    - Polygon Explorer Contract Address: [0xb3112D34958e6Fe3aeC0052b7d845f396aE22049](https://polygonscan.com/address/0xb3112D34958e6Fe3aeC0052b7d845f396aE22049)
  - Contract File: [FILE](./Contracts/Xchat-crosschain.sol)
- Arbitrum
  - Envio de mensajes, archivos y USDC a todas las chains compatibles con Connext.
  - X-Chat Address:
    - Arbitrum Explorer Contract Address: [0x423dB5c61bf3a0D140D8b2cDEe83617A32e56471](https://arbiscan.io/address/0x423dB5c61bf3a0D140D8b2cDEe83617A32e56471)
  - Contract File: [FILE](./Contracts/Xchat-crosschain.sol)
- BNB:
  - Envio de mensajes, archivos y USDC a todas las chains compatibles con Connext.
  - X-Chat Address:
    - BNB Explorer Contract Address:[0x423dB5c61bf3a0D140D8b2cDEe83617A32e56471](https://bscscan.com/address/0x423dB5c61bf3a0D140D8b2cDEe83617A32e56471)
  - Contract File: [FILE](./Contracts/Xchat-crosschain.sol)
- Scroll
  - Envio de mensajes, archivos y USDC a la misma chain segura y eficiente gracias al ZK incorporado en la red.
  - X-Chat Address:
    - Scroll Explorer Contract Address:[0x5589Ca69a02277af6019e6007D876095F1320F28](https://blockscout.scroll.io/address/0x5589Ca69a02277af6019e6007D876095F1320F28)
  - Contract File: [FILE](./Contracts/Xchat-onchain.sol)
- Taiko
  - Envio de mensajes, archivos y USDC a la misma chain segura y eficiente gracias al ZK incorporado en la red.
  - X-Chat Address:
    - Taiko Explorer Contract Address:[0x512Db9Ac59639AccEB521918cdFbdEA49a0A6A73](https://explorer.a2.taiko.xyz/address/0x512Db9Ac59639AccEB521918cdFbdEA49a0A6A73)
  - Contract File: [FILE](./Contracts/Xchat-onchain.sol)
- Mantle:
  - Envio de mensajes, archivos y USDC a la misma chain segura y eficiente gracias al ZK incorporado en la red.
  - X-Chat Address:
    - Mantle Explorer Contract Address:[0x512Db9Ac59639AccEB521918cdFbdEA49a0A6A73](https://explorer.testnet.mantle.xyz/address/0x512Db9Ac59639AccEB521918cdFbdEA49a0A6A73)
  - Contract File: [FILE](./Contracts/Xchat-onchain.sol)
- ChainSafe (Filecoin):
  - Subida de archivos a IPFS atravez de Chainsafe API.

# X-Chat React Natve DApp:



# Connext:

Todas las transacciones que requieren comunicarse de una chain a otra usan the [Connext SDK](https://www.npmjs.com/package/@connext/smart-contracts) esta implementacion esta en el contrato [Xchat-crosschain](Contracts/Xchat-crosschain.sol).

<img src="https://i.ibb.co/8d52WsP/scheme-drawio-2.png">

Antes de mandar el mensaje, tenemos que obtener un relayerFee el cual tenemos que mandar como value dentro de nuestra transaccion para que la transferencia se exitosa, el script para obtener el relayer fee es el siguiente.

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

El flujo de envio del mensaje es llamar la funcion sendMessageX desde el contrato desplegado en la chain de origen.

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

Posteriormente al llamar a xcall mandara esta informacion desde la chain origen a la chain destino, la cual tiene implementado en su propio contrato un xReciever, el cual procesara la llamada y en nuestro caso agregara el mensaje a el historial.

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

Finalmente la comunicacion puede resumirse en el siguiente esquema.

<img src="https://i.ibb.co/hRbqbgy/scheme-Connext-drawio.png">

Todas las transacciones que mostramos en los demos pueden revisarlas en el Connext Explorer.

https://connextscan.io/address/0x2A9EF6632842f2FB3da32Ac0A558B3b7062C0F13

# Gnosis:

En nuestro desarrollo utilizamos Gnosis MAINNET, ya que permite a nuestra aplicacion tener una layer segura y con una token nativa estable, en este caso el xDai, para nuestra aplicacion es muy benefico poder mantener las tarrifas bajas al mandar mensajes o USDC tokens desde Gnosis a cualquiera de las otras chains en Connext o a la misma chain.

<img src="https://i.ibb.co/G2DPP8y/image.png">

- X-Chat Address:
  - Gnosis Explorer Contract Address: [0x4B50927d34b94Da4cD23c34c7Ce0a77469273fCE](https://gnosisscan.io/address/0x4B50927d34b94Da4cD23c34c7Ce0a77469273fCE)
- Contract File: [FILE](./Contracts/Xchat-crosschain.sol)

En las siguientes pantallas de nuestra app, podemos ver el costo por mensaje dentro de la misma chain es menor a 1 centavo de dolar y 6 centavos en una transaccion crosschain con polygon.

<img src="https://i.ibb.co/JtWSxpd/New-Project-1.png">

# Scroll:

Scroll tiene un beneficio muy grande para nuestra aplicacion de X-Chat, ya que al utilizarla pudimos obtener velocidades presumibles de 3 segundos entre mensaje y mensaje.

<img src="https://i.ibb.co/G2DPP8y/image.png">

- X-Chat Address:
  - Scroll Explorer Contract Address: [0x5589Ca69a02277af6019e6007D876095F1320F28](https://blockscout.scroll.io/address/0x5589Ca69a02277af6019e6007D876095F1320F28)
- Contract File: [FILE](./Contracts/Xchat-onchain.sol)

# Optimism:



# Mantle:



# Taiko:



# Current state and what's next:

TO DO...

# Team:

#### 3 Engineers with experience developing Blockchain, IoT, AI and hardware solutions. We have been working together now for 5 years since University.

[<img src="https://img.shields.io/badge/Luis%20Eduardo-Arevalo%20Oliver-blue">](https://www.linkedin.com/in/luis-eduardo-arevalo-oliver-989703122/)

[<img src="https://img.shields.io/badge/Victor%20Alonso-Altamirano%20Izquierdo-lightgrey">](https://www.linkedin.com/in/alejandro-s%C3%A1nchez-guti%C3%A9rrez-11105a157/)

[<img src="https://img.shields.io/badge/Alejandro-Sanchez%20Gutierrez-red">](https://www.linkedin.com/in/victor-alonso-altamirano-izquierdo-311437137/)
 
# References:

