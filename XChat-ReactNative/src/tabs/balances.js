import { ScrollView, Text, View } from 'react-native'
import React, { Component } from 'react'
import ContextModule from '../utils/contextModule';
import reactAutobind from 'react-autobind';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import GlobalStyles from "../styles/styles"
import { Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Pressable } from 'react-native';
import { ethers } from 'ethers';
import { chains } from '../utils/chains';
import PressableClick from '../components/PressableClick';
import { Image } from 'react-native';
import { abi as abiIERC20 } from '../contracts/IERC20';

function espilonRound(num, zeros = 10000) {
    return Math.round((parseFloat(num) + Number.EPSILON) * zeros) / zeros;
}

Date.prototype.isValid = function () {
    // An invalid date object returns NaN for getTime() and NaN is the only
    // object not strictly equal to itself.
    return this.getTime() === this.getTime();
};

class Balances extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            lastUpdate: null,
        };
        reactAutobind(this)
    }

    static contextType = ContextModule;

    async componentDidMount() {
        this.updateBalances()
    }

    async updateBalances() {
        let [
            ethereumBalance,
            optimismBalance,
            polygonBalance,
            arbitrumOneBalance,
            binanceSmartChainBalance,
            gnosisBalance,
            scrollBalance,
            taikoBalance,
            mantleBalance,
            ethereumUSDC,
            optimismUSDC,
            polygonUSDC,
            arbitrumOneUSDC,
            binanceSmartChainUSDC,
            gnosisUSDC,
            scrollUSDC,
            taikoUSDC,
            mantleUSDC,
            res
        ] = await Promise.all([
            this.getTokenBalance(this.context.value.address, chains.ethereum.rpc),
            this.getTokenBalance(this.context.value.address, chains.optimism.rpc),
            this.getTokenBalance(this.context.value.address, chains.polygon.rpc),
            this.getTokenBalance(this.context.value.address, chains.arbitrum.rpc),
            this.getTokenBalance(this.context.value.address, chains.bsc.rpc),
            this.getTokenBalance(this.context.value.address, chains.gnosis.rpc),
            this.getTokenBalance(this.context.value.address, chains.scroll.rpc),
            this.getTokenBalance(this.context.value.address, chains.taiko.rpc),
            this.getTokenBalance(this.context.value.address, chains.mantle.rpc),
            this.getTokenBalanceContract(this.context.value.address, chains.ethereum.usdc, chains.ethereum.rpc),
            this.getTokenBalanceContract(this.context.value.address, chains.optimism.usdc, chains.optimism.rpc),
            this.getTokenBalanceContract(this.context.value.address, chains.polygon.usdc, chains.polygon.rpc),
            this.getTokenBalanceContract(this.context.value.address, chains.arbitrum.usdc, chains.arbitrum.rpc),
            this.getTokenBalanceContract(this.context.value.address, chains.bsc.usdc, chains.bsc.rpc),
            this.getTokenBalanceContract(this.context.value.address, chains.gnosis.usdc, chains.gnosis.rpc),
            this.getTokenBalanceContract(this.context.value.address, chains.scroll.usdc, chains.scroll.rpc),
            this.getTokenBalanceContract(this.context.value.address, chains.taiko.usdc, chains.taiko.rpc),
            this.getTokenBalanceContract(this.context.value.address, chains.mantle.usdc, chains.mantle.rpc),
            this.getTokenUSD(
                [
                    chains.ethereum.gecko,
                    chains.optimism.gecko,
                    chains.polygon.gecko,
                    chains.arbitrum.gecko,
                    chains.bsc.gecko,
                    chains.gnosis.gecko,
                    chains.scroll.gecko,
                    chains.taiko.gecko,
                    chains.mantle.gecko
                ]
            )
        ])
        let ethereumUSD = res[chains.ethereum.gecko].usd
        let optimismUSD = res[chains.optimism.gecko].usd
        let polygonUSD = res[chains.polygon.gecko].usd
        let arbitrumOneUSD = res[chains.arbitrum.gecko].usd
        let binanceSmartChainUSD = res[chains.bsc.gecko].usd
        let gnosisUSD = res[chains.gnosis.gecko].usd
        let scrollUSD = res[chains.scroll.gecko].usd
        let taikoUSD = res[chains.taiko.gecko].usd
        let mantleUSD = res[chains.mantle.gecko].usd
        this.context.setValue({
            ethereumBalance,
            optimismBalance,
            polygonBalance,
            arbitrumOneBalance,
            binanceSmartChainBalance,
            gnosisBalance,
            scrollBalance,
            taikoBalance,
            mantleBalance,
            ethereumUSDC,
            optimismUSDC,
            polygonUSDC,
            arbitrumOneUSDC,
            binanceSmartChainUSDC,
            gnosisUSDC,
            scrollUSDC,
            taikoUSDC,
            mantleUSDC,
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
        console.log({
            ethereumBalance,
            optimismBalance,
            polygonBalance,
            arbitrumOneBalance,
            binanceSmartChainBalance,
            gnosisBalance,
            scrollBalance,
            taikoBalance,
            mantleBalance,
            ethereumUSDC,
            optimismUSDC,
            polygonUSDC,
            arbitrumOneUSDC,
            binanceSmartChainUSDC,
            gnosisUSDC,
            scrollUSDC,
            taikoUSDC,
            mantleUSDC,
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
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        this.setState({
            lastUpdate: today
        })
    }

    async getTokenBalance(address, rpc) {
        const provider = new ethers.providers.JsonRpcProvider(rpc);
        return new Promise((resolve) => {
            provider.getBalance(address).then((balance) => {
                const balanceInEth = ethers.utils.formatEther(balance)
                resolve(parseFloat(balanceInEth))
            })
        })
    }

    async getTokenBalanceContract(address, addressToken, rpc) {
        const provider = new ethers.providers.JsonRpcProvider(rpc);
        const ierc20 = new ethers.Contract(addressToken, abiIERC20, provider);
        const decimals = await ierc20.decimals()
        return new Promise((resolve) => {
            ierc20.balanceOf(address).then((balance) => {
                resolve(balance / Math.pow(10, decimals))
            })
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

    render() {
        return (
            <SafeAreaView style={[GlobalStyles.main]}>
                <View style={{
                    height: Dimensions.get("screen").height * 0.24,
                    marginVertical: 20,
                    flexDirection: 'column',
                    justifyContent: "space-between",
                    alignItems: 'center',
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: "space-between",
                        alignItems: 'center',
                    }}>
                        <Text style={{ color: "black", fontSize: 20, paddingLeft: 20, width: "70%", fontWeight: "bold" }}>
                            Available Balance
                        </Text>
                        <View style={{ width: "30%" }} />
                    </View>
                    <Text style={{ color: "black", fontSize: 38, fontWeight: "bold", width: "100%", textAlign: "center" }}>
                        ${" "}
                        {
                            espilonRound(
                                (this.context.value.ethereumBalance ?? 0) * (this.context.value.ethereumUSD ?? 0) +
                                this.context.value.ethereumUSDC +
                                (this.context.value.optimismBalance ?? 0) * (this.context.value.optimismUSD ?? 0) +
                                this.context.value.optimismUSDC +
                                (this.context.value.polygonBalance ?? 0) * (this.context.value.polygonUSD ?? 0) +
                                this.context.value.polygonUSDC +
                                (this.context.value.arbitrumOneBalance ?? 0) * (this.context.value.arbitrumOneUSD ?? 0) +
                                this.context.value.arbitrumOneUSDC +
                                (this.context.value.binanceSmartChainBalance ?? 0) * (this.context.value.binanceSmartChainUSD ?? 0) +
                                this.context.value.binanceSmartChainUSDC +
                                (this.context.value.gnosisBalance ?? 0) * (this.context.value.gnosisUSD ?? 0) +
                                this.context.value.gnosisUSDC +
                                (this.context.value.scrollBalance ?? 0) * (this.context.value.scrollUSD ?? 0) +
                                this.context.value.scrollUSDC +
                                (this.context.value.taikoBalance ?? 0) * (this.context.value.taikoUSD ?? 0) +
                                this.context.value.taikoUSDC +
                                (this.context.value.mantleBalance ?? 0) * (this.context.value.mantleUSD ?? 0) +
                                this.context.value.mantleUSDC * (this.context.value.ethereumUSD ?? 0)
                                , 100)
                        }
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: "space-between",
                        alignItems: 'center',
                    }}>
                        <Text style={{ color: "black", fontSize: 16, paddingLeft: 20, width: "70%", fontWeight: "bold" }}>
                            Last Update:{"\n"}
                            {
                                this.state.loading ?
                                    "loading..."
                                    :
                                    this.state.lastUpdate ?
                                        (
                                            this.state.lastUpdate.isValid() ?
                                                this.state.lastUpdate.toLocaleDateString()
                                                :
                                                "Update Once"
                                        )
                                        :
                                        ""
                            }
                            {this.state.loading ?
                                ""
                                :
                                this.state.lastUpdate ?
                                    (this.state.lastUpdate.isValid() ?
                                        " - "
                                        :
                                        ""
                                    )
                                    :
                                    ""
                            }
                            {
                                this.state.loading ?
                                    ""
                                    :
                                    this.state.lastUpdate ?
                                        (
                                            this.state.lastUpdate.isValid() ?
                                                this.state.lastUpdate.toLocaleTimeString()
                                                :
                                                ""
                                        )
                                        :
                                        ""
                            }
                        </Text>
                        <PressableClick
                            style={{ width: "30%" }}
                            onClick={async () => {
                                await this.updateBalances()
                            }}
                            childrenComponent={
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: "space-between",
                                    alignItems: 'center',
                                    width: "88%"
                                }}>
                                    <Text style={{ color: "black", fontSize: 18, textAlign: "left" }}>
                                        Update Balance
                                    </Text>
                                    <Icon name="refresh-cw" size={30} color="black" />
                                </View>
                            }
                            idleComponent={
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: "space-between",
                                    alignItems: 'center',
                                    width: "88%"
                                }}>
                                    <Text style={{ color: "black", fontSize: 18, textAlign: "left" }}>
                                        Updating Balance...
                                    </Text>
                                    <Icon name="refresh-cw" size={30} color="black" />
                                </View>
                            }
                        />
                    </View>
                </View>
                <View style={{ marginHorizontal: "5%" }}>
                    <Text style={{ color: "black", fontSize: 20, paddingTop: 20, textAlign: "left", fontWeight: "bold" }}>
                        All Assets
                    </Text>
                </View>
                <ScrollView
                    style={{ height: Dimensions.get("screen").height }}
                    contentContainerStyle={{
                        flexDirection: 'column',
                        justifyContent: "space-between",
                        alignItems: 'center'
                    }}>
                    {
                        this.context.value.ethereumBalance > 0 &&
                        <View style={[GlobalStyles.balanceContainer]}>
                            <Image style={{ width: 36, height: 36 }} source={chains.ethereum.icon} />
                            <Text style={{ color: "black", fontSize: 24, fontWeight: "bold", textAlign: "center", width: "33%" }}>
                                {espilonRound(this.context.value.ethereumBalance ?? 0, 1000000)}
                            </Text>
                            <Text style={{ color: "black", fontSize: 24, fontWeight: "bold", textAlign: "center", width: "33%" }}>
                                {
                                    chains.ethereum.symbol
                                }
                            </Text>
                        </View>
                    }
                    {
                        this.context.value.optimismBalance > 0 &&
                        <View style={[GlobalStyles.balanceContainer]}>
                            <Image style={{ width: 36, height: 36 }} source={chains.optimism.icon} />
                            <Text style={{ color: "black", fontSize: 24, fontWeight: "bold", textAlign: "center", width: "33%" }}>
                                {espilonRound(this.context.value.optimismBalance ?? 0, 1000000)}
                            </Text>
                            <Text style={{ color: "black", fontSize: 24, fontWeight: "bold", textAlign: "center", width: "33%" }}>
                                {
                                    chains.optimism.symbol
                                }
                            </Text>
                        </View>
                    }
                    {
                        this.context.value.polygonBalance > 0 &&
                        <View style={[GlobalStyles.balanceContainer]}>
                            <Image style={{ width: 36, height: 36 }} source={chains.polygon.icon} />
                            <Text style={{ color: "black", fontSize: 24, fontWeight: "bold", textAlign: "center", width: "33%" }}>
                                {espilonRound(this.context.value.polygonBalance ?? 0, 1000000)}
                            </Text>
                            <Text style={{ color: "black", fontSize: 24, fontWeight: "bold", textAlign: "center", width: "33%" }}>
                                {
                                    chains.polygon.symbol
                                }
                            </Text>
                        </View>
                    }
                    {
                        this.context.value.arbitrumOneBalance > 0 &&
                        <View style={[GlobalStyles.balanceContainer]}>
                            <Image style={{ width: 36, height: 36 }} source={chains.arbitrum.icon} />
                            <Text style={{ color: "black", fontSize: 24, fontWeight: "bold", textAlign: "center", width: "33%" }}>
                                {espilonRound(this.context.value.arbitrumOneBalance ?? 0, 1000000)}
                            </Text>
                            <Text style={{ color: "black", fontSize: 24, fontWeight: "bold", textAlign: "center", width: "33%" }}>
                                {
                                    chains.arbitrum.symbol
                                }
                            </Text>
                        </View>
                    }
                    {
                        this.context.value.binanceSmartChainBalance > 0 &&
                        <View style={[GlobalStyles.balanceContainer]}>
                            <Image style={{ width: 36, height: 36 }} source={chains.bsc.icon} />
                            <Text style={{ color: "black", fontSize: 24, fontWeight: "bold", textAlign: "center", width: "33%" }}>
                                {espilonRound(this.context.value.binanceSmartChainBalance ?? 0, 1000000)}
                            </Text>
                            <Text style={{ color: "black", fontSize: 24, fontWeight: "bold", textAlign: "center", width: "33%" }}>
                                {
                                    chains.bsc.symbol
                                }
                            </Text>
                        </View>
                    }
                    {
                        this.context.value.gnosisBalance > 0 &&
                        <View style={[GlobalStyles.balanceContainer]}>
                            <Image style={{ width: 36, height: 36 }} source={chains.gnosis.icon} />
                            <Text style={{ color: "black", fontSize: 24, fontWeight: "bold", textAlign: "center", width: "33%" }}>
                                {espilonRound(this.context.value.gnosisBalance ?? 0, 1000000)}
                            </Text>
                            <Text style={{ color: "black", fontSize: 24, fontWeight: "bold", textAlign: "center", width: "33%" }}>
                                {
                                    chains.gnosis.symbol
                                }
                            </Text>
                        </View>
                    }
                    {
                        this.context.value.scrollBalance > 0 &&
                        <View style={[GlobalStyles.balanceContainer]}>
                            <Image style={{ width: 36, height: 36 }} source={chains.scroll.icon} />
                            <Text style={{ color: "black", fontSize: 24, fontWeight: "bold", textAlign: "center", width: "33%" }}>
                                {espilonRound(this.context.value.scrollBalance ?? 0, 1000000)}
                            </Text>
                            <Text style={{ color: "black", fontSize: 24, fontWeight: "bold", textAlign: "center", width: "33%" }}>
                                {
                                    chains.scroll.symbol
                                }
                            </Text>
                        </View>
                    }
                    {
                        this.context.value.taikoBalance > 0 &&
                        <View style={[GlobalStyles.balanceContainer]}>
                            <Image style={{ width: 36, height: 36 }} source={chains.taiko.icon} />
                            <Text style={{ color: "black", fontSize: 24, fontWeight: "bold", textAlign: "center", width: "33%" }}>
                                {espilonRound(this.context.value.taikoBalance ?? 0, 1000000)}
                            </Text>
                            <Text style={{ color: "black", fontSize: 24, fontWeight: "bold", textAlign: "center", width: "33%" }}>
                                {
                                    chains.taiko.symbol
                                }
                            </Text>
                        </View>
                    }
                    {
                        this.context.value.mantleBalance > 0 &&
                        <View style={[GlobalStyles.balanceContainer]}>
                            <Image style={{ width: 36, height: 36 }} source={chains.mantle.icon} />
                            <Text style={{ color: "black", fontSize: 24, fontWeight: "bold", textAlign: "center", width: "33%" }}>
                                {espilonRound(this.context.value.mantleBalance ?? 0, 1000000)}
                            </Text>
                            <Text style={{ color: "black", fontSize: 24, fontWeight: "bold", textAlign: "center", width: "33%" }}>
                                {
                                    chains.mantle.symbol
                                }
                            </Text>
                        </View>
                    }
                    {
                        this.context.value.ethereumUSDC > 0 &&
                        <View style={[GlobalStyles.balanceContainer]}>
                            <Image style={{ width: 36, height: 36 }} source={chains.ethereum.icon} />
                            <Text style={{ color: "black", fontSize: 24, fontWeight: "bold", textAlign: "center", width: "33%" }}>
                                {espilonRound(this.context.value.ethereumUSDC ?? 0, 1000000)}
                            </Text>
                            <Text style={{ color: "black", fontSize: 24, fontWeight: "bold", textAlign: "center", width: "33%" }}>
                                USDC
                            </Text>
                        </View>
                    }
                    {
                        this.context.value.optimismUSDC > 0 &&
                        <View style={[GlobalStyles.balanceContainer]}>
                            <Image style={{ width: 36, height: 36 }} source={chains.optimism.icon} />
                            <Text style={{ color: "black", fontSize: 24, fontWeight: "bold", textAlign: "center", width: "33%" }}>
                                {espilonRound(this.context.value.optimismUSDC ?? 0, 1000000)}
                            </Text>
                            <Text style={{ color: "black", fontSize: 24, fontWeight: "bold", textAlign: "center", width: "33%" }}>
                                USDC
                            </Text>
                        </View>
                    }
                    {
                        this.context.value.polygonUSDC > 0 &&
                        <View style={[GlobalStyles.balanceContainer]}>
                            <Image style={{ width: 36, height: 36 }} source={chains.polygon.icon} />
                            <Text style={{ color: "black", fontSize: 24, fontWeight: "bold", textAlign: "center", width: "33%" }}>
                                {espilonRound(this.context.value.polygonUSDC ?? 0, 1000000)}
                            </Text>
                            <Text style={{ color: "black", fontSize: 24, fontWeight: "bold", textAlign: "center", width: "33%" }}>
                                USDC
                            </Text>
                        </View>
                    }
                    {
                        this.context.value.arbitrumOneUSDC > 0 &&
                        <View style={[GlobalStyles.balanceContainer]}>
                            <Image style={{ width: 36, height: 36 }} source={chains.arbitrum.icon} />
                            <Text style={{ color: "black", fontSize: 24, fontWeight: "bold", textAlign: "center", width: "33%" }}>
                                {espilonRound(this.context.value.arbitrumOneUSDC ?? 0, 1000000)}
                            </Text>
                            <Text style={{ color: "black", fontSize: 24, fontWeight: "bold", textAlign: "center", width: "33%" }}>
                                USDC
                            </Text>
                        </View>
                    }
                    {
                        this.context.value.binanceSmartChainUSDC > 0 &&
                        <View style={[GlobalStyles.balanceContainer]}>
                            <Image style={{ width: 36, height: 36 }} source={chains.bsc.icon} />
                            <Text style={{ color: "black", fontSize: 24, fontWeight: "bold", textAlign: "center", width: "33%" }}>
                                {espilonRound(this.context.value.binanceSmartChainUSDC ?? 0, 1000000)}
                            </Text>
                            <Text style={{ color: "black", fontSize: 24, fontWeight: "bold", textAlign: "center", width: "33%" }}>
                                USDC
                            </Text>
                        </View>
                    }
                    {
                        this.context.value.gnosisUSDC > 0 &&
                        <View style={[GlobalStyles.balanceContainer]}>
                            <Image style={{ width: 36, height: 36 }} source={chains.gnosis.icon} />
                            <Text style={{ color: "black", fontSize: 24, fontWeight: "bold", textAlign: "center", width: "33%" }}>
                                {espilonRound(this.context.value.gnosisUSDC ?? 0, 1000000)}
                            </Text>
                            <Text style={{ color: "black", fontSize: 24, fontWeight: "bold", textAlign: "center", width: "33%" }}>
                                USDC
                            </Text>
                        </View>
                    }
                    {
                        this.context.value.scrollUSDC > 0 &&
                        <View style={[GlobalStyles.balanceContainer]}>
                            <Image style={{ width: 36, height: 36 }} source={chains.scroll.icon} />
                            <Text style={{ color: "black", fontSize: 24, fontWeight: "bold", textAlign: "center", width: "33%" }}>
                                {espilonRound(this.context.value.scrollUSDC ?? 0, 1000000)}
                            </Text>
                            <Text style={{ color: "black", fontSize: 24, fontWeight: "bold", textAlign: "center", width: "33%" }}>
                                USDC
                            </Text>
                        </View>
                    }
                    {
                        this.context.value.taikoUSDC > 0 &&
                        <View style={[GlobalStyles.balanceContainer]}>
                            <Image style={{ width: 36, height: 36 }} source={chains.taiko.icon} />
                            <Text style={{ color: "black", fontSize: 24, fontWeight: "bold", textAlign: "center", width: "33%" }}>
                                {espilonRound(this.context.value.taikoUSDC ?? 0, 1000000)}
                            </Text>
                            <Text style={{ color: "black", fontSize: 24, fontWeight: "bold", textAlign: "center", width: "33%" }}>
                                BLL
                            </Text>
                        </View>
                    }
                    {
                        this.context.value.mantleUSDC > 0 &&
                        <View style={[GlobalStyles.balanceContainer]}>
                            <Image style={{ width: 36, height: 36 }} source={chains.mantle.icon} />
                            <Text style={{ color: "black", fontSize: 24, fontWeight: "bold", textAlign: "center", width: "33%" }}>
                                {espilonRound(this.context.value.mantleUSDC ?? 0, 1000000)}
                            </Text>
                            <Text style={{ color: "black", fontSize: 24, fontWeight: "bold", textAlign: "center", width: "33%" }}>
                                WETH
                            </Text>
                        </View>
                    }
                </ScrollView>
            </SafeAreaView>
        )
    }
}

export default Balances