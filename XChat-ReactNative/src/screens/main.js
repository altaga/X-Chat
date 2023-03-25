import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../headers/header'
import ContextModule from '../utils/contextModule';
import Balances from '../tabs/balances';
import Chats from '../tabs/chats';

class Main extends Component {
  static contextType = ContextModule;
  render() {
    return (
      <SafeAreaView>
        <Header />
        {
          this.context.value.selector === 0 &&
          <Chats navigation={this.props.navigation} />
        }
        {
          this.context.value.selector === 1 &&
          <Balances />
        }
        {
          this.context.value.selector === 2 &&
          <View />
        }
      </SafeAreaView>
    )
  }
}

export default Main 