import React from "react";
import {View, Button, StyleSheet} from "react-native";
import axios from "axios";
import ServerUrl from "../ServerUrl";

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showWorkTimesButton: true,
            workTimesNumberToConfirm: 0
        }
    }

    /**
     * Make an api call to get all the unconfirmed work plans
     */
    componentDidMount() {
        axios.get(`${ServerUrl}unconfirmedworkplans`, {
            headers: {
                'Authorization': `Bearer ${this.props.authToken}`
            }
        }).then(res => {
            // Hide button when there is no data
            if (res.data < 1)
                this.setState({
                    showWorkTimesButton: false,
                })

            this.setState({
                workTimesNumberToConfirm: res.data.length
            })
        }).catch(() => {
            this.setState({
                showWorkTimesButton: false,
            })
        })
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
                    {this.state.showWorkTimesButton ? (
                        <View style={styles.buttonContainer}>
                            <Button title={`${this.state.workTimesNumberToConfirm} Horaires à confirmer`} color="#326fa8"
                                    onPress={() => this.props.navigation.navigate("WorkTimesToConfirm")}/>
                        </View>
                    ) : null}
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