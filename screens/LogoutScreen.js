import React from "react";
import {View, Text, Button, StyleSheet} from "react-native";

export default class LogoutScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{this.props.user}@{this.props.base.name}</Text>
                <Button title="Déconnexion" color="#cc2200" onPress={this.props.disconnect}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxWidth: 480,
        backgroundColor: "#f0f2f5",
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20,
    },
});