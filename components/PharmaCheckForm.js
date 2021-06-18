import React from "react";
import {View, Text, Button, TextInput, StyleSheet, Alert} from "react-native";
import axios from "axios";
import ServerUrl from "../ServerUrl";

export default class PharmaCheckForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            start: this.props.pharmaCheck.start || 0,
            end: this.props.pharmaCheck.end || 0,
            submitButtonDisabled: true,
        }
    }

    /**
     * Update the state of the input
     * @param input
     * @param value
     */
    handleTextInputChange(input, value) {
        this.setState({
            [input]: value ? parseInt(value) : 0,
        }, this.changeButtonState)
    }

    /**
     * Enable or disable the submit button
     */
    changeButtonState = () => {
        if (this.state.start > 0 && this.state.end > 0)
            this.setState({
                submitButtonDisabled: false
            })
        else
            this.setState({
                submitButtonDisabled: true
            })
    }

    /**
     * Make an api call to submit the form
     */
    submitForm = () => {
        axios.post(`${ServerUrl}pharmacheck`, {
            batch_id: this.props.pharmaCheck.batch_id,
            drugsheet_id: this.props.pharmaCheck.drugsheet_id,
            date: this.props.pharmaCheck.date,
            start: this.state.start,
            end: this.state.end,
        }, {
            headers: {
                'Authorization': `Bearer ${this.props.authToken}`
            }
        })

        this.displayAlert()
    }

    /**
     * Display an alert saying that the form has been sent
     */
    displayAlert = () => {
        // Browser
        alert("Le rapport a bien été envoyé.")
        // Mobile
        Alert.alert("Rapport","Le rapport a bien été envoyé.", [{text: "OK"}])
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Du lot {this.props.pharmaCheck.batch_number} de {this.props.pharmaCheck.drug}</Text>
                <Text>pour le {this.props.pharmaCheck.date}</Text>
                <Text style={styles.title}>Matin:</Text><TextInput style={styles.textInput}
                                                                   keyboardType="numeric"
                                                                   value={this.state.start !== null ? this.state.start : ""}
                                                                   onChangeText={(value) => this.handleTextInputChange("start", value)}/>
                <Text style={styles.title}>Soir:</Text><TextInput style={styles.textInput}
                                                                  keyboardType="numeric"
                                                                  value={this.state.end !== null ? this.state.end : ""}
                                                                  onChangeText={(value) => this.handleTextInputChange("end", value)}/>
                <Button title="Envoyer" color="#326fa8" onPress={this.submitForm}
                        disabled={this.state.submitButtonDisabled}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        maxWidth: 480,
        backgroundColor: "#d6d4ce",
        padding: 10,
        margin: 10,
        alignItems: "center",
    },
    title: {
        fontSize: 15,
        fontWeight: "bold",
    },
    textInput: {
        width: 30,
        backgroundColor: "#ffffff",
    }
});