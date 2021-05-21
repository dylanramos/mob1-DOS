import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, View,} from 'react-native';
import LoginForm from "./components/LoginForm";

export default function App() {

    return (
        <View style={styles.container}>
            <StatusBar style="auto"/>
            <LoginForm/>
        </View>
    );
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
