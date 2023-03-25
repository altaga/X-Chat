import { Pressable, Text, View } from 'react-native'
import React, { Component } from 'react'
import reactAutobind from 'react-autobind';

class PressableClick extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
        reactAutobind(this)
    }
    render() {
        return (
            <Pressable style={[this.props.style, { backgroundColor: `${this.props.style[0]?.backgroundColor}${this.state.loading ? "77" : ""}` }]}
                disabled={this.state.loading}
                onPress={() => {
                    this.props?.onClickStart && this.props.onClickStart()
                    this.setState({
                        loading: true
                    }, () => {
                        setTimeout(async () => {
                            await this.props.onClick()
                            this.setState({
                                loading: false
                            }, () => this.props?.onClickFinish && this.props.onClickFinish())
                        }, 100)
                    })
                }}>
                {
                    this.state.loading ?
                        this.props.idleComponent
                        :
                        this.props.childrenComponent
                }
            </Pressable>
        )
    }
}

export default PressableClick