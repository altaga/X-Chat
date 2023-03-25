/**
 * @format
 */
import "node-libs-react-native/globals"
import './shim.js'
import 'text-encoding-polyfill'

// ETH Setup
import 'react-native-get-random-values';
import "@ethersproject/shims"
import 'react-native-url-polyfill/auto';
import {Buffer} from '@craftzdog/react-native-buffer';


// General
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

// Setup Buffer
global.Buffer = Buffer;

AppRegistry.registerComponent(appName, () => App);

