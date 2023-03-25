import { Image, Pressable, Text, View } from 'react-native'
import React, { Component } from 'react'
import Header from '../headers/headerTop'
import { SafeAreaView } from 'react-native-safe-area-context'
import GlobalStyles, { colorBase } from '../styles/styles'
import xchatLogos from "../assets/xchat-logos.png"
import ContextModule from '../utils/contextModule'
import reactAutobind from 'react-autobind'
import { ethers } from 'ethers'
import AsyncStorage from '@react-native-async-storage/async-storage'
import EncryptedStorage from 'react-native-encrypted-storage'
import PressableClick from '../components/PressableClick'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 0,
      phrase: "",
    };
    reactAutobind(this)
  }

  static contextType = ContextModule;

  async componentDidMount() {
    //await this.erase()
    //this.storeDefaultChain(6648936)
    //this.storeDefaultToChain(6648936)
    this.props.navigation.addListener('focus', async () => {
      let checkAddress = false
      let checkWallet = false
      try {
        const session = await AsyncStorage.getItem('userAddress');
        if (session !== null) {
          this.context.setValue({
            address: JSON.parse(session).value
          })
          checkAddress = true
        }
        else {
          checkAddress = false
        }
      } catch (error) {
        checkAddress = false
      }
      try {
        const session = await EncryptedStorage.getItem("userPrivs");
        if (session !== null) {
          checkWallet = true
        }
        else {
          checkWallet = false
        }
      } catch (error) {
        checkWallet = false
      }
      // Debug Start
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
        const session = await EncryptedStorage.getItem("chain");
        if (session !== null) {
          this.context.setValue({
            defaultChain: JSON.parse(session).value
          })
        }
        else {
          console.log("No messages")
        }
      } catch (error) {
        console.log("Error messages Memory")
      }
      try {
        const session = await EncryptedStorage.getItem("chainTo");
        if (session !== null) {
          this.context.setValue({
            defaultChainTo: JSON.parse(session).value
          })
        }
        else {
          console.log("No messages")
        }
      } catch (error) {
        console.log("Error messages Memory")
      }
      // Debug END
      if (checkWallet && checkAddress) {
        this.props.navigation.navigate('Main') // Main
      }
      else {
        this.setState({
          stage: 1
        })
      }
    })
    this.props.navigation.addListener('blur', () => {

    })
  }

  async storeUserPrivs(value) {
    try {
      await EncryptedStorage.setItem(
        "userPrivs",
        JSON.stringify({
          value: value
        })
      );
    } catch (error) {
      // There was an error on the native side
    }
  }

  async storeUserAddress(value) {
    try {
      await AsyncStorage.setItem('userAddress', JSON.stringify({ value }))
      this.context.setValue({
        account: value
      })
    } catch (e) {
      // saving error
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

  // Dev Only
  async erase() {
    try {
      await EncryptedStorage.clear();
      await AsyncStorage.clear()
      // Congrats! You've just cleared the device storage!
    } catch (error) {
      // There was an error on the native side
    }
  }

  render() {
    return (
      <SafeAreaView>
        <Header />
        <View style={GlobalStyles.login}>
          {
            this.state.stage === 0 &&
            <>
              <Image source={xchatLogos} style={{ height: 616 / 2.5, width: 705 / 2.5 }} />
            </>
          }
          {
            this.state.stage === 1 &&
            <>
              <Image source={xchatLogos} style={{ height: 616 / 2.5, width: 705 / 2.5 }} />
              <View>
                <Text style={[GlobalStyles.floatText]}>
                  Chat and send Assets across EVM and ZK compatible chains
                </Text>
              </View>
              <PressableClick
                style={[GlobalStyles.button]}
                onClickStart={() => {
                  console.log("Click In")
                }}
                onClickFinish={() => {
                  console.log("Click Out")
                  this.setState({
                    stage: 2
                  })
                }}
                onClick={async () => {
                  const wallet = ethers.Wallet.createRandom()
                  this.storeUserAddress(wallet.address)
                  this.storeUserPrivs({
                    address: wallet.address,
                    phrase: wallet.mnemonic.phrase,
                    privateKey: wallet.privateKey
                  })
                  this.storeCounter({
                    6648936: 0,
                    1869640809: 0,
                    1886350457: 0,
                    1634886255: 0,
                    6450786: 0,
                    6778479: 0,
                    0: 0,
                    1: 0,
                    2: 0,
                  })
                  this.storeDefaultChain(1886350457)
                  this.storeDefaultToChain(1886350457)
                  this.setState({
                    phrase: wallet.mnemonic.phrase
                  })
                }}
                childrenComponent={
                  <Text style={[GlobalStyles.buttonText]}>
                    Create new wallet
                  </Text>
                }
                idleComponent={
                  <Text style={[GlobalStyles.buttonText]}>
                    Creating...
                  </Text>
                }
              />
            </>
          }
          {
            this.state.stage === 2 &&
            <>
              <Text style={[GlobalStyles.floatText, { fontSize: 24, width: "80%" }]}>
                Secret Recovery Phrase
              </Text>
              <Text style={[GlobalStyles.floatText, { fontSize: 24 }]}>
                This is the only way you will be able to recover your wallet. Please store it somewhere safe.
              </Text>
              <View style={{ backgroundColor: "white", width: "80%", height: "20%", flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap", borderColor: colorBase, borderWidth: 2 }}>
                {
                  ["", "", ""].map((item, index) => {
                    return (
                      <Text key={"phrase" + index} style={[GlobalStyles.simpleTextPhrase, { fontSize: 15, width: "33%" }]}>
                        {
                          item
                        }
                      </Text>
                    )
                  })
                }
                {
                  this.state.phrase.split(" ").map((item, index) => {
                    return (
                      <Text key={"phrase" + index} style={[GlobalStyles.simpleTextPhrase, { fontSize: 20, width: "33%" }]}>
                        {
                          item
                        }
                      </Text>
                    )
                  })
                }
              </View>
              <Pressable
                style={[GlobalStyles.button]}
                onPress={async () => {
                  try {
                    const session = await AsyncStorage.getItem('userAddress');
                    if (session !== null) {
                      this.context.setValue({
                        address: JSON.parse(session).value
                      })
                    }
                    else {
                      console.log("Error Loading Credentials")
                    }
                  } catch (error) {
                    console.log("Error Library Storage")
                  }
                  this.props.navigation.navigate('Main') // Main
                }}
              >
                <Text style={[GlobalStyles.buttonText]}>
                  Continue
                </Text>
              </Pressable>
            </>
          }
        </View>
      </SafeAreaView>
    )
  }
}

export default Login 