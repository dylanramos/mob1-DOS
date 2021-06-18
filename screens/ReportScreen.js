import React from "react";
import {View, Text, Button, StyleSheet, FlatList} from "react-native";
import axios from "axios";
import ServerUrl from "../ServerUrl";
import NovaCheckForm from "../components/NovaCheckForm";
import PharmaCheckForm from "../components/PharmaCheckForm";
import ErrorMessage from "../components/ErrorMessage";

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nova: [],
            pharma: [],
            novaButtonDisabled: true,
            showErrorMessage: false,
        }
    }

    /**
     * Make an api call to get all the missing checks
     */
    componentDidMount() {
        axios.get(`${ServerUrl}missingchecks/${this.props.base.id}`, {
            headers: {
                'Authorization': `Bearer ${this.props.authToken}`
            }
        }).then(res => {
            this.setState({
                nova: res.data.nova,
                pharma: res.data.pharma,
            })
        }).catch(() => {
            this.setState({showErrorMessage: true})
        })
    }

    /**
     * Change the button state to display the corresponding data
     */
    handleTabChange = () => {
        if (this.state.novaButtonDisabled)
            this.setState({
                novaButtonDisabled: false,
            })
        else
            this.setState({
                novaButtonDisabled: true,
            })
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.showErrorMessage ? (
                    <ErrorMessage message={"Une erreur est survenue veuillez vérifier votre connexion internet."}/>
                ) : (
                    <View>
                        <Text style={styles.title}>Faire un</Text>
                        <Button title="NovaCheck" color="#326fa8" disabled={this.state.novaButtonDisabled}
                                onPress={this.handleTabChange}/>
                        <Button title="PharmaCheck" color="#326fa8" disabled={!this.state.novaButtonDisabled}
                                onPress={this.handleTabChange}/>
                        <Text style={styles.title}>à {this.props.base.name}</Text>
                        <View>
                            {this.state.novaButtonDisabled ? (
                                <FlatList
                                    data={this.state.nova}
                                    renderItem={({item}) => (
                                        <NovaCheckForm novaCheck={item} authToken={this.props.authToken}/>)}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            ) : (
                                <FlatList
                                    data={this.state.pharma}
                                    renderItem={({item}) => (
                                        <PharmaCheckForm pharmaCheck={item} authToken={this.props.authToken}/>)}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            )}
                        </View>
                    </View>
                )}
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
        textAlign: "center",
    },
    title: {
        fontSize: 15,
        fontWeight: "bold",
    },
});