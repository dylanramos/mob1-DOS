import React from "react";
import {View, Text, StyleSheet, TextInput, Button, Picker} from "react-native";
import axios from "axios";
import ServerUrl from "../ServerUrl";

export default class WorkTimeToConfirmForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            workTimeStatus: [{id: 0, name: "A discuter"}, {id: 1, name: "Confirmé"}],
            currentStatus: this.props.workTime.confirmation,
        }
    }

    /**
     * Update the work time status
     * @param value
     */
    handlePickerChange = (value) => {
        this.setState(
            {
                currentStatus: value
            }
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Text
                    style={styles.title}>Horaire {this.props.workTime.worktime.type} le {this.props.workTime.date}</Text>
                <View>
                    {this.state.currentStatus != null ? (
                        <View>
                            <Picker style={styles.picker} selectedValue={this.state.currentStatus}
                                    onValueChange={this.handlePickerChange}>
                                {this.state.workTimeStatus.map(status => <Picker.Item key={status.id}
                                                                                      label={status.name}
                                                                                      value={status.id}/>)}
                            </Picker>
                            <Text>Raison: </Text><TextInput style={styles.textInput}
                                                            value={this.props.workTime.reason != null ? this.props.workTime.reason : ""}/>
                        </View>
                    ) : (
                        <View>
                            <Picker style={styles.picker} selectedValue={""} onValueChange={this.handlePickerChange}>
                                <Picker.Item key={""} label={""} value={""}/>
                                {this.state.workTimeStatus.map(status => <Picker.Item key={status.id}
                                                                                      label={status.name}
                                                                                      value={status.id}/>)}
                            </Picker>
                        </View>
                    )}
                </View>
                <Button title="Envoyer" color="#326fa8" onPress={this.submitForm}
                        disabled={this.state.submitButtonDisabled}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: 300,
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
        width: "100%",
        backgroundColor: "#ffffff",
    },
    picker: {
        width: "100%",
        marginBottom: 20,
    }
});