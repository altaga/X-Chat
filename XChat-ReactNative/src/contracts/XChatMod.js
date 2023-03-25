export const abi = [
	{
		"inputs": [
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
	},
	{
		"inputs": [],
		"name": "garbage",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	}
]

export const contract = `
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IWETH {
    function deposit() external payable;

    function approve(address guy, uint256 wad) external returns (bool);
}

contract Chat {
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

    constructor(uint32 _domainIdLocal) {
        counter = 0;
        owner = msg.sender;
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

    // Transfer money in the contract.

    function garbage() public payable onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}
`