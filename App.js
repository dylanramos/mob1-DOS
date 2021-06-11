import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import ConsultationsScreen from "./screens/ConsultationsScreen";
import LogoutScreen from "./screens/LogoutScreen";
import ActionsInShiftScreen from "./screens/ActionsInShiftScreen";

const Stack = createStackNavigator();

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
                    <Stack.Navigator>
                        <Stack.Screen name="Home" options={{title: "Menu"}}>
                            {props => <HomeScreen {...props} user={this.state.user} base={this.state.base}
                                                  authToken={this.state.authToken}/>}
                        </Stack.Screen>
                        <Stack.Screen name="Reports" options={{title: "Rapports"}}>
                            {props => <ConsultationsScreen {...props} user={this.state.user} base={this.state.base}
                                                           authToken={this.state.authToken}/>}
                        </Stack.Screen>
                        <Stack.Screen name="Logout" options={{title: "Déconnexion"}}>
                            {props => <LogoutScreen {...props} user={this.state.user} base={this.state.base}
                                                 disconnect={this.disconnect}/>}
                        </Stack.Screen>
                        <Stack.Screen name="ActionsInShift" options={{title: "Actions"}}>
                            {props => <ActionsInShiftScreen {...props} authToken={this.state.authToken}/>}
                        </Stack.Screen>
                    </Stack.Navigator>
                )}
            </NavigationContainer>
        );
    }
}
