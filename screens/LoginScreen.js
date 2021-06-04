import React from 'react';
import {Button, Text, TextInput, View, Picker, StyleSheet} from "react-native";
import axios from "axios";
import ServerUrl from "../ServerUrl"
import ErrorMessage from "../components/ErrorMessage";

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bases: [],
            buttonDisabled: true,
            initials: null,
            password: null,
            base: null,
            showErrorMessage: false,
        };
    }

    /**
     * Load the bases using the api
     */
    componentDidMount() {
        axios.get(`${ServerUrl}bases`)
            .then(res => {
                this.setState({bases: res.data})

                //Set the first base as default
                this.handlePickerChange(this.state.bases[0].name)
            })
    }

    /**
     * Update the state of the text input and the submit button
     * @param input
     * @param value
     */
    handleTextChange(input, value) {
        this.setState(
            {
                [input]: value,
            },
            this.changeButtonState
        );
    }

    /**
     * Update the state of the picker
     * @param value
     */
    handlePickerChange = (value) => {
        this.setState(
            {
                base: value
            }
        )
    }

    /**
     * Enable or disable the submit button
     */
    changeButtonState = () => {
        if (this.state.initials !== "" && this.state.password !== "")
            this.setState({buttonDisabled: false})
        else
            this.setState({buttonDisabled: true})
    }

    /**
     * Authenticate or not after submitting form
     */
    submitForm = () => {
        axios.post(`${ServerUrl}gettoken`, {
            initials: this.state.initials,
            password: this.state.password,
        })
            .then((response) => {
                this.setState({showErrorMessage: false})
                this.props.authenticate(this.state.initials, this.state.base, response.data.token)
            })
            .catch(() => {
                this.setState({showErrorMessage: true})
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.form}>
                    <Text style={styles.title}>Connexion</Text>
                    {this.state.showErrorMessage ?
                        <ErrorMessage message={"Les données entrées sont incorrectes"}/> : null}
                    <TextInput style={styles.input} placeholder="Initiales" autoFocus={true}
                               onChangeText={(value) => this.handleTextChange("initials", value)}/>
                    <TextInput style={styles.input} placeholder="Mot de passe" secureTextEntry={true}
                               onChangeText={(value) => this.handleTextChange("password", value)}/>
                    <Picker style={styles.picker} onValueChange={this.handlePickerChange}>
                        {this.state.bases.map(base => <Picker.Item key={base.id} label={base.name} value={base.name}/>)}
                    </Picker>
                    <Button title="Connexion" color="#326fa8" disabled={this.state.buttonDisabled}
                            onPress={this.submitForm}/>
                </View>
            </View>
        );
    }
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
    form: {
        width: "75%",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        height: 40,
        width: "100%",
        borderBottomWidth: 1,
        borderBottomColor: "black",
        marginBottom: 20,
    },
    picker: {
        width: "100%",
        marginBottom: 20,
    }
});
