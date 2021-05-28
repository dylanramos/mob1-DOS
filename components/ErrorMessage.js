import React, {Component} from 'react';
import {StyleSheet, Text, View} from "react-native";

class ErrorMessage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: this.props.message
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{this.state.message}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "#d12c2c"
    }
});

export default ErrorMessage