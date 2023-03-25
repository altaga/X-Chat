export const abi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_message",
				"type": "string"
			}
		],
		"name": "addMessage",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_message",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			}
		],
		"name": "addMessageToken",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "garbage",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "target",
				"type": "address"
			},
			{
				"internalType": "uint32",
				"name": "destinationDomain",
				"type": "uint32"
			},
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_message",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "relayerFee",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_token",
				"type": "address"
			}
		],
		"name": "sendMessageX",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_connext",
				"type": "address"
			},
			{
				"internalType": "uint32",
				"name": "_domainIdLocal",
				"type": "uint32"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_transferId",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_asset",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_originSender",
				"type": "address"
			},
			{
				"internalType": "uint32",
				"name": "_origin",
				"type": "uint32"
			},
			{
				"internalType": "bytes",
				"name": "_callData",
				"type": "bytes"
			}
		],
		"name": "xReceive",
		"outputs": [
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint32",
				"name": "destinationDomain",
				"type": "uint32"
			},
			{
				"internalType": "uint256",
				"name": "slippage",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "relayerFee",
				"type": "uint256"
			}
		],
		"name": "xTransfer",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "destinationUnwrapper",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "weth",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint32",
				"name": "destinationDomain",
				"type": "uint32"
			},
			{
				"internalType": "uint256",
				"name": "slippage",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "relayerFee",
				"type": "uint256"
			}
		],
		"name": "xTransferEth",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "chatCounterIn",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "chatCounterOut",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "chatHistoryIn",
		"outputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint32",
				"name": "origin",
				"type": "uint32"
			},
			{
				"internalType": "string",
				"name": "mess",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "asset",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "blocktime",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "chatHistoryOut",
		"outputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint32",
				"name": "origin",
				"type": "uint32"
			},
			{
				"internalType": "string",
				"name": "mess",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "asset",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "blocktime",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "connext",
		"outputs": [
			{
				"internalType": "contract IConnext",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "counter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

export const contract = `
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import {IConnext} from "@connext/smart-contracts/contracts/core/connext/interfaces/IConnext.sol";
import {IXReceiver} from "@connext/smart-contracts/contracts/core/connext/interfaces/IXReceiver.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IWETH {
    function deposit() external payable;

    function approve(address guy, uint256 wad) external returns (bool);
}

contract Chat is IXReceiver {
    IConnext public immutable connext;
    uint256 public counter;
    uint32 domainIdLocal;
    address owner;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _; // Close Modifier
    }

    struct Message {
        address to;
        uint32 origin;
        string mess;
        uint256 value;
        address asset;
        uint256 blocktime;
    }

    mapping(address => Message[]) public chatHistoryIn;
    mapping(address => Message[]) public chatHistoryOut;
    mapping(address => uint256) public chatCounterIn;
    mapping(address => uint256) public chatCounterOut;

    constructor(address _connext, uint32 _domainIdLocal) {
        counter = 0;
        owner = msg.sender;
        connext = IConnext(_connext);
        domainIdLocal = _domainIdLocal;
    }

    // Same Chain (Polygon)

    function addMessage(address _to, string memory _message) public payable {
        counter += 1;
        chatCounterIn[_to] += 1;
        chatHistoryIn[_to].push(
            Message(
                msg.sender,
                domainIdLocal,
                _message,
                msg.value,
                0x0000000000000000000000000000000000000000,
                block.timestamp
            )
        );
        chatCounterOut[msg.sender] += 1;
        chatHistoryOut[msg.sender].push(
            Message(
                _to,
                domainIdLocal,
                _message,
                msg.value,
                0x0000000000000000000000000000000000000000,
                block.timestamp
            )
        );
        payable(_to).transfer(msg.value);
    }

    function addMessageToken(
        address _to,
        string memory _message,
        uint256 amount,
        address token
    ) public payable {
        IERC20 _token = IERC20(token);
        _token.transferFrom(msg.sender, _to, amount);
        counter += 1;
        chatCounterIn[_to] += 1;
        chatHistoryIn[_to].push(
            Message(
                msg.sender,
                domainIdLocal,
                _message,
                amount,
                token,
                block.timestamp
            )
        );
        chatCounterOut[msg.sender] += 1;
        chatHistoryOut[msg.sender].push(
            Message(
                _to,
                domainIdLocal,
                _message,
                amount,
                token,
                block.timestamp
            )
        );
    }

    // X Chain

    // Reciever
    function addMessageX(
        address _from,
        address _to,
        string memory _message,
        uint32 _origin,
        uint256 _amount,
        address _asset
    ) private {
        counter += 1;
        chatCounterIn[_to] += 1;
        chatHistoryIn[_to].push(
            Message(_from, _origin, _message, _amount, _asset, block.timestamp)
        );
        chatCounterOut[_from] += 1;
        chatHistoryOut[_from].push(
            Message(_to, _origin, _message, _amount, _asset, block.timestamp)
        );
    }

    // Send

    /**
     * @notice Transfers non-native assets from one chain to another.
     * @dev User should approve a spending allowance before calling this.
     * @param token Address of the token on this domain.
     * @param amount The amount to transfer.
     * @param recipient The destination address (e.g. a wallet).
     * @param destinationDomain The destination domain ID.
     * @param slippage The maximum amount of slippage the user will accept in BPS.
     * @param relayerFee The fee offered to relayers.
     */

    function xTransfer(
        address token,
        uint256 amount,
        address recipient,
        uint32 destinationDomain,
        uint256 slippage,
        uint256 relayerFee
    ) external payable {
        IERC20 _token = IERC20(token);

        require(
            _token.allowance(msg.sender, address(this)) >= amount,
            "User must approve amount"
        );

        // User sends funds to this contract
        _token.transferFrom(msg.sender, address(this), amount);

        // This contract approves transfer to Connext
        _token.approve(address(connext), amount);

        connext.xcall{value: relayerFee}(
            destinationDomain, // _destination: Domain ID of the destination chain
            recipient, // _to: address receiving the funds on the destination
            token, // _asset: address of the token contract
            msg.sender, // _delegate: address that can revert or forceLocal on destination
            amount, // _amount: amount of tokens to transfer
            slippage, // _slippage: the maximum amount of slippage the user will accept in BPS (e.g. 30 = 0.3%)
            bytes("") // _callData: empty bytes because we're only sending funds
        );
    }

    /**
     * @notice Transfers native assets from one chain to another.
     * @param destinationUnwrapper Address of the Unwrapper contract on destination.
     * @param weth Address of the WETH contract on this domain.
     * @param amount The amount to transfer.
     * @param recipient The destination address (e.g. a wallet).
     * @param destinationDomain The destination domain ID.
     * @param slippage The maximum amount of slippage the user will accept in BPS.
     * @param relayerFee The fee offered to relayers.
     */
    function xTransferEth(
        address destinationUnwrapper,
        address weth,
        uint256 amount,
        address recipient,
        uint32 destinationDomain,
        uint256 slippage,
        uint256 relayerFee
    ) external payable {
        // Wrap ETH into WETH to send with the xcall
        IWETH(weth).deposit{value: amount}();

        // This contract approves transfer to Connext
        IWETH(weth).approve(address(connext), amount);

        // Encode the recipient address for calldata
        bytes memory callData = abi.encode(recipient);

        // xcall the Unwrapper contract to unwrap WETH into ETH on destination
        connext.xcall{value: relayerFee}(
            destinationDomain, // _destination: Domain ID of the destination chain
            destinationUnwrapper, // _to: Unwrapper contract
            weth, // _asset: address of the WETH contract
            msg.sender, // _delegate: address that can revert or forceLocal on destination
            amount, // _amount: amount of tokens to transfer
            slippage, // _slippage: the maximum amount of slippage the user will accept in BPS (e.g. 30 = 0.3%)
            callData // _callData: calldata with encoded recipient address
        );
    }

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

    // Callback XReciever

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

    // Transfer money in the contract.

    function garbage() public payable onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}

`