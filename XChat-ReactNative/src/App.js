
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { Component } from 'react'
import { StatusBar } from 'react-native';
import Chat from './screens/chat';
import Login from './screens/login';
import Main from './screens/main';
import Cam from './utils/cam';
import { colorBase } from './styles/styles';
// Development
// import Test from './components/test';
// Utils
import { ContextProvider } from "./utils/contextModule";

const Stack = createNativeStackNavigator();

class App extends Component {
  render() {
    return (
      <ContextProvider>
        <NavigationContainer>
          <StatusBar barStyle="default" backgroundColor={colorBase} />
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerShown: false,
              //animation: 'none'
            }}
          >
            {
              // Login
            }
            <Stack.Screen name="Login" component={Login} />
            {
              // Main
            }
            <Stack.Screen name="Main" component={Main} />
            {
              // Chat
            }
            <Stack.Screen name="Chat" component={Chat} />
            {
              // Cam
            }
            <Stack.Screen name="Cam" component={Cam} />
            {
              // Test
            }
            {
              // <Stack.Screen name="Test" component={Test} />
            }
          </Stack.Navigator>
        </NavigationContainer>
      </ContextProvider>
    );
  }
}

export default App