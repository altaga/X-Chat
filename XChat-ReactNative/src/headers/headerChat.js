import { Pressable, Text, View } from 'react-native'
import React, { Component } from 'react'
import GlobalStyles from '../styles/styles'
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Octicons';
import Icon3 from 'react-native-vector-icons/FontAwesome5Pro';
import { TextStroke } from 'react-native-textstroke'
import ContextModule from '../utils/contextModule';
import reactAutobind from 'react-autobind';
import xchatlogo from "../assets/xchat-logo.png"
import { Image } from 'react-native';
import { Linking } from 'react-native';

const MyText = (value) => {
    return <TextStroke stroke={0.3} color="black">
        <Text style={{
            fontSize: 18,
            letterSpacing: 1,
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
        this.state = {}
        reactAutobind(this)
    }

    static contextType = ContextModule;

    render() {
        return (
            <>
                <View style={GlobalStyles.headerChat}>
                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <View style={{flexDirection:"row"}}>
                            <Pressable
                                onPress={() => this.props.navigation.navigate('Main')}
                                style={{ marginHorizontal: 5, alignItems: "center" }}>
                                <Icon name='arrow-back' size={28} color="#fff" />
                            </Pressable>
                            <View style={{ marginHorizontal: 5, height: 32, justifyContent: "center", alignItems: "center" }}>
                                <Icon2 name='feed-person' size={30} color={`#${this.context.value.addressSelected.substring(2, 8)}`} />
                            </View>
                            <View style={{ marginHorizontal: 5, height: 28, justifyContent: "center", alignItems: "center" }}>
                                {
                                    MyText(this.context.value.addressSelected.substring(0, 8) + "..." + this.context.value.addressSelected.substring(this.context.value.addressSelected.length - 6, this.context.value.addressSelected.length))
                                }
                            </View>
                        </View>
                        <Pressable
                            onPress={() => Linking.openURL(`https://connextscan.io/address/${this.context.value.addressSelected}`)}
                            style={{ marginHorizontal: "5%", alignItems: "center" }}>
                            <Icon3 name='wpexplorer' size={28} color="#fff" />
                        </Pressable>
                    </View>
                </View>
            </>
        )
    }
}

export default Header 