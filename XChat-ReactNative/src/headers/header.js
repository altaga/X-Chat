import { Pressable, Text, View } from 'react-native'
import React, { Component } from 'react'
import GlobalStyles, { colorBase } from '../styles/styles'
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import { TextStroke } from 'react-native-textstroke'
import ContextModule from '../utils/contextModule';
import reactAutobind from 'react-autobind';
import xchatlogo from "../assets/xchat-logo.png"
import qr from "../assets/qr.png"
import { Image } from 'react-native';
import { Modal } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Linking } from 'react-native';

const MyText = (value) => {
    return <TextStroke stroke={0.3} color="black">
        <Text style={{
            fontSize: 16,
            letterSpacing: 2,
            color: 'white',
            fontWeight: '600'
        }}>
            {value}
        </Text>
    </TextStroke>
}

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false // false
        }
        reactAutobind(this)
    }

    static contextType = ContextModule;

    render() {
        let size = 9;
        let size2 = 30;
        return (
            <>
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.modal}
                    onRequestClose={() => { console.log("Modal has been closed.") }}>
                    <View style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#00000077"
                    }}>
                        <View style={{ width: "90%", height: "70%", backgroundColor: "white", borderRadius: 20, justifyContent: "space-evenly", alignItems: "center" }}>
                            <Text style={{ fontSize: 22, color: "black", fontWeight: "bold" }}>
                                {this.context.value.address.substring(0, 21)}
                                {"\n"}
                                {this.context.value.address.substring(21, 42)}
                            </Text>
                            <View style={{ borderColor: colorBase, borderWidth: 2 }}>
                                <QRCode
                                    value={this.context.value.address}
                                    size={300}
                                    quietZone={10}
                                    ecl="H"
                                />
                            </View>
                            <Pressable onPress={() => {
                                this.setState({
                                    modal: false
                                })
                            }} style={[GlobalStyles.button]}>
                                <Text style={{ fontSize: 26, color: "black", fontWeight: "bold", textAlign: "center" }}>
                                    Close
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                <View style={GlobalStyles.headerTop}>
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Image source={xchatlogo} style={{ marginLeft: 16, width: 970 / size, height: 246 / size }} />
                        <Pressable onPress={() => this.setState({
                            modal: true
                        })}>
                            <Image source={qr} style={{ width: 1024 / size2, height: 1024 / size2 }} />
                        </Pressable>
                        <View />
                        <View />
                        <View />
                    </View>
                </View>
                <View style={GlobalStyles.header}>
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
                        <Pressable
                            onPress={() => Linking.openURL(`https://connextscan.io/address/${this.context.value.address}`)}
                            style={{ marginHorizontal: "5%", alignItems: "center" }}>
                            <Icon name='wpexplorer' size={28} color="#fff" />
                        </Pressable>
                        <Pressable
                            onPress={() => this.context.setValue({
                                selector: 0
                            })}
                            style={{ flex: 2, justifyContent: "center", alignItems: "center", height: "100%", borderBottomWidth: this.context.value.selector === 0 ? 3 : 0, borderBottomColor: "#fff" }}>
                            {
                                MyText("Chats")
                            }
                        </Pressable>
                        <Pressable
                            onPress={() => this.context.setValue({
                                selector: 1
                            })}
                            style={{ flex: 2, justifyContent: "center", alignItems: "center", height: "100%", borderBottomWidth: this.context.value.selector === 1 ? 3 : 0, borderBottomColor: "#fff" }}>
                            {
                                MyText("Balances")
                            }
                        </Pressable>
                        <Pressable
                            onPress={() => this.context.setValue({
                                selector: 2
                            })}
                            style={{ flex: 2, justifyContent: "center", alignItems: "center", height: "100%", borderBottomWidth: this.context.value.selector === 2 ? 2 : 0, borderBottomColor: "#fff" }}>
                            {
                                MyText(" Files")
                            }
                        </Pressable>
                    </View>
                </View>
            </>
        )
    }
}

export default Header 