import React from "react";
import {View, Button, StyleSheet} from "react-native";

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <View style={styles.buttonContainer}>
                        <Button title="Consulter" color="#326fa8"
                                onPress={() => this.props.navigation.navigate("Consultation")}/>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button title="Rapporter" color="#326fa8"
                                onPress={() => this.props.navigation.navigate("Report")}/>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button title="Déconnexion" color="#326fa8"
                                onPress={() => this.props.navigation.navigate("Logout")}/>
                    </View>
                </View>
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
        justifyContent: "center",
    },
    buttonContainer: {
        marginBottom: 10,
    }
});