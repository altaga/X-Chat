import { Platform, Text, View } from 'react-native'
import React, { Component } from 'react'
import ContextModule from '../utils/contextModule';
import GlobalStyles, { colorBase } from '../styles/styles';
import { SafeAreaView } from 'react-native';
import reactAutobind from 'react-autobind';
import { ScrollView } from 'react-native';
import { chains, chainsById } from '../utils/chains';
import { Image } from 'react-native';
import { abi as abiXChat } from '../contracts/XChat';
import { abi as abiXChatMod } from '../contracts/XChatMod';
import { ethers } from 'ethers';
import Icon from 'react-native-vector-icons/Octicons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { Pressable } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

function deleteFileFromMessage(string) {
    if (string.indexOf(":type:") === -1) return string;
    let file = string.split(":file:")[1].split(":typef:")[0]
    return string.replace(file, "").replace(":file:", "").replace(":typef:", "")
}

class Chats extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        reactAutobind(this)
        this.checkInterval = null
        this.file = null
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
        console.log(
            [inputETH, outputETH],
            [inputOP, outputOP],
            [inputMATIC, outputMATIC],
            [inputARB, outputARB],
            [inputBSC, outputBSC],
            [inputGNOSIS, outputGNOSIS],
            [inputSCROLL, outputSCROLL],
            [inputTAIKO, outputTAIKO],
            [inputMANTLE, outputMANTLE]
        )
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
        }
    }

    async componentDidMount() {
        /*
           let messages = {}
            let messagesSummary = []
            let counter = {
                6648936: 0,
                1869640809: 0,
                1886350457: 0,
                1634886255: 0,
                6450786: 0,
                6778479: 0,
                0:0,
                1:0,
                2:0,
            }
            await this.storeMessages(messages)
            await this.storeMessagesSummary(messagesSummary)
            await this.storeCounter(counter)
        */

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
                        this.checkInterval = setInterval(() => this.getMessages(), 60000)
                    }
                )
            }
            else {
                console.log("No Counter")
            }
        } catch (error) {
            console.log("Error Counter Memory")
        }
    }

    componentWillUnmount() {
        this.checkInterval && clearInterval(this.checkInterval)
    }

    render() {
        let heightChat = 90
        let squareChat = (name, chainIn, chainOut, lastMessage, date, key) =>
            <Pressable onPress={() => {
                this.context.setValue({
                    addressSelected: name
                }, () => this.props.navigation.navigate('Chat'))
            }
            } key={key} style={
                {
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                    height: heightChat
                }
            }>
                <View style={{ width: "20%", height: heightChat, justifyContent: "center", alignItems: "center" }}>
                    <Icon name='feed-person' size={50} color={`#${name.substring(2, 8)}`} />
                </View>
                <View style={{ width: "60%", height: heightChat, justifyContent: "center", alignItems: "flex-start" }}>
                    <Text style={{ color: "black", fontWeight: "800", fontSize: 20 }}>
                        {
                            name.substring(0, 8)
                        }
                        {
                            "..."
                        }
                        {
                            name.substring(name.length - 6, name.length)
                        }
                    </Text>
                    <View style={{ height: 6 }} />
                    <View style={
                        {
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center",
                        }
                    }>
                        {
                            chainIn === chainOut ?
                                <>
                                    <Image style={{ width: 16, height: 16, marginRight: 10 }} source={chainsById[chainIn].icon} />
                                </>
                                :
                                <>
                                    <Image style={{ width: 16, height: 16 }} source={chainsById[chainIn].icon} />
                                    <Icon style={{ marginHorizontal: 4 }} name='triangle-right' size={16} color={`black`} />
                                    <Image style={{ width: 16, height: 16, marginRight: 10 }} source={chainsById[chainOut].icon} />
                                </>
                        }
                        <Text style={{ color: "black" }}>
                            {
                                deleteFileFromMessage(lastMessage).substring(0, 30)
                            }
                            {
                                deleteFileFromMessage(lastMessage).length > 30 && "..."
                            }
                        </Text>
                    </View>
                </View>
                <View style={{ width: "20%", height: heightChat, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: "black", marginTop: 34 }}>
                        {
                            date
                        }
                    </Text>
                </View>
            </Pressable>
        return (
            <SafeAreaView style={[GlobalStyles.main]}>
                <ScrollView
                    contentContainerStyle={
                        {
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }
                    }>
                    {
                        this.context.value.messagesSummary.map((item, index) => squareChat(
                            item.name,
                            item.chainIn,
                            item.chainOut,
                            item.message,
                            new Date(item.blocktime * 1000).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
                            "chat" + index))
                    }
                </ScrollView>
                <Pressable
                    onPress={() => this.props.navigation.navigate('Cam')} 
                    style={{ position: "absolute", bottom: 20, right: 20, backgroundColor: colorBase, width: 60, height: 60, borderRadius: 60, justifyContent: "center", alignItems: "center" }}>
                    <Icon2 name='chat' size={30} color={"white"} />
                </Pressable>
            </SafeAreaView>
        )
    }
}

export default Chats