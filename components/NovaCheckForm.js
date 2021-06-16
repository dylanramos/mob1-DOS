import React from "react";
import {View, Text, Button, TextInput, StyleSheet} from "react-native";

export default class NovaCheckForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            start: this.props.novaCheck.start,
            end: this.props.novaCheck.end,
        }
    }

    /**
     * Update the state of the input
     * @param input
     * @param value
     */
    handleTextInputChange(input, value) {
        this.setState(
            {
                [input]: parseInt(value)
            }
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>De {this.props.novaCheck.drug} de la nova {this.props.novaCheck.nova}</Text>
                <Text>pour le {this.props.novaCheck.date}</Text>
                <Text style={styles.title}>Matin:</Text><TextInput style={styles.textInput}
                                                                   keyboardType="numeric"
                                                                   value={this.state.start ? `${this.state.start}` : ""}
                                                                   onChangeText={(value) => this.handleTextInputChange("start", value)}/>
                <Text style={styles.title}>Soir:</Text><TextInput style={styles.textInput}
                                                                  keyboardType="numeric"
                                                                  value={this.state.end ? `${this.state.end}` : ""}
                                                                  onChangeText={(value) => this.handleTextInputChange("end", value)}/>
                <Button title="Envoyer" color="#326fa8"/>
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