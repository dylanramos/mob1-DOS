import React from "react";
import {View, Text, FlatList, Button, StyleSheet} from "react-native";
import axios from "axios";
import ServerUrl from "../ServerUrl";
import ErrorMessage from "../components/ErrorMessage";

export default class ConsultationsScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            drugs: [],
            shifts: [],
            drugsButtonDisabled: true,
            showErrorMessage: false,
        }
    }

    /**
     * Load the reports using the api
     */
    componentDidMount() {
        axios.get(`${ServerUrl}reports`, {
            headers: {
                'Authorization': `Bearer ${this.props.authToken}`
            }
        }).then(res => {
            this.setState({
                drugs: res.data.drug,
                shifts: res.data.shift,
            })
        }).catch(() => {
            this.setState({
                showErrorMessage: true,
            })
        })
    }

    /**
     * Change the button state to display the corresponding data
     */
    handleTabChange = () => {
        if (this.state.drugsButtonDisabled)
            this.setState({
                drugsButtonDisabled: false,
            })
        else
            this.setState({
                drugsButtonDisabled: true,
            })
    }

    render() {
        return (
            this.state.showErrorMessage ? (
                <View style={styles.container}>
                    <ErrorMessage message={"Une erreur est survenue veuillez vérifier votre connexion internet."}/>
                </View>
            ) : (
                <View style={styles.container}>
                    <View style={styles.buttonsContainer}>
                        <Button title="Stup" color="#326fa8" disabled={this.state.drugsButtonDisabled}
                                onPress={this.handleTabChange}/>
                        <Button title="Garde" color="#326fa8" disabled={!this.state.drugsButtonDisabled}
                                onPress={this.handleTabChange}/>
                    </View>
                    <View style={styles.listContainer}>
                        {this.state.drugsButtonDisabled ? (

                            <FlatList
                                data={this.state.drugs}
                                renderItem={({item}) => (<View
                                    style={styles.itemContainer}>
                                    <Text style={styles.item}>Semaine {item.week} à {item.base}</Text>
                                </View>)}
                                keyExtractor={item => item.id.toString()}
                            />
                        ) : (
                            <FlatList
                                data={this.state.shifts}
                                renderItem={({item}) => (<View
                                    style={styles.itemContainer}>
                                    <Text style={styles.item}
                                          onPress={() => this.props.navigation.navigate("ActionsInShift", {
                                              itemId: item.id,
                                              itemDate: item.date,
                                              itemBase: item.base
                                          })}>Le {item.date} à {item.base}</Text>
                                </View>)}
                                keyExtractor={item => item.id.toString()}
                            />
                        )}
                    </View>
                </View>
            )
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
    buttonsContainer: {
        maxWidth: 480,
        flexDirection: "row",
    },
    listContainer: {
        marginTop: 20,
    },
    itemContainer: {
        borderWidth: 1,
        padding: 10,
        margin: 10,
        backgroundColor: "#326fa8",
    },
    item: {
        color: "#ffffff",
    }
});