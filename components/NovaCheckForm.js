import React from "react";
import {View, Text, Button, TextInput, StyleSheet} from "react-native";
import axios from "axios";
import ServerUrl from "../ServerUrl";

export default class NovaCheckForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            start: this.props.novaCheck.start || 0,
            end: this.props.novaCheck.end || 0,
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
    }

    /**
     * Make an api call to submit the form
     */
    submitForm = () => {
        axios.post(`${ServerUrl}novacheck`, {
            nova_id: this.props.novaCheck.nova_id,
            drug_id: this.props.novaCheck.drug_id,
            drugsheet_id: this.props.novaCheck.drugsheet_id,
            date: this.props.novaCheck.date,
            start: this.state.start,
            end: this.state.end,
        }, {
            headers: {
                'Authorization': `Bearer ${this.props.authToken}`
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>De {this.props.novaCheck.drug} de la nova {this.props.novaCheck.nova}</Text>
                <Text>pour le {this.props.novaCheck.date}</Text>
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