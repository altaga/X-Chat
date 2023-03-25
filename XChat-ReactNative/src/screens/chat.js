import { Linking, Modal, Pressable, Text, View } from 'react-native'
import React, { Component, createRef } from 'react'
import ContextModule from '../utils/contextModule';
import GlobalStyles, { colorBase } from '../styles/styles';
import { SafeAreaView } from 'react-native';
import { Dimensions } from 'react-native';
import reactAutobind from 'react-autobind';
import { ScrollView } from 'react-native';
import { chains, chainsById } from '../utils/chains';
import { Image } from 'react-native';
import { abi as abiXChat } from '../contracts/XChat';
import { abi as abiIERC20 } from '../contracts/IERC20';
import { abi as abiXChatMod } from '../contracts/XChatMod';
import { ethers } from 'ethers';
import Header from '../headers/headerChat';
import LinearGradient from 'react-native-linear-gradient'
import EncryptedStorage from 'react-native-encrypted-storage';
import IconFont from "react-native-vector-icons/Fontisto";
import IconIon from "react-native-vector-icons/Ionicons"
import IconMCI from "react-native-vector-icons/MaterialCommunityIcons"
import IconMI from "react-native-vector-icons/MaterialIcons"
import IconFA5 from "react-native-vector-icons/FontAwesome5"
import { TextInput, Keyboard } from 'react-native';
import usdc from "../assets/usdc-token.png"
import background from "../assets/background.png"
import { ImageBackground } from 'react-native';
import DocumentPicker from "react-native-document-picker"
import axios from 'axios';
import CID from 'cids';
import Video from 'react-native-video';
import RNFS from "react-native-fs";
import FileViewer from "react-native-file-viewer";
import { Platform } from 'react-native';
import { REACT_APP_CHAINSAFE, REACT_APP_NGROK } from '../../env';

const isObjectEmpty = (objectName) => {
    return JSON.stringify(objectName) === "{}";
};

const isArrayEmpty = (objectName) => {
    return JSON.stringify(objectName) === "[]";
};

function espilonRound(num, zeros = 10000) {
    return Math.round((parseFloat(num) + Number.EPSILON) * zeros) / zeros;
}

function deleteFileFromMessage(string) {
    if (string.indexOf(":type:") === -1) return string;
    let file = string.split(":file:")[1].split(":typef:")[0]
    return string.replace(file, "").replace(":file:", "").replace(":typef:", "")
}

function detectFileType(string) {
    if (string.indexOf(":type:") === -1) return "";
    let fileType = string.split(":type:")[1].split(":typef:")[0].split("/")[1]
    if (fileType === "pdf") {
        return "pdf"
    } else if (fileType === "txt") {
        return "txt"
    } else if (fileType === "mp4" || fileType === "avi" || fileType === "mov" || fileType === "mkv" || fileType === "wmv" || fileType === "mpg" || fileType === "3gp" || fileType === "m4v" || fileType === "flv" || fileType === "f4v" || fileType === "m4p" || fileType === "m4v" || fileType === "m4a" || fileType === "m4b" || fileType === "m4r" || fileType === "m4s") {
        return "video"
    } else if (fileType === "mp3" || fileType === "mpeg" || fileType === "wav" || fileType === "ogg" || fileType === "aac" || fileType === "wma" || fileType === "m4a" || fileType === "m4b" || fileType === "m4r" || fileType === "m4s") {
        return "audio"
    } else if (fileType === "png" || fileType === "jpg" || fileType === "jpeg" || fileType === "gif" || fileType === "bmp" || fileType === "webp") {
        return "image"
    }
    else {
        return "other"
    }
}

function detectFileExt(string) {
    if (string.indexOf(":type:") === -1) return "";
    let fileType = string.split(":type:")[1].split(":typef:")[0].split("/")[1]
    return fileType
}

function detectUrl(string) {
    if (string.indexOf(":file:") === -1) {
        return "";
    }
    else {
        let url = string.split(":file:")[1].split(":filef:")[0]
        return (url + IPFSgateway)
    }
}

const IPFSgateways = [
    ".ipfs.gateway.valist.io",
    ".ipfs.dweb.link"
]
const IPFSgateway = IPFSgateways[1]

function detectAsset(asset) {
    if (
        asset === "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" ||
        asset === "0x7F5c764cBc14f9669B88837ca1490cCa17c31607" ||
        asset === "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174" ||
        asset === "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8" ||
        asset === "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d" ||
        asset === "0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83"
    ) {
        return usdc
    }
    else {
        return ""
    }
}

const bigMessage = [...Array(50).keys()].toString()

function createJSON() {
    let json = {}
    let array = [...Array(50).keys()]
    array.forEach((item) => {
        json[item] = "none"
    })
    return json
}

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            padding: 0,
            modal: false,
            modalTo: false,
            message: "", // ""
            amount: "",
            usd: {
                6648936: 0,
                1869640809: 0,
                1886350457: 0,
                1634886255: 0,
                6450786: 0,
                6778479: 0,
                0: 0,
                1: 0,
                2: 0
            },
            gasFee: 0,
            gasTrans: 0,
            loading: true,
            menuOpen: false, // false,
            file: "",
            display: "flex",
        };
        reactAutobind(this)
        this.scroll = createRef();
        this.keyboardDidShowListener = null;
        this.keyboardDidHideListener = null;
        this.checkInterval = null
        this.gasX = null
        this.gas = null
        this.file = null
        this.counter = 0
    }

    static contextType = ContextModule;

    async storeMessages(value) {
        try {
            await EncryptedStorage.setItem(
                "messages",
                JSON.stringify({
                    value: value
                })
            );
        } catch (error) {
            // There was an error on the native side
        }
    }

    async storeMessagesSummary(value) {
        try {
            await EncryptedStorage.setItem(
                "messagesSummary",
                JSON.stringify({
                    value: value
                })
            );
        } catch (error) {
            // There was an error on the native side
        }
    }

    async storeCounter(value) {
        try {
            await EncryptedStorage.setItem(
                "counter",
                JSON.stringify({
                    value: value
                })
            );
        } catch (error) {
            // There was an error on the native side
        }
    }

    async getCounter(address, addressContract, abi, rpc) {
        const provider = new ethers.providers.JsonRpcProvider(rpc);
        const contract = new ethers.Contract(addressContract, abi, provider);
        return new Promise(async (resolve, reject) => {
            try {
                let [input, output] = await Promise.all([
                    contract.chatCounterIn(address),
                    contract.chatCounterOut(address)
                ])
                resolve([parseInt(input.toString()), parseInt(output.toString())])
            }
            catch {
                resolve([0, 0])
            }
        })
    }

    async getMessagesEVM(address, addressContract, abi, rpc, input, output) {
        return new Promise(async (resolve, reject) => {
            const provider = new ethers.providers.JsonRpcProvider(rpc);
            const contract = new ethers.Contract(addressContract, abi, provider);
            let [inputMessages, outputMessages] = await Promise.all(
                [
                    Promise.all(
                        Array(input).fill(0).map((item, index) => contract.chatHistoryIn(address, index))
                    ),
                    Promise.all(
                        Array(output).fill(0).map((item, index) => contract.chatHistoryOut(address, index))
                    )
                ]
            )
            resolve([inputMessages, outputMessages])
        })
    }

    async getMessages() {
        console.log("Check New Messages")
        let [
            [inputETH, outputETH],
            [inputOP, outputOP],
            [inputMATIC, outputMATIC],
            [inputARB, outputARB],
            [inputBSC, outputBSC],
            [inputGNOSIS, outputGNOSIS],
            [inputSCROLL, outputSCROLL],
            [inputTAIKO, outputTAIKO],
            [inputMANTLE, outputMANTLE]
        ] = await Promise.all([
            this.getCounter(this.context.value.address, chains.ethereum.xchat, abiXChat, chains.ethereum.rpc),
            this.getCounter(this.context.value.address, chains.optimism.xchat, abiXChat, chains.optimism.rpc),
            this.getCounter(this.context.value.address, chains.polygon.xchat, abiXChat, chains.polygon.rpc),
            this.getCounter(this.context.value.address, chains.arbitrum.xchat, abiXChat, chains.arbitrum.rpc),
            this.getCounter(this.context.value.address, chains.bsc.xchat, abiXChat, chains.bsc.rpc),
            this.getCounter(this.context.value.address, chains.gnosis.xchat, abiXChat, chains.gnosis.rpc),
            this.getCounter(this.context.value.address, chains.scroll.xchat, abiXChatMod, chains.scroll.rpc),
            this.getCounter(this.context.value.address, chains.taiko.xchat, abiXChatMod, chains.taiko.rpc),
            this.getCounter(this.context.value.address, chains.mantle.xchat, abiXChatMod, chains.mantle.rpc)
        ])
        let inputMessages = []
        let outputMessages = []
        let counter = {
            6648936: 0,
            1869640809: 0,
            1886350457: 0,
            1634886255: 0,
            6450786: 0,
            6778479: 0,
            0: 0,
            1: 0,
            2: 0,
        }
        let updateFlag = false
        let updateFlag2 = false
        if (inputETH + outputETH > this.context.value.counter[chains.ethereum.domainid]) {
            updateFlag2 = true
        }
        if (inputOP + outputOP > this.context.value.counter[chains.optimism.domainid]) {
            updateFlag2 = true
        }
        if (inputMATIC + outputMATIC > this.context.value.counter[chains.polygon.domainid]) {
            updateFlag2 = true
        }
        if (inputARB + outputARB > this.context.value.counter[chains.arbitrum.domainid]) {
            updateFlag2 = true
        }
        if (inputBSC + outputBSC > this.context.value.counter[chains.bsc.domainid]) {
            updateFlag2 = true
        }
        if (inputGNOSIS + outputGNOSIS > this.context.value.counter[chains.gnosis.domainid]) {
            updateFlag2 = true
        }
        if (inputSCROLL + outputSCROLL > this.context.value.counter[chains.scroll.domainid]) {
            updateFlag2 = true
        }
        if (inputTAIKO + outputTAIKO > this.context.value.counter[chains.taiko.domainid]) {
            updateFlag2 = true
        }
        if (inputMANTLE + outputMANTLE > this.context.value.counter[chains.mantle.domainid]) {
            updateFlag2 = true
        }
        if (updateFlag2) {
            if (inputETH + outputETH > 0) {
                console.log("Get New Messages ETH") // Pending
                updateFlag = true
                let [inputMessagesETH, outputMessagesETH] = await this.getMessagesEVM(this.context.value.address, chains.ethereum.xchat, abiXChat, chains.ethereum.rpc, inputETH, outputETH)
                inputMessagesETH = inputMessagesETH.map((item) => [...item, chains.ethereum.domainid])
                outputMessagesETH = outputMessagesETH.map((item) => [...item, chains.ethereum.domainid])
                inputMessages = inputMessages.concat(inputMessagesETH)
                outputMessages = outputMessages.concat(outputMessagesETH)
            }
            if (inputOP + outputOP > 0) {
                console.log("Get New Messages OP") // Pending
                updateFlag = true
                let [inputMessagesOP, outputMessagesOP] = await this.getMessagesEVM(this.context.value.address, chains.optimism.xchat, abiXChat, chains.optimism.rpc, inputOP, outputOP)
                inputMessagesOP = inputMessagesOP.map((item) => [...item, chains.optimism.domainid])
                outputMessagesOP = outputMessagesOP.map((item) => [...item, chains.optimism.domainid])
                inputMessages = inputMessages.concat(inputMessagesOP)
                outputMessages = outputMessages.concat(outputMessagesOP)
            }
            if (inputMATIC + outputMATIC > 0) {
                console.log("Get New Messages MATIC")
                updateFlag = true
                let [inputMessagesMATIC, outputMessagesMATIC] = await this.getMessagesEVM(this.context.value.address, chains.polygon.xchat, abiXChat, chains.polygon.rpc, inputMATIC, outputMATIC)
                inputMessagesMATIC = inputMessagesMATIC.map((item) => [...item, chains.polygon.domainid])
                outputMessagesMATIC = outputMessagesMATIC.map((item) => [...item, chains.polygon.domainid])
                inputMessages = inputMessages.concat(inputMessagesMATIC)
                outputMessages = outputMessages.concat(outputMessagesMATIC)
            }
            if (inputARB + outputARB > 0) {
                console.log("Get New Messages ARB") // Pending
                updateFlag = true
                let [inputMessagesARB, outputMessagesARB] = await this.getMessagesEVM(this.context.value.address, chains.arbitrum.xchat, abiXChat, chains.arbitrum.rpc, inputARB, outputARB)
                inputMessagesARB = inputMessagesARB.map((item) => [...item, chains.arbitrum.domainid])
                outputMessagesARB = outputMessagesARB.map((item) => [...item, chains.arbitrum.domainid])
                inputMessages = inputMessages.concat(inputMessagesARB)
                outputMessages = outputMessages.concat(outputMessagesARB)
            }
            if (inputBSC + outputBSC > 0) {
                console.log("Get New Messages BSC") // Pending
                updateFlag = true
                let [inputMessagesBSC, outputMessagesBSC] = await this.getMessagesEVM(this.context.value.address, chains.bsc.xchat, abiXChat, chains.bsc.rpc, inputBSC, outputBSC)
                inputMessagesBSC = inputMessagesBSC.map((item) => [...item, chains.bsc.domainid])
                outputMessagesBSC = outputMessagesBSC.map((item) => [...item, chains.bsc.domainid])
                inputMessages = inputMessages.concat(inputMessagesBSC)
                outputMessages = outputMessages.concat(outputMessagesBSC)
            }
            if (inputGNOSIS + outputGNOSIS > 0) {
                console.log("Get New Messages GNOSIS")
                updateFlag = true
                let [inputMessagesGNOSIS, outputMessagesGNOSIS] = await this.getMessagesEVM(this.context.value.address, chains.gnosis.xchat, abiXChat, chains.gnosis.rpc, inputGNOSIS, outputGNOSIS)
                inputMessagesGNOSIS = inputMessagesGNOSIS.map((item) => [...item, chains.gnosis.domainid])
                outputMessagesGNOSIS = outputMessagesGNOSIS.map((item) => [...item, chains.gnosis.domainid])
                inputMessages = inputMessages.concat(inputMessagesGNOSIS)
                outputMessages = outputMessages.concat(outputMessagesGNOSIS)
            }
            if (inputSCROLL + outputSCROLL > 0) {
                console.log("Get New Messages SCROLL")
                updateFlag = true
                let [inputMessagesSCROLL, outputMessagesSCROLL] = await this.getMessagesEVM(this.context.value.address, chains.scroll.xchat, abiXChatMod, chains.scroll.rpc, inputSCROLL, outputSCROLL)
                inputMessagesSCROLL = inputMessagesSCROLL.map((item) => [...item, chains.scroll.domainid])
                outputMessagesSCROLL = outputMessagesSCROLL.map((item) => [...item, chains.scroll.domainid])
                inputMessages = inputMessages.concat(inputMessagesSCROLL)
                outputMessages = outputMessages.concat(outputMessagesSCROLL)
            }
            if (inputTAIKO + outputTAIKO > 0) {
                console.log("Get New Messages TAIKO")
                updateFlag = true
                let [inputMessagesTAIKO, outputMessagesTAIKO] = await this.getMessagesEVM(this.context.value.address, chains.taiko.xchat, abiXChatMod, chains.taiko.rpc, inputTAIKO, outputTAIKO)
                inputMessagesTAIKO = inputMessagesTAIKO.map((item) => [...item, chains.taiko.domainid])
                outputMessagesTAIKO = outputMessagesTAIKO.map((item) => [...item, chains.taiko.domainid])
                inputMessages = inputMessages.concat(inputMessagesTAIKO)
                outputMessages = outputMessages.concat(outputMessagesTAIKO)
            }
            if (inputMANTLE + outputMANTLE > 0) {
                console.log("Get New Messages MANTLE")
                updateFlag = true
                let [inputMessagesMANTLE, outputMessagesMANTLE] = await this.getMessagesEVM(this.context.value.address, chains.mantle.xchat, abiXChatMod, chains.mantle.rpc, inputMANTLE, outputMANTLE)
                inputMessagesMANTLE = inputMessagesMANTLE.map((item) => [...item, chains.mantle.domainid])
                outputMessagesMANTLE = outputMessagesMANTLE.map((item) => [...item, chains.mantle.domainid])
                inputMessages = inputMessages.concat(inputMessagesMANTLE)
                outputMessages = outputMessages.concat(outputMessagesMANTLE)
            }
        }
        if (updateFlag) {
            // Update Counters
            counter[chains.ethereum.domainid] = inputETH + outputETH
            counter[chains.optimism.domainid] = inputOP + outputOP
            counter[chains.polygon.domainid] = inputMATIC + outputMATIC
            counter[chains.arbitrum.domainid] = inputARB + outputARB
            counter[chains.bsc.domainid] = inputBSC + outputBSC
            counter[chains.gnosis.domainid] = inputGNOSIS + outputGNOSIS
            counter[chains.scroll.domainid] = inputSCROLL + outputSCROLL
            counter[chains.taiko.domainid] = inputTAIKO + outputTAIKO
            counter[chains.mantle.domainid] = inputMANTLE + outputMANTLE
            // Get all Messages
            let messages = {}
            let messagesSummary = []
            inputMessages.forEach((item) => {
                messages[item[0]] = []
            })
            outputMessages.forEach((item) => {
                messages[item[0]] = []
            })
            inputMessages.forEach((item) => {
                messages[item[0]].push({
                    name: item[0],
                    from: item[0],
                    to: this.context.value.address,
                    chainIn: item[1],
                    chainOut: item[6],
                    message: item[2],
                    asset: item[4],
                    value: parseInt(item[3].toString()),
                    blocktime: parseInt(item[5].toString())
                })
            })
            outputMessages.forEach((item) => {
                messages[item[0]].push({
                    name: item[0],
                    to: item[0],
                    from: this.context.value.address,
                    chainIn: item[1],
                    chainOut: item[6],
                    message: item[2],
                    asset: item[4],
                    value: parseInt(item[3].toString()),
                    blocktime: parseInt(item[5].toString())
                })
            })
            Object.keys(messages).forEach((item) => {
                messages[item] = messages[item].sort((a, b) => a.blocktime - b.blocktime)
            })
            Object.keys(messages).forEach((item) => {
                messagesSummary.push(messages[item][messages[item].length - 1])
            })
            messagesSummary = messagesSummary.sort((a, b) => b.blocktime - a.blocktime)
            this.context.setValue({
                messages,
                messagesSummary,
                counter
            })
            this.storeMessages(messages)
            this.storeMessagesSummary(messagesSummary)
            this.storeCounter(counter)
            this.scroll.current.scrollToEnd({ animated: true })
        }
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', async () => {
            try {
                const session = await EncryptedStorage.getItem("messages");
                if (session !== null) {
                    this.context.setValue({
                        messages: JSON.parse(session).value
                    })
                }
                else {
                    console.log("No messages")
                }
            } catch (error) {
                console.log("Error messages Memory")
            }
            try {
                const session = await EncryptedStorage.getItem("messagesSummary");
                if (session !== null) {
                    this.context.setValue({
                        messagesSummary: JSON.parse(session).value
                    })
                }
                else {
                    console.log("No messagesSummary")
                }
            } catch (error) {
                console.log("Error messagesSummary Memory")
            }
            try {
                const session = await EncryptedStorage.getItem("counter");
                if (session !== null) {
                    this.context.setValue({
                        counter: JSON.parse(session).value
                    },
                        () => {
                            this.getMessages()
                            this.checkInterval = setInterval(async () => {
                                if (!this.state.loading) {
                                    await this.updateFees()
                                    await this.getMessages()
                                }
                            }, 60000)
                        }
                    )
                }
                else {
                    console.log("No Counter")
                }
            } catch (error) {
                console.log("Error Counter Memory")
            }
            this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
            this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
            setTimeout(() => this.scroll && this.scroll.current.scrollToEnd({ animated: true }), 200)
            this.updateFees()
        })
        this.props.navigation.addListener('blur', () => {
            console.log("Blur")
            this.keyboardDidShowListener && this.keyboardDidShowListener.remove();;
            this.keyboardDidHideListener && this.keyboardDidHideListener.remove();
            this.checkInterval && clearInterval(this.checkInterval)
        })
    }

    async updateFees() {
        this.updateUSD()
        let [gasFee, gasTrans] = await Promise.all([
            this.getGasFee(this.context.value.defaultChain, this.context.value.defaultChainTo),
            this.estimateGasTransaction(chainsById[this.context.value.defaultChain].xchat, chainsById[this.context.value.defaultChain].rpc, chainsById[this.context.value.defaultChainTo].xchat, this.context.value.defaultChainTo)
        ])
        this.setState({
            gasFee,
            gasTrans,
            loading: false
        })
    }

    componentWillUnmount() {
        console.log("Unmount")
        this.keyboardDidShowListener && this.keyboardDidShowListener.remove();;
        this.keyboardDidHideListener && this.keyboardDidHideListener.remove();
        this.checkInterval && clearInterval(this.checkInterval)
    }

    _keyboardDidShow(e) {
        this.setState({
            padding: e.endCoordinates.height
        },
            () => this.scroll.current.scrollToEnd({ animated: true })
        )
    }

    _keyboardDidHide(e) {
        this.setState({
            padding: 0
        },
            () => this.scroll.current.scrollToEnd({ animated: true })
        )
    }

    async estimateGasTransaction(addressContractFrom, rpc, addressContractTo, domainid) {
        if (this.context.value.defaultChain !== this.context.value.defaultChainTo) {
            const provider = new ethers.providers.JsonRpcProvider(rpc);
            const xchat = new ethers.Contract(addressContractFrom, abiXChat, provider);
            const feeData = await provider.getFeeData()
            this.gasX = this.gasX ?? await xchat.estimateGas.sendMessageX(addressContractTo, domainid, this.context.value.addressSelected, bigMessage, this.state.gasFee, 0, "0x0000000000000000000000000000000000000000", { value: this.state.gasFee, gasPrice: feeData.gasPrice })
            const gasPrice = await provider.getGasPrice()
            return (this.gasX * gasPrice)
        }
        else if (this.context.value.defaultChain === this.context.value.defaultChainTo && this.context.value.defaultChain < 10) {
            const provider = new ethers.providers.JsonRpcProvider(rpc);
            const xchat = new ethers.Contract(addressContractFrom, abiXChatMod, provider);
            const feeData = await provider.getFeeData()
            this.gas = this.gas ?? await xchat.estimateGas.addMessage(this.context.value.addressSelected, bigMessage, { gasPrice: feeData.gasPrice })
            const gasPrice = await provider.getGasPrice()
            return (this.gas * gasPrice)
        }
        else {
            const provider = new ethers.providers.JsonRpcProvider(rpc);
            const xchat = new ethers.Contract(addressContractFrom, abiXChat, provider);
            const feeData = await provider.getFeeData()
            this.gas = this.gas ?? await xchat.estimateGas.addMessage(this.context.value.addressSelected, bigMessage, { gasPrice: feeData.gasPrice })
            const gasPrice = await provider.getGasPrice()
            return (this.gas * gasPrice)
        }
    }

    async sendXmessage(addressContractFrom, rpc, addressContractTo, domainid) {
        const provider = new ethers.providers.JsonRpcProvider(rpc);
        if (this.context.value.defaultChain === this.context.value.defaultChainTo) {
            try {
                const session = await EncryptedStorage.getItem("userPrivs");
                if (session !== null) {
                    try {
                        console.log("start")
                        const wallet = new ethers.Wallet(JSON.parse(session).value.privateKey, provider);
                        const xchat = new ethers.Contract(addressContractFrom, abiXChat, wallet);
                        const feeData = await provider.getFeeData()
                        let unsignedTrx = await xchat.populateTransaction.addMessage(this.context.value.addressSelected, this.state.message + this.state.file, { gasPrice: feeData.gasPrice })
                        console.log('Transaction created');
                        const txResponse = await wallet.sendTransaction(unsignedTrx);
                        console.log(`Transaction sent: ${txResponse.hash}`);
                        await txResponse.wait(1);
                        console.log(
                            `Proposal has been mined at blocknumber: ${txResponse.blockNumber}, transaction hash: ${txResponse.hash}`
                        );
                        await this.updateFees()
                        await this.getMessages()
                    }
                    catch (e) {
                        console.log(e)
                    }
                }
                else {
                    // Error signing
                }
            } catch (error) {
                // Error Signing
            }
        }
        else if (this.context.value.defaultChain === this.context.value.defaultChainTo && this.context.value.defaultChain < 10) {
            try {
                const session = await EncryptedStorage.getItem("userPrivs");
                if (session !== null) {
                    try {
                        console.log("start")
                        const wallet = new ethers.Wallet(JSON.parse(session).value.privateKey, provider);
                        const xchat = new ethers.Contract(addressContractFrom, abiXChatMod, wallet);
                        const feeData = await provider.getFeeData()
                        let unsignedTrx = await xchat.populateTransaction.addMessage(this.context.value.addressSelected, this.state.message + this.state.file, { gasPrice: feeData.gasPrice })
                        console.log('Transaction created');
                        const txResponse = await wallet.sendTransaction(unsignedTrx);
                        console.log(`Transaction sent: ${txResponse.hash}`);
                        await txResponse.wait(1);
                        console.log(
                            `Proposal has been mined at blocknumber: ${txResponse.blockNumber}, transaction hash: ${txResponse.hash}`
                        );
                        await this.updateFees()
                        await this.getMessages()
                    }
                    catch (e) {
                        console.log(e)
                    }
                }
                else {
                    // Error signing
                }
            } catch (error) {
                // Error Signing
            }
        }
        else {
            try {
                const session = await EncryptedStorage.getItem("userPrivs");
                if (session !== null) {
                    try {
                        console.log("start")
                        const wallet = new ethers.Wallet(JSON.parse(session).value.privateKey, provider);
                        const xchat = new ethers.Contract(addressContractFrom, abiXChat, wallet);
                        const feeData = await provider.getFeeData()
                        let unsignedTrx = await xchat.populateTransaction.sendMessageX(
                            addressContractTo, // Target
                            domainid,          // Domain id
                            this.context.value.addressSelected, // To
                            this.state.message + this.state.file, // Message
                            this.state.gasFee,  // fee
                            0,  // amount
                            "0x0000000000000000000000000000000000000000", // Token
                            { value: this.state.gasFee, gasPrice: feeData.gasPrice })
                        console.log('Transaction created');
                        const txResponse = await wallet.sendTransaction(unsignedTrx);
                        console.log(`Transaction sent: ${txResponse.hash}`);
                        await txResponse.wait(1);
                        console.log(
                            `Proposal has been mined at blocknumber: ${txResponse.blockNumber}, transaction hash: ${txResponse.hash}`
                        );
                    }
                    catch (e) {
                        console.log(e)
                    }
                }
                else {
                    // Error signing
                }
            } catch (error) {
                // Error Signing
            }
        }
    }

    async sendXmessageToken(addressContractFrom, rpc, addressContractTo, domainid, addressToken) {
        const provider = new ethers.providers.JsonRpcProvider(rpc);
        if (this.context.value.defaultChain === this.context.value.defaultChainTo) {
            try {
                const session = await EncryptedStorage.getItem("userPrivs");
                if (session !== null) {
                    try {
                        console.log("start")
                        const wallet = new ethers.Wallet(JSON.parse(session).value.privateKey, provider);
                        const xchat = new ethers.Contract(addressContractFrom, abiXChat, wallet);
                        const ierc20 = new ethers.Contract(addressToken, abiIERC20, wallet);
                        let feeData = await provider.getFeeData()
                        let unsignedTrx = await ierc20.populateTransaction.approve(
                            addressContractFrom,
                            parseFloat(this.state.amount) * Math.pow(10, 6),
                            { gasPrice: feeData.gasPrice }
                        )
                        console.log('Transaction created');
                        let txResponse = await wallet.sendTransaction(unsignedTrx);
                        console.log(`Transaction sent: ${txResponse.hash}`);
                        await txResponse.wait(1);
                        console.log(
                            `Proposal has been mined at blocknumber: ${txResponse.blockNumber}, transaction hash: ${txResponse.hash}`
                        );
                        feeData = await provider.getFeeData()
                        unsignedTrx = await xchat.populateTransaction.addMessageToken(
                            this.context.value.addressSelected,
                            this.state.message + this.state.file,
                            parseFloat(this.state.amount) * Math.pow(10, 6),
                            addressToken,
                            { gasPrice: feeData.gasPrice })
                        console.log('Transaction created');
                        txResponse = await wallet.sendTransaction(unsignedTrx);
                        console.log(`Transaction sent: ${txResponse.hash}`);
                        await txResponse.wait(1);
                        console.log(
                            `Proposal has been mined at blocknumber: ${txResponse.blockNumber}, transaction hash: ${txResponse.hash}`
                        );
                        await this.updateFees()
                        await this.getMessages()
                    }
                    catch (e) {
                        console.log(e)
                    }
                }
                else {
                    // Error signing
                }
            } catch (error) {
                // Error Signing
            }
        }
        else {
            try {
                const session = await EncryptedStorage.getItem("userPrivs");
                if (session !== null) {
                    try {
                        console.log("start")
                        const wallet = new ethers.Wallet(JSON.parse(session).value.privateKey, provider);
                        const xchat = new ethers.Contract(addressContractFrom, abiXChat, wallet);
                        const ierc20 = new ethers.Contract(addressToken, abiIERC20, wallet);
                        let feeData = await provider.getFeeData()
                        let unsignedTrx = await ierc20.populateTransaction.approve(
                            addressContractFrom,
                            parseFloat(this.state.amount) * Math.pow(10, 6),
                            { gasPrice: feeData.gasPrice }
                        )
                        console.log('Transaction created');
                        let txResponse = await wallet.sendTransaction(unsignedTrx);
                        console.log(`Transaction sent: ${txResponse.hash}`);
                        await txResponse.wait(1);
                        console.log(
                            `Proposal has been mined at blocknumber: ${txResponse.blockNumber}, transaction hash: ${txResponse.hash}`
                        );
                        feeData = await provider.getFeeData()
                        unsignedTrx = await xchat.populateTransaction.xTransfer(
                            addressToken,                               // Token address
                            parseFloat(this.state.amount) * Math.pow(10, 6),        // Amount
                            this.context.value.addressSelected,         // To
                            domainid,                                   // Domain Id
                            300,                                        // Slippage
                            this.state.gasFee,                          // Relay fee
                            { value: this.state.gasFee, gasPrice: feeData.gasPrice })
                        console.log('Transaction created');
                        txResponse = await wallet.sendTransaction(unsignedTrx);
                        console.log(`Transaction sent: ${txResponse.hash}`);
                        await txResponse.wait(1);
                        console.log(
                            `Proposal has been mined at blocknumber: ${txResponse.blockNumber}, transaction hash: ${txResponse.hash}`
                        );
                        feeData = await provider.getFeeData()
                        unsignedTrx = await xchat.populateTransaction.sendMessageX(
                            addressContractTo, // Target
                            domainid,          // Domain id
                            this.context.value.addressSelected, // To
                            this.state.message + this.state.file, // Message
                            this.state.gasFee,  // fee
                            parseFloat(this.state.amount) * Math.pow(10, 6),  // amount
                            addressToken, // Token
                            { value: this.state.gasFee, gasPrice: feeData.gasPrice })
                        console.log('Transaction created');
                        txResponse = await wallet.sendTransaction(unsignedTrx);
                        console.log(`Transaction sent: ${txResponse.hash}`);
                        await txResponse.wait(1);
                        console.log(
                            `Proposal has been mined at blocknumber: ${txResponse.blockNumber}, transaction hash: ${txResponse.hash}`
                        );
                    }
                    catch (e) {
                        console.log(e)
                    }
                }
                else {
                    // Error signing
                }
            } catch (error) {
                // Error Signing
            }
        }
    }

    async getGasFee(chainIn, chainOut) {
        return new Promise((resolve) => {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({
                "chainIn": chainIn,
                "chainOut": chainOut
            });
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            //fetch("https://2kh8l1bxq3.execute-api.us-east-1.amazonaws.com/get-gas-fee", requestOptions)
            fetch(`${REACT_APP_NGROK}get-gas-fee`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result.fees)
                    resolve(result.fees)
                })
                .catch(error => {
                    console.log("Error")
                    resolve(0)
                });
        })
    }

    async getTokenUSD(array) {
        return new Promise((resolve) => {
            var myHeaders = new Headers();
            myHeaders.append("accept", "application/json");
            myHeaders.append("Cookie", "__cf_bm=tpbLrsBftSraHYqrEJhFLgb_r21OxLKE4CVicrvEM9k-1677573652-0-AZhAq8gZwWZR44X5i1EO3NKrn9dCq48ASQBRZ5RVzaJLBZx8rpJmfGeEcoqVjy8IugAp/mNgw9aW4gNXhq/Qp9g=");
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
            fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${array.toString()}&vs_currencies=usd`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    resolve(result)
                })
                .catch(error => console.log('error', error));
        })
    }

    async updateUSD() {
        let res = await this.getTokenUSD(
            [
                chains.ethereum.gecko,
                chains.optimism.gecko,
                chains.polygon.gecko,
                chains.arbitrum.gecko,
                chains.bsc.gecko,
                chains.gnosis.gecko,
                chains.scroll.gecko,
                chains.taiko.gecko,
                chains.mantle.gecko,
            ]
        )
        let ethereumUSD = res[chains.ethereum.gecko]?.usd ?? 0
        let optimismUSD = res[chains.optimism.gecko]?.usd ?? 0
        let polygonUSD = res[chains.polygon.gecko]?.usd ?? 0
        let arbitrumOneUSD = res[chains.arbitrum.gecko]?.usd ?? 0
        let binanceSmartChainUSD = res[chains.bsc.gecko]?.usd ?? 0
        let gnosisUSD = res[chains.gnosis.gecko]?.usd ?? 0
        let scrollUSD = res[chains.scroll.gecko]?.usd ?? 0
        let taikoUSD = res[chains.taiko.gecko]?.usd ?? 0
        let mantleUSD = res[chains.mantle.gecko]?.usd ?? 0

        this.context.setValue({
            ethereumUSD,
            optimismUSD,
            polygonUSD,
            arbitrumOneUSD,
            binanceSmartChainUSD,
            gnosisUSD,
            scrollUSD,
            taikoUSD,
            mantleUSD
        })
        this.setState({
            usd: {
                6648936: ethereumUSD,
                1869640809: optimismUSD,
                1886350457: polygonUSD,
                1634886255: arbitrumOneUSD,
                6450786: binanceSmartChainUSD,
                6778479: gnosisUSD,
                0: scrollUSD,
                1: taikoUSD,
                2: mantleUSD
            }
        })
        return 1
    }

    async storeDefaultChain(value) {
        try {
            await EncryptedStorage.setItem(
                "chain",
                JSON.stringify({
                    value: value
                })
            );
        } catch (error) {
            // There was an error on the native side
        }
    }

    async storeDefaultToChain(value) {
        try {
            await EncryptedStorage.setItem(
                "chainTo",
                JSON.stringify({
                    value: value
                })
            );
        } catch (error) {
            // There was an error on the native side
        }
    }

    async uploadFile(address) {
        return new Promise((resolve, reject) => {
            var myData = new FormData();
            myData.append('file', {
                name: this.file.name,
                type: this.file.type,
                uri: Platform.OS === 'ios' ?
                    this.file.uri.replace('file://', '')
                    : this.file.uri,
            });
            myData.append('path', `${address}`);
            var config = {
                method: 'post',
                url: 'https://3jsx8383rg.execute-api.us-east-1.amazonaws.com/upload',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    "Authorization": REACT_APP_CHAINSAFE
                },
                data: myData
            };
            axios(config)
                .then((res) => {
                    resolve(`https://${new CID(res.data.files_details[0].cid).toV1().toString('base32')}`)
                })
                .catch((error) => {
                    reject("Error")
                });
        })
    }

    render() {
        let fileDisplay = (link, type, ext, chainIn, chainOut) => {
            if (type === "image") return <Pressable
                onPress={() => {
                    console.log("Opening")
                    const localFile = `${RNFS.DocumentDirectoryPath}/temporaryfile.${ext}`;
                    const options = {
                        fromUrl: link,
                        toFile: localFile,
                    };
                    RNFS.downloadFile(options)
                        .promise.then(() => FileViewer.open(localFile))
                        .then(() => {
                            console.log("success")
                        })
                        .catch((error) => {
                            console.log("error")
                        });
                }}>
                <Image source={{ uri: link }} style={{ width: "100%", aspectRatio: 1.5, resizeMode: "center", margin: 10 }} />
            </Pressable>
            if (type === "video") {
                return <Pressable
                    onPress={() => {
                        console.log("Opening")
                        const localFile = `${RNFS.DocumentDirectoryPath}/temporaryfile.${ext}`;
                        const options = {
                            fromUrl: link,
                            toFile: localFile,
                        };
                        RNFS.downloadFile(options)
                            .promise.then(() => FileViewer.open(localFile))
                            .then(() => {
                                console.log("success")
                            })
                            .catch((error) => {
                                console.log("error")
                            });
                    }}>
                    <LinearGradient
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        colors={[chainsById[chainIn].color, chainsById[chainOut].color]}
                        style={{ borderRadius: 100, minWidth: Dimensions.get("window").width * 0.6, borderWidth: 1, borderColor: "black", margin: 10 }}
                    >
                        <Text style={{ fontSize: 16, textAlign: "left", color: "black", marginHorizontal: "5%", marginVertical: "3%" }}>
                            Open Video
                        </Text>
                    </LinearGradient>
                </Pressable>
            }
            if (type === "txt") return <Pressable
                onPress={() => {
                    console.log("Opening")
                    const localFile = `${RNFS.DocumentDirectoryPath}/temporaryfile.${ext}`;
                    const options = {
                        fromUrl: link,
                        toFile: localFile,
                    };
                    RNFS.downloadFile(options)
                        .promise.then(() => FileViewer.open(localFile))
                        .then(() => {
                            console.log("success")
                        })
                        .catch((error) => {
                            console.log("error")
                        });
                }}>
                <LinearGradient
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    colors={[chainsById[chainIn].color, chainsById[chainOut].color]}
                    style={{ borderRadius: 100, minWidth: Dimensions.get("window").width * 0.6, borderWidth: 1, borderColor: "black", margin: 10 }}
                >
                    <Text style={{ fontSize: 16, textAlign: "left", color: "black", marginHorizontal: "5%", marginVertical: "3%" }}>
                        Open TXT
                    </Text>
                </LinearGradient>
            </Pressable>
            if (type === "pdf") return <Pressable
                onPress={() => {
                    console.log("Opening")
                    const localFile = `${RNFS.DocumentDirectoryPath}/temporaryfile.${ext}`;
                    const options = {
                        fromUrl: link,
                        toFile: localFile,
                    };
                    RNFS.downloadFile(options)
                        .promise.then(() => FileViewer.open(localFile))
                        .then(() => {
                            console.log("success")
                        })
                        .catch((error) => {
                            console.log("error")
                        });
                }}>
                <LinearGradient
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    colors={[chainsById[chainIn].color, chainsById[chainOut].color]}
                    style={{ borderRadius: 100, minWidth: Dimensions.get("window").width * 0.6, borderWidth: 1, borderColor: "black", margin: 10 }}
                >
                    <Text style={{ fontSize: 16, textAlign: "left", color: "black", marginHorizontal: "5%", marginVertical: "3%" }}>
                        Open PDF
                    </Text>
                </LinearGradient>
            </Pressable>
            if (type === "audio") return <Pressable
                onPress={() => {
                    console.log("Opening")
                    const localFile = `${RNFS.DocumentDirectoryPath}/temporaryfile.${ext}`;
                    const options = {
                        fromUrl: link,
                        toFile: localFile,
                    };
                    RNFS.downloadFile(options)
                        .promise.then(() => FileViewer.open(localFile))
                        .then(() => {
                            console.log("success")
                        })
                        .catch((error) => {
                            console.log("error")
                        });
                }}>
                <LinearGradient
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    colors={[chainsById[chainIn].color, chainsById[chainOut].color]}
                    style={{ borderRadius: 100, width: 50 }}
                >
                    <Text style={{ fontSize: 16, textAlign: "left", color: "black", marginHorizontal: "5%", marginVertical: "3%" }}>
                        Open Audio
                    </Text>
                </LinearGradient>
            </Pressable>
            if (type === "other") return <Pressable
                onPress={() => {
                    console.log("Opening")
                    const localFile = `${RNFS.DocumentDirectoryPath}/temporaryfile.${ext}`;
                    const options = {
                        fromUrl: link,
                        toFile: localFile,
                    };
                    RNFS.downloadFile(options)
                        .promise.then(() => FileViewer.open(localFile))
                        .then(() => {
                            console.log("success")
                        })
                        .catch((error) => {
                            console.log("error")
                        });
                }}>
                <LinearGradient
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    colors={[chainsById[chainIn].color, chainsById[chainOut].color]}
                    style={{ borderRadius: 100, minWidth: Dimensions.get("window").width * 0.6, borderWidth: 1, borderColor: "black", margin: 10 }}
                >
                    <Text style={{ fontSize: 16, textAlign: "left", color: "black", marginHorizontal: "5%", marginVertical: "3%" }}>
                        Open {ext} File
                    </Text>
                </LinearGradient>
            </Pressable>
            return <View style={{ width: "100%", height: 300, margin: 10 }}></View>

        }
        let bubble = (type, chainIn, chainOut, message, blocktime, key, value, asset) => {
            return <View key={key} style={{ marginTop: 10, marginHorizontal: "4%", width: "92%", alignItems: type ? "flex-end" : "flex-start" }}>
                <LinearGradient start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} colors={[chainsById[chainIn].color + "66", chainsById[chainOut].color + "66"]} style={{ minHeight: 40, maxWidth: "80%", borderRadius: 10, borderBottomLeftRadius: !type ? 1 : 10, borderBottomRightRadius: type ? 1 : 10 }}>
                    {
                        message !== "" &&
                        <>
                            <Text style={{ fontSize: 16, textAlign: "left", color: "black", marginHorizontal: "5%", marginVertical: "3%" }}>
                                {
                                    deleteFileFromMessage(message)
                                }
                            </Text>
                            <View style={{ height: 1, borderTopColor: "#ebebeb", borderTopWidth: 1 }} />
                        </>
                    }
                    {
                        detectFileType(message) !== "" &&
                        <>
                            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                {
                                    fileDisplay(detectUrl(message), detectFileType(message), detectFileExt(message), chainIn, chainOut)
                                }
                            </View>
                            <View style={{ height: 1, borderTopColor: "#ebebeb", borderTopWidth: 1 }} />
                        </>
                    }
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginHorizontal: "4%", marginVertical: "2%", minWidth: 100 }}>{
                        chainIn === chainOut ?
                            <>
                                <View />
                                <Image style={{ width: 20, height: 20 }} source={chainsById[chainIn].icon} />
                            </>
                            :
                            <>
                                <Image style={{ width: 20, height: 20 }} source={chainsById[chainIn].icon} />
                                <IconFont style={{ alignSelf: "center" }} color={"black"} name='caret-right' size={14} />
                                <Image style={{ width: 20, height: 20 }} source={chainsById[chainOut].icon} />
                            </>
                    }
                        <Text style={{ fontSize: 12, textAlign: "right", color: "black" }}>
                            {
                                new Date(blocktime * 1000).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
                            }
                        </Text>
                    </View>
                    {
                        value > 0 &&
                        <>
                            <View style={{ height: 1, borderTopColor: "#ebebeb", borderTopWidth: 1 }} />
                            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginHorizontal: "4%", marginVertical: "2%", minWidth: 100 }}>
                                <Text style={{ fontSize: 20, color: "black" }}>+</Text>
                                <Text style={{ fontSize: 20, color: "black", marginHorizontal: 10 }}>
                                    {
                                        espilonRound(value * Math.pow(10, -6))
                                    }
                                </Text>
                                <Image style={{ width: 20, height: 20 }} source={
                                    detectAsset(asset) ?? chainsById[chainIn].icon
                                } />
                            </View>
                        </>
                    }
                </LinearGradient>
            </View >
        }

        return (
            <>
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.modal}
                    onRequestClose={() => { console.log("Modal has been closed.") }}>
                    {/*All views of Modal*/}
                    <View style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#00000077"
                    }}>
                        <View style={{ width: "70%", height: "40%", backgroundColor: "white", borderRadius: 10 }}>
                            <View style={{ margin: 10 }}>
                                <Text style={{ fontSize: 24, color: "black", fontWeight: "bold", textAlign: "center" }}>
                                    Select default chain
                                </Text>
                            </View>
                            <View style={{
                                margin: 10,
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                flexWrap: "wrap"
                            }}>
                                <Pressable
                                    onPress={async () => {
                                        /*
                                        this.setState({
                                            loading: true
                                        })
                                        await this.storeDefaultChain(6648936)
                                        this.context.value.defaultChain < 10 && await this.storeDefaultToChain(6648936)
                                        this.context.setValue({
                                            defaultChain: 6648936,
                                            defaultChainTo: this.context.value.defaultChainTo < 10 ? 6648936 : this.context.value.defaultChainTo
                                        }, async () => {
                                            await this.updateFees()
                                            let res = await this.getGasFee(this.context.value.defaultChain, this.context.value.defaultChainTo)
                                            this.setState({
                                                modal: false,
                                                gasFee: res,
                                                loading: false
                                            })
                                        })*/
                                    }

                                    }
                                    style={{ width: "33%", height: 90, alignContent: "center", alignItems: "center" }}>
                                    <Image style={{ width: 50, height: 50 }} source={chainsById[6648936].icon} />
                                </Pressable>
                                <Pressable
                                    onPress={async () => {
                                        this.setState({
                                            loading: true
                                        })
                                        await this.storeDefaultChain(1869640809)
                                        this.context.value.defaultChain < 10 && await this.storeDefaultToChain(1869640809)
                                        this.context.setValue({
                                            defaultChain: 1869640809,
                                            defaultChainTo: this.context.value.defaultChainTo < 10 ? 1869640809 : this.context.value.defaultChainTo
                                        }, async () => {
                                            await this.updateFees()
                                            let res = await this.getGasFee(this.context.value.defaultChain, this.context.value.defaultChainTo)
                                            this.setState({
                                                modal: false,
                                                gasFee: res,
                                                loading: false
                                            })
                                        })
                                    }}
                                    style={{ width: "33%", height: 90, alignContent: "center", alignItems: "center" }}>
                                    <Image style={{ width: 50, height: 50 }} source={chainsById[1869640809].icon} />
                                </Pressable>
                                <Pressable
                                    onPress={async () => {
                                        this.setState({
                                            loading: true
                                        })
                                        await this.storeDefaultChain(1886350457)
                                        this.context.value.defaultChain < 10 && await this.storeDefaultToChain(1886350457)
                                        this.context.setValue({
                                            defaultChain: 1886350457,
                                            defaultChainTo: this.context.value.defaultChainTo < 10 ? 1886350457 : this.context.value.defaultChainTo
                                        }, async () => {
                                            await this.updateFees()
                                            let res = await this.getGasFee(this.context.value.defaultChain, this.context.value.defaultChainTo)
                                            this.setState({
                                                modal: false,
                                                gasFee: res,
                                                loading: false
                                            })
                                        })
                                    }}
                                    style={{ width: "33%", height: 90, alignContent: "center", alignItems: "center" }}>
                                    <Image style={{ width: 50, height: 50 }} source={chainsById[1886350457].icon} />
                                </Pressable>
                                <Pressable
                                    onPress={async () => {
                                        this.setState({
                                            loading: true
                                        })
                                        await this.storeDefaultChain(1634886255)
                                        this.context.value.defaultChain < 10 && await this.storeDefaultToChain(1634886255)
                                        this.context.setValue({
                                            defaultChain: 1634886255,
                                            defaultChainTo: this.context.value.defaultChainTo < 10 ? 1634886255 : this.context.value.defaultChainTo
                                        }, async () => {
                                            await this.updateFees()
                                            let res = await this.getGasFee(this.context.value.defaultChain, this.context.value.defaultChainTo)
                                            this.setState({
                                                modal: false,
                                                gasFee: res,
                                                loading: false
                                            })
                                        })
                                    }}
                                    style={{ width: "33%", height: 90, alignContent: "center", alignItems: "center" }}>
                                    <Image style={{ width: 50, height: 50 }} source={chainsById[1634886255].icon} />
                                </Pressable>
                                <Pressable
                                    onPress={async () => {
                                        this.setState({
                                            loading: true
                                        })
                                        await this.storeDefaultChain(6450786)
                                        this.context.value.defaultChain < 10 && await this.storeDefaultToChain(6450786)
                                        this.context.setValue({
                                            defaultChain: 6450786,
                                            defaultChainTo: this.context.value.defaultChainTo < 10 ? 6450786 : this.context.value.defaultChainTo
                                        }, async () => {
                                            await this.updateFees()
                                            let res = await this.getGasFee(this.context.value.defaultChain, this.context.value.defaultChainTo)
                                            this.setState({
                                                modal: false,
                                                gasFee: res,
                                                loading: false
                                            })
                                        })
                                    }}
                                    style={{ width: "33%", height: 90, alignContent: "center", alignItems: "center" }}>
                                    <Image style={{ width: 50, height: 50 }} source={chainsById[6450786].icon} />
                                </Pressable>
                                <Pressable
                                    onPress={async () => {
                                        this.setState({
                                            loading: true
                                        })
                                        await this.storeDefaultChain(6778479)
                                        this.context.value.defaultChain < 10 && await this.storeDefaultToChain(6778479)
                                        this.context.setValue({
                                            defaultChain: 6778479,
                                            defaultChainTo: this.context.value.defaultChainTo < 10 ? 6778479 : this.context.value.defaultChainTo
                                        }, async () => {
                                            await this.updateFees()
                                            let res = await this.getGasFee(this.context.value.defaultChain, this.context.value.defaultChainTo)
                                            this.setState({
                                                modal: false,
                                                gasFee: res,
                                                loading: false
                                            })
                                        })
                                    }}
                                    style={{ width: "33%", height: 90, alignContent: "center", alignItems: "center" }}>
                                    <Image style={{ width: 50, height: 50 }} source={chainsById[6778479].icon} />
                                </Pressable>
                                <Pressable
                                    onPress={async () => {
                                        this.setState({
                                            loading: true
                                        })
                                        await this.storeDefaultChain(0)
                                        await this.storeDefaultToChain(0)
                                        this.context.setValue({
                                            defaultChain: 0,
                                            defaultChainTo: 0
                                        }, async () => {
                                            await this.updateFees()
                                            let res = 0
                                            this.setState({
                                                modal: false,
                                                gasFee: res,
                                                loading: false
                                            })
                                        })
                                    }}
                                    style={{ width: "33%", height: 90, alignContent: "center", alignItems: "center" }}>
                                    <Image style={{ width: 50, height: 50 }} source={chainsById[0].icon} />
                                </Pressable>
                                <Pressable
                                    onPress={async () => {
                                        this.setState({
                                            loading: true
                                        })
                                        await this.storeDefaultChain(1)
                                        await this.storeDefaultToChain(1)
                                        this.context.setValue({
                                            defaultChain: 1,
                                            defaultChainTo: 1
                                        }, async () => {
                                            await this.updateFees()
                                            let res = 0
                                            this.setState({
                                                modal: false,
                                                gasFee: res,
                                                loading: false
                                            })
                                        })
                                    }}
                                    style={{ width: "33%", height: 90, alignContent: "center", alignItems: "center" }}>
                                    <Image style={{ width: 50, height: 50 }} source={chainsById[1].icon} />
                                </Pressable>
                                <Pressable
                                    onPress={async () => {
                                        this.setState({
                                            loading: true
                                        })
                                        await this.storeDefaultChain(2)
                                        await this.storeDefaultToChain(2)
                                        this.context.setValue({
                                            defaultChain: 2,
                                            defaultChainTo: 2
                                        }, async () => {
                                            await this.updateFees()
                                            let res = 0
                                            this.setState({
                                                modal: false,
                                                gasFee: res,
                                                loading: false
                                            })
                                        })
                                    }}
                                    style={{ width: "33%", height: 90, alignContent: "center", alignItems: "center" }}>
                                    <Image style={{ width: 50, height: 50 }} source={chainsById[2].icon} />
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.modalTo}
                    onRequestClose={() => { console.log("Modal has been closed.") }}>
                    {/*All views of Modal*/}
                    <View style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#00000077"
                    }}>
                        <View style={{ width: "70%", height: "40%", backgroundColor: "white", borderRadius: 10 }}>
                            <View style={{ margin: 10 }}>
                                <Text style={{ fontSize: 24, color: "black", fontWeight: "bold", textAlign: "center" }}>
                                    Select default chain
                                </Text>
                            </View>
                            <View style={{
                                margin: 10,
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                flexWrap: "wrap"
                            }}>
                                <Pressable
                                    onPress={async () => {
                                        /*
                                        this.setState({
                                            loading: true
                                        })
                                        await this.storeDefaultToChain(6648936)
                                        this.context.value.defaultChain < 10 && await this.storeDefaultChain(6648936)
                                        this.context.setValue({
                                            defaultChainTo: 6648936,
                                            defaultChain: this.context.value.defaultChain < 10 ? 6648936 : this.context.value.defaultChain
                                        }, async () => {
                                            await this.updateFees()
                                            let res = await this.getGasFee(this.context.value.defaultChain, this.context.value.defaultChainTo)
                                            this.setState({
                                                modalTo: false,
                                                gasFee: res,
                                                loading: false
                                            })
                                        })
                                        */
                                    }}
                                    style={{ width: "33%", height: 90, alignContent: "center", alignItems: "center" }}>
                                    <Image style={{ width: 50, height: 50 }} source={chainsById[6648936].icon} />
                                </Pressable>
                                <Pressable
                                    onPress={async () => {
                                        this.setState({
                                            loading: true
                                        })
                                        await this.storeDefaultToChain(1869640809)
                                        this.context.value.defaultChain < 10 && await this.storeDefaultChain(1869640809)
                                        this.context.setValue({
                                            defaultChainTo: 1869640809,
                                            defaultChain: this.context.value.defaultChain < 10 ? 1869640809 : this.context.value.defaultChain
                                        }, async () => {
                                            await this.updateFees()
                                            let res = await this.getGasFee(this.context.value.defaultChain, this.context.value.defaultChainTo)
                                            this.setState({
                                                modalTo: false,
                                                gasFee: res,
                                                loading: false
                                            })
                                        })
                                    }}
                                    style={{ width: "33%", height: 90, alignContent: "center", alignItems: "center" }}>
                                    <Image style={{ width: 50, height: 50 }} source={chainsById[1869640809].icon} />
                                </Pressable>
                                <Pressable
                                    onPress={async () => {
                                        this.setState({
                                            loading: true
                                        })
                                        await this.storeDefaultToChain(1886350457)
                                        this.context.value.defaultChain < 10 && await this.storeDefaultChain(1886350457)
                                        this.context.setValue({
                                            defaultChainTo: 1886350457,
                                            defaultChain: this.context.value.defaultChain < 10 ? 1886350457 : this.context.value.defaultChain
                                        }, async () => {
                                            await this.updateFees()
                                            let res = await this.getGasFee(this.context.value.defaultChain, this.context.value.defaultChainTo)
                                            this.setState({
                                                modalTo: false,
                                                gasFee: res,
                                                loading: false
                                            })
                                        })
                                    }}
                                    style={{ width: "33%", height: 90, alignContent: "center", alignItems: "center" }}>
                                    <Image style={{ width: 50, height: 50 }} source={chainsById[1886350457].icon} />
                                </Pressable>
                                <Pressable
                                    onPress={async () => {
                                        this.setState({
                                            loading: true
                                        })
                                        await this.storeDefaultToChain(1634886255)
                                        this.context.value.defaultChain < 10 && await this.storeDefaultChain(1634886255)
                                        this.context.setValue({
                                            defaultChainTo: 1634886255,
                                            defaultChain: this.context.value.defaultChain < 10 ? 1634886255 : this.context.value.defaultChain
                                        }, async () => {
                                            await this.updateFees()
                                            let res = await this.getGasFee(this.context.value.defaultChain, this.context.value.defaultChainTo)
                                            this.setState({
                                                modalTo: false,
                                                gasFee: res,
                                                loading: false
                                            })
                                        })
                                    }}
                                    style={{ width: "33%", height: 90, alignContent: "center", alignItems: "center" }}>
                                    <Image style={{ width: 50, height: 50 }} source={chainsById[1634886255].icon} />
                                </Pressable>
                                <Pressable
                                    onPress={async () => {
                                        this.setState({
                                            loading: true
                                        })
                                        await this.storeDefaultToChain(6450786)
                                        this.context.value.defaultChain < 10 && await this.storeDefaultChain(6450786)
                                        this.context.setValue({
                                            defaultChainTo: 6450786,
                                            defaultChain: this.context.value.defaultChain < 10 ? 6450786 : this.context.value.defaultChain
                                        }, async () => {
                                            await this.updateFees()
                                            let res = await this.getGasFee(this.context.value.defaultChain, this.context.value.defaultChainTo)
                                            this.setState({
                                                modalTo: false,
                                                gasFee: res,
                                                loading: false
                                            })
                                        })
                                    }}
                                    style={{ width: "33%", height: 90, alignContent: "center", alignItems: "center" }}>
                                    <Image style={{ width: 50, height: 50 }} source={chainsById[6450786].icon} />
                                </Pressable>
                                <Pressable
                                    onPress={async () => {
                                        this.setState({
                                            loading: true
                                        })
                                        await this.storeDefaultToChain(6778479)
                                        this.context.value.defaultChain < 10 && await this.storeDefaultChain(6778479)
                                        this.context.setValue({
                                            defaultChainTo: 6778479,
                                            defaultChain: this.context.value.defaultChain < 10 ? 6778479 : this.context.value.defaultChain
                                        }, async () => {
                                            await this.updateFees()
                                            let res = await this.getGasFee(this.context.value.defaultChain, this.context.value.defaultChainTo)
                                            this.setState({
                                                modalTo: false,
                                                gasFee: res,
                                                loading: false
                                            })
                                        })
                                    }}
                                    style={{ width: "33%", height: 90, alignContent: "center", alignItems: "center" }}>
                                    <Image style={{ width: 50, height: 50 }} source={chainsById[6778479].icon} />
                                </Pressable>
                                <Pressable
                                    onPress={async () => {
                                        this.setState({
                                            loading: true
                                        })
                                        await this.storeDefaultChain(0)
                                        await this.storeDefaultToChain(0)
                                        this.context.setValue({
                                            defaultChain: 0,
                                            defaultChainTo: 0
                                        }, async () => {
                                            await this.updateFees()
                                            let res = 0
                                            this.setState({
                                                modalTo: false,
                                                gasFee: res,
                                                loading: false
                                            })
                                        })
                                    }}
                                    style={{ width: "33%", height: 90, alignContent: "center", alignItems: "center" }}>
                                    <Image style={{ width: 50, height: 50 }} source={chainsById[0].icon} />
                                </Pressable>
                                <Pressable
                                    onPress={async () => {
                                        this.setState({
                                            loading: true
                                        })
                                        await this.storeDefaultChain(1)
                                        await this.storeDefaultToChain(1)
                                        this.context.setValue({
                                            defaultChain: 1,
                                            defaultChainTo: 1
                                        }, async () => {
                                            await this.updateFees()
                                            let res = 0
                                            this.setState({
                                                modalTo: false,
                                                gasFee: res,
                                                loading: false
                                            })
                                        })
                                    }}
                                    style={{ width: "33%", height: 90, alignContent: "center", alignItems: "center" }}>
                                    <Image style={{ width: 50, height: 50 }} source={chainsById[1].icon} />
                                </Pressable>
                                <Pressable
                                    onPress={async () => {
                                        this.setState({
                                            loading: true
                                        })
                                        await this.storeDefaultChain(2)
                                        await this.storeDefaultToChain(2)
                                        this.context.setValue({
                                            defaultChain: 2,
                                            defaultChainTo: 2
                                        }, async () => {
                                            await this.updateFees()
                                            let res = 0
                                            this.setState({
                                                modalTo: false,
                                                gasFee: res,
                                                loading: false
                                            })
                                        })
                                    }}
                                    style={{ width: "33%", height: 90, alignContent: "center", alignItems: "center" }}>
                                    <Image style={{ width: 50, height: 50 }} source={chainsById[2].icon} />
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Header navigation={this.props.navigation} />
                <SafeAreaView style={[GlobalStyles.mainChat]}>
                    <ImageBackground opacity={0.5} style={[GlobalStyles.background]} source={background} resizeMode="cover">
                        <ScrollView
                            animated={true}
                            ref={this.scroll}
                            contentContainerStyle={
                                {
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }
                            }>
                            {
                                !isObjectEmpty(this.context.value.messages) &&
                                !isArrayEmpty(this.context.value.messages[this.context.value.addressSelected] ?? []) && this.context.value.messages[this.context.value.addressSelected].map((item, index) => bubble(item.from === this.context.value.address, item.chainIn, item.chainOut, item.message, item.blocktime, `ChatWindow${index}`, item.value, item.asset))
                            }
                        </ScrollView>
                        <View
                            style={{
                                marginBottom: this.state.padding,
                            }}>
                            <Pressable
                                onPress={() =>
                                    this.setState({
                                        menuOpen: !this.state.menuOpen
                                    }, () => this.scroll.current.scrollToEnd({ animated: true }))
                                }
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                <IconMI color={"black"} name={this.state.menuOpen ? "arrow-drop-down" : "arrow-drop-up"} size={32} />
                            </Pressable>
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginVertical: 5
                                }}>
                                <TextInput
                                    editable={!this.state.loading}
                                    selectTextOnFocus={!this.state.loading}
                                    style={{
                                        width: "60%",
                                        backgroundColor: "white",
                                        borderRadius: 25,
                                        marginHorizontal: 10,
                                        color: "black",
                                        fontSize: 18,
                                        paddingHorizontal: 20,
                                        paddingVertical: 10,
                                        maxHeight: Dimensions.get("window").height / 5,
                                        borderWidth: 1,
                                        borderColor: "#d0d0d0"
                                    }}
                                    multiline
                                    onChangeText={(value) => this.setState({
                                        message: value
                                    })}
                                    placeholder="Message"
                                    placeholderTextColor={"black"}
                                    keyboardType="default"
                                    value={this.state.message}
                                />
                                <Pressable disabled={this.state.loading}
                                    onPress={async () => {
                                        this.setState({
                                            loading: true
                                        })
                                        DocumentPicker.pickSingle({
                                            presentationStyle: 'fullScreen',
                                            copyTo: 'cachesDirectory',
                                        }).then(async (e) => {
                                            this.file = e
                                            let res = await this.uploadFile(this.context.value.address)
                                            console.log(res)
                                            this.setState({
                                                loading: false,
                                                file: ":file:" + res + ":filef:" + ":type:" + this.file.type + ":typef:"
                                            })
                                        }
                                        ).catch(e => console.log(e))
                                    }
                                    }
                                    style={{}}>
                                    <LinearGradient
                                        start={{ x: 0, y: 0.5 }}
                                        end={{ x: 1, y: 0.5 }}
                                        colors={[this.state.file ? chainsById[this.context.value.defaultChain].color : "gray", this.state.file ? chainsById[this.context.value.defaultChainTo].color : "gray"]}
                                        style={{ borderRadius: 100, width: 50 }}
                                    >
                                        <View style={{ width: 50, height: 50, justifyContent: "center", alignItems: "center" }}>
                                            {
                                                <IconMI size={30} name="attach-file" />
                                            }
                                        </View>
                                    </LinearGradient>
                                </Pressable>
                                <Pressable disabled={this.state.loading} onPress={async () => {
                                    this.setState({
                                        loading: true
                                    })
                                    await this.sendXmessage(chainsById[this.context.value.defaultChain].xchat, chainsById[this.context.value.defaultChain].rpc, chainsById[this.context.value.defaultChainTo].xchat, this.context.value.defaultChainTo)
                                    this.setState({
                                        loading: false,
                                        message: "",
                                        amount: "",
                                        file: ""
                                    })
                                }
                                } style={{ marginHorizontal: 10 }}>
                                    <LinearGradient
                                        start={{ x: 0, y: 0.5 }}
                                        end={{ x: 1, y: 0.5 }}
                                        colors={[chainsById[this.context.value.defaultChain].color, chainsById[this.context.value.defaultChainTo].color]}
                                        style={{ borderRadius: 100, width: 50 }}
                                    >
                                        <View style={{ width: 50, height: 50, justifyContent: "center", alignItems: "center" }}>
                                            {
                                                this.state.loading ?
                                                    <IconMCI size={26} name="transit-connection-variant" />
                                                    :
                                                    <IconIon size={30} name="md-send" />
                                            }
                                        </View>
                                    </LinearGradient>
                                </Pressable>
                            </View>
                            {
                                this.state.menuOpen &&
                                <View>
                                    <View
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            marginVertical: 5,
                                        }}>
                                        <TextInput
                                            editable={!this.state.loading}
                                            selectTextOnFocus={!this.state.loading}
                                            style={{
                                                width: "60%",
                                                backgroundColor: "white",
                                                borderRadius: 25,
                                                marginLeft: 10,
                                                color: "black",
                                                fontSize: 18,
                                                paddingHorizontal: 20,
                                                paddingVertical: 10,
                                                maxHeight: Dimensions.get("window").height / 5,
                                                borderWidth: 1,
                                                borderColor: "#d0d0d0"
                                            }}
                                            onChangeText={(value) => this.setState({
                                                amount: value
                                            })}
                                            placeholder="Amount"
                                            placeholderTextColor={"black"}
                                            keyboardType="number-pad"
                                            value={this.state.amount}
                                        />
                                        <Text
                                            style={{
                                                width: "20%",
                                                color: "black",
                                                textAlign: "center",
                                                fontSize: 22,
                                                marginHorizontal: 5
                                            }}
                                        >
                                            {
                                                chainsById[this.context.value.defaultChain].token
                                            }
                                        </Text>
                                        <Pressable disabled={this.state.loading} onPress={async () => {
                                            this.setState({
                                                loading: true
                                            })
                                            await this.sendXmessageToken(chainsById[this.context.value.defaultChain].xchat, chainsById[this.context.value.defaultChain].rpc, chainsById[this.context.value.defaultChainTo].xchat, this.context.value.defaultChainTo, chainsById[this.context.value.defaultChain].usdc)
                                            this.setState({
                                                loading: false,
                                                message: "",
                                                amount: "",
                                                file: null
                                            })
                                        }
                                        } style={{ width: "20%" }}>
                                            <LinearGradient
                                                start={{ x: 0, y: 0.5 }}
                                                end={{ x: 1, y: 0.5 }}
                                                colors={[chainsById[this.context.value.defaultChain].color, chainsById[this.context.value.defaultChainTo].color]}
                                                style={{ borderRadius: 100, width: 50 }}
                                            >
                                                <View style={{ width: 50, height: 50, justifyContent: "center", alignItems: "center" }}>
                                                    {
                                                        this.state.loading ?
                                                            <IconMCI size={26} name="transit-connection-variant" />
                                                            :
                                                            <IconFA5 size={26} name="money-bill-wave" />
                                                    }
                                                </View>
                                            </LinearGradient>
                                        </Pressable>
                                    </View>
                                    <View
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            marginTop: 5,
                                            marginBottom: 10
                                        }}>
                                        <Pressable
                                            onPress={() =>
                                                this.setState({
                                                    modal: true
                                                })}
                                            style={{ width: 52, height: 52 }}>
                                            <Image style={{ width: 50, height: 50, marginHorizontal: 10 }} source={chainsById[this.context.value.defaultChain].icon} />
                                        </Pressable>
                                        <Text
                                            style={{
                                                color: "black",
                                            }}
                                        >
                                            Gas:{" "}
                                            {
                                                this.state.loading ? "loading" : espilonRound(ethers.utils.formatEther((parseInt(this.context.value.defaultChain === this.context.value.defaultChainTo ? "0" : this.state.gasFee) + this.state.gasTrans).toString()), 1000000000)
                                            } {chainsById[this.context.value.defaultChain].symbol
                                            }
                                            {" "}/{" "}
                                            {
                                                this.state.loading ? "loading" : espilonRound(
                                                    ethers.utils.formatEther(
                                                        (
                                                            parseInt(this.context.value.defaultChain === this.context.value.defaultChainTo ? "0" : this.state.gasFee) + this.state.gasTrans ?? 0
                                                        ).toString()
                                                    ) * this.state.usd[this.context.value.defaultChain], 10000)
                                            }
                                            {" "}USD
                                        </Text>
                                        <Pressable
                                            onPress={() =>
                                                this.setState({
                                                    modalTo: true
                                                })}
                                            style={{ width: 52, height: 52, marginHorizontal: 10 }}>
                                            <Image style={{ width: 50, height: 50 }} source={chainsById[this.context.value.defaultChainTo].icon} />
                                        </Pressable>
                                    </View>
                                </View>
                            }
                        </View>
                    </ImageBackground>
                </SafeAreaView>

            </>
        )
    }
}

export default Chat