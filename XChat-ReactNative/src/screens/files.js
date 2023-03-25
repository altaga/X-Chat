import { Text, View } from 'react-native'
import React, { Component } from 'react'

class Files extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: []
        }
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', async () => {

        })
        this.props.navigation.addListener('blur', async () => {
        })
    }
  render() {
    return (
      <View>
        <Text>Files</Text>
      </View>
    )
  }
}

export default Files