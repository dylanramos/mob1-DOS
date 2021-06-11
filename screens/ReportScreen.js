import React from "react";
import {View, Text, Button, StyleSheet} from "react-native";

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <text>Faire un</text>
                <Button title="PharmaCheck" color="#326fa8"/>
                <Button title="NovaCheck" color="#326fa8"/>
                <Text>à {this.props.base}</Text>
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
        alignItems: "center",
    },
});