import React, {Component} from 'react';
import {Button, Text, TextInput, View, Picker} from "react-native";
import {StyleSheet} from "react-native";
import axios from "axios";
import ServerUrl from "../ServerUrl"
import ErrorMessage from "./ErrorMessage";

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bases: [],
            buttonDisabled: true,
            initials: "",
            password: "",
            showErrorMessage: false,
        };
    }

    /**
     * Load the bases using the api
     */
    componentDidMount() {
        axios.get(`${ServerUrl}bases`)
            .then(res => {
                const bases = res.data;
                this.setState({bases: bases});
            })
    }

    /**
     * Update the state and change the submit button state
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
     * Enable or disable the submit button
     */
    changeButtonState = () => {
        if (this.state.initials !== "" && this.state.password !== "")
            this.setState({buttonDisabled: false})
        else
            this.setState({buttonDisabled: true})
    }

    /**
     * Authenticate or not after submiting form
     */
    submitForm = () => {
        axios.post(`${ServerUrl}gettoken`, {
            initials: this.state.initials,
            password: this.state.password,
        })
            .then((response) => {
                this.setState({showErrorMessage: false})
                localStorage.setItem("authToken", response.data.token)
            })
            .catch(() => {
                this.setState({showErrorMessage: true})
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Connexion</Text>
                {this.state.showErrorMessage ? <ErrorMessage message={"Les données entrées sont incorrectes"}/> : null}
                <TextInput style={styles.input} placeholder="Initiales" autoFocus={true}
                           onChangeText={(value) => this.handleTextChange("initials", value)}/>
                <TextInput style={styles.input} placeholder="Mot de passe" secureTextEntry={true}
                           onChangeText={(value) => this.handleTextChange("password", value)}/>
                <Picker style={styles.picker}>
                    {this.state.bases.map(base => <Picker.Item key={base.id} label={base.name} value={base.name}/>)}
                </Picker>
                <Button title="Connexion" color="#326fa8" disabled={this.state.buttonDisabled}
                        onPress={this.submitForm}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
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

export default LoginForm