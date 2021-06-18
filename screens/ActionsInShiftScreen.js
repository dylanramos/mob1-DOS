import React from "react";
import {View, Text, FlatList, StyleSheet} from "react-native";
import axios from "axios";
import ServerUrl from "../ServerUrl";

export default class ActionsInShiftScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            actions: [],
        }
    }

    /**
     * Load the actions using the api
     */
    componentDidMount() {
        axios.get(`${ServerUrl}myactionsinshift/${this.props.route.params.itemId}`, {
            headers: {
                'Authorization': `Bearer ${this.props.authToken}`
            }
        }).then(res => {
            this.setState({actions: [...res.data.data]}, () => console.log(this.state.actions))
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Dans le rapport
                    du {this.props.route.params.itemDate} à {this.props.route.params.itemBase}</Text>
                <View style={styles.itemsContainer}>
                    <FlatList
                        data={this.state.actions}
                        renderItem={({item}) => (<View style={styles.item}>
                                <Text style={styles.itemTitle}>{item.action}</Text>
                                <Text>{item.at}</Text>
                            </View>
                            )}
                        keyExtractor={item => item.id.toString()}
                    />
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
    },
    title: {
        fontSize: 15,
        fontWeight: "bold",
    },
    itemsContainer: {
        marginTop: 20,
    },
    item: {
        marginBottom: 20,
    },
    itemTitle: {
        color: "#326fa8",
    }
});