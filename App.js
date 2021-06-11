import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import ConsultationsScreen from "./screens/ConsultationsScreen";
import LogoutScreen from "./screens/LogoutScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default class App extends React.Component {
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
        this.setState({
            user: user,
            base: base,
            authToken: authToken,
        })
    }

    disconnect = () => {
        this.setState({
            user: null,
            base: null,
            authToken: null,
        })
    }

    render() {
        return (
            <NavigationContainer>
                {this.state.authToken == null ? (
                    <Stack.Navigator screenOptions={{headerShown: false}}>
                        <Stack.Screen name="Login">{() => <LoginScreen
                            authenticate={this.authenticate}/>}</Stack.Screen>
                    </Stack.Navigator>
                ) : (
                    <Tab.Navigator>
                        <Tab.Screen name="Home">
                            {() => <HomeScreen user={this.state.user} base={this.state.base}
                                               authToken={this.state.authToken}/>}
                        </Tab.Screen>
                        <Tab.Screen name="Rapports">
                            {() => <ConsultationsScreen user={this.state.user} base={this.state.base}
                                                        authToken={this.state.authToken}/>}
                        </Tab.Screen>
                        <Tab.Screen name="Déconnexion">
                            {() => <LogoutScreen user={this.state.user} base={this.state.base} disconnect={this.disconnect}/>}
                        </Tab.Screen>
                    </Tab.Navigator>
                )}
            </NavigationContainer>
        );
    }
}
