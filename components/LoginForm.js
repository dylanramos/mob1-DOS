import React, {Component} from 'react';
import {Button, Text, TextInput, View, Picker} from "react-native";
import {StyleSheet} from "react-native";
import axios from "axios";
import ServerUrl from "../ServerUrl"

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bases: [],
        };
    }

    componentDidMount() {
        // Get the bases
        axios.get(`${ServerUrl}bases`)
            .then(res => {
                const bases = res.data;
                this.setState({bases: bases});
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Connexion</Text>
                <TextInput style={styles.input} placeholder="Nom d'utilisateur" autoFocus={true}/>
                <TextInput style={styles.input} placeholder="Mot de passe"/>
                <Picker style={styles.picker}>
                    {this.state.bases.map(base => <Picker.Item key={base.id} label={base.name} value={base.name}/>)}
                </Picker>
                <Button title="Connexion" color="#326fa8"/>
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