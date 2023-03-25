// Basic Imports
import React from 'react'
import reactAutobind from 'react-autobind';

const ContextModule = React.createContext()

// Context Provider Component

class ContextProvider extends React.Component {
  // define all the values you want to use in the context
  constructor(props) {
    super(props);
    this.state = {
      value: {
        selector: 0, // 0 - Chats, 1 - Balances, 2 - Files
        address: "",
        addressSelected: "", // ""
        messages: {},
        messagesSummary: [],
        counter: {
          6648936: 0,
          1869640809: 0,
          1886350457: 0,
          1634886255: 0,
          6450786: 0,
          6778479: 0,
          0:0,
          1:0,
          2:0,
        },
        defaultChain:1886350457,
        defaultChainTo:1886350457,
        // Balances
        ethereumBalance: 0.0,
        optimismBalance: 0.0,
        polygonBalance: 0.0,
        arbitrumOneBalance: 0.0,
        binanceSmartChainBalance: 0.0,
        gnosisBalance: 0.0,
        scrollBalance: 0.0,
        taikoBalance:0.0,
        mantleBalance:0.0,
        ethereumUSD: 0.0,
        optimismUSD: 0.0,
        polygonUSD: 0.0,
        arbitrumOneUSD: 0.0,
        binanceSmartChainUSD: 0.0,
        gnosisUSD: 0.0,
        scrollUSD: 0.0,
        taikoUSD:0.0,
        mantleUSD:0.0,
        ethereumUSDC: 0.0,
        optimismUSDC: 0.0,
        polygonUSDC: 0.0,
        arbitrumOneUSDC: 0.0,
        binanceSmartChainUSDC: 0.0,
        gnosisUSDC: 0.0,
        scrollUSDC: 0.0,
        taikoUSDC:0.0,
        mantleUSDC:0.0,
      }
    }
    reactAutobind(this);
  }

  setValue = (value, then = () => { }) => {
    this.setState({
      value: {
        ...this.state.value,
        ...value,
      }
    }, () => then())
  }

  render() {
    const { children } = this.props
    const { value } = this.state
    // Fill this object with the methods you want to pass down to the context
    const { setValue } = this

    return (
      <ContextModule.Provider
        // Provide all the methods and values defined above
        value={{
          value,
          setValue
        }}
      >
        {children}
      </ContextModule.Provider>
    )
  }
}

// Dont Change anything below this line

export { ContextProvider }
export const ContextConsumer = ContextModule.Consumer
export default ContextModule