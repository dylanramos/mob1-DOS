import React from "react";
import {View, Button} from "react-native";

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Button title="Rapports" color="#326fa8" onPress={() => this.props.navigation.navigate("Reports")}/>
                <Button title="Déconnexion" color="#326fa8" onPress={() => this.props.navigation.navigate("Logout")}/>
            </View>
        )
    }
}