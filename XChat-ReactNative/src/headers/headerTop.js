import { View } from 'react-native'
import React, { Component } from 'react'
import GlobalStyles from '../styles/styles'
import reactAutobind from 'react-autobind';
import xchatlogo from "../assets/xchat-logo.png"
import { Image } from 'react-native';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        reactAutobind(this)
    }

    render() {
        let size = 9;
        return (
            <>
                <View style={[GlobalStyles.headerTop,{height:60}]}>
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <View style={{ margin: 16 }}>
                            <Image source={xchatlogo} style={{ width: 970 / size, height: 246 / size }} />
                        </View>
                        <View />
                        <View />
                    </View>
                </View>
            </>
        )
    }
}

export default Header 