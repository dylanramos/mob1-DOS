import React from "react";
import {View, StyleSheet} from "react-native";
import LoginForm from "../components/LoginForm";

export default function LoginScreen({navigation}) {
    return (
        <View style={styles.container}>
            <LoginForm navigation={navigation}/>
        </View>
    )
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
});
