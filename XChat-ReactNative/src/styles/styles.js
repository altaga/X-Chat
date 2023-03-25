import { Dimensions, StyleSheet } from 'react-native';

export const colorBase = "#ffd200";

const GlobalStyles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: "space-between",
        alignItems: 'center',
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
        backgroundColor: colorBase,
    },
    header: {
        position: "absolute",
        top: 40,
        height: 60,
        width: Dimensions.get("window").width,
        paddingTop: 10,
        backgroundColor: colorBase,
    },
    headerTop: {
        position: "absolute",
        top: 0,
        height: 40,
        width: Dimensions.get("window").width,
        paddingTop: 10,
        backgroundColor: colorBase,
    },
    headerChat: {
        position: "absolute",
        top: 0,
        height: 60,
        width: Dimensions.get("window").width,
        backgroundColor: colorBase,
    },
    login: {
        height: Dimensions.get("window").height - 60,
        width: Dimensions.get("window").width,
        backgroundColor: "#ebebeb",
        marginTop: 60,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    main: {
        height: Dimensions.get("window").height-100,
        backgroundColor:"#ebebeb",
        marginTop: 100,
    },
    mainChat: {
        height: Dimensions.get("window").height-60,
        backgroundColor:"white",
        marginTop: 60,
    },
    background: {
        height: Dimensions.get("window").height-60
    },
    footer: {
        width: Dimensions.get("window").width,
        height: 70,
        backgroundColor: colorBase,
        flexDirection: "row"
    },
    button: {
        borderRadius: 100,
        borderWidth: 2,
        backgroundColor: colorBase,
        padding: 10,
        width: "80%"
    },
    buttonText: {
        color: "black",
        fontSize: 26,
        textAlign: "center",
        fontFamily: "Helvetica",
    },
    floatText: {
        color: "black",
        fontSize: 26,
        textAlign: "center",
        fontFamily: "Helvetica",
        width: Dimensions.get("window").width * 0.8
    },
    simpleTextPhrase: {
        color: "black",
        textAlign: "center",
        fontFamily: "Helvetica"
    },
    balanceContainer: {
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: 'center',
        backgroundColor: colorBase,
        height: Dimensions.get("window").height * 0.1,
        width: Dimensions.get("window").width * 0.9, 
        borderRadius: 10,
        marginVertical: 10,
        borderColor: "black",
        borderWidth: 2
    }
});

export default GlobalStyles;