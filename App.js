import React, {Component} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";

const Stack = createStackNavigator();

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            base: null,
            authToken: null,
        }
    }

    /**
     * Stores the user authentication data
     * @param user
     * @param base
     * @param authToken
     */
    authenticate = (user, base, authToken) => {
        console.log(user, base, authToken)
        this.setState({
            user: user,
            base: base,
            authToken: authToken,
        })
    }

    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false}}>
                    {this.state.authToken == null ? (
                        <Stack.Screen name="Login">{() => <LoginScreen
                            authenticate={this.authenticate}/>}</Stack.Screen>
                    ) : (
                        <Stack.Screen name="Home">
                            {() => <HomeScreen user={this.state.user} base={this.state.base}
                                               authToken={this.state.authToken}/>}
                        </Stack.Screen>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}
