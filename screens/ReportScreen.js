import React from "react";
import {View, Text, Button, StyleSheet, FlatList} from "react-native";
import axios from "axios";
import ServerUrl from "../ServerUrl";
import NovaCheckForm from "../components/NovaCheckForm";

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nova: [],
            pharma: [],
            novaButtonDisabled: true,
        }
    }

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
                <Text>Faire un</Text>
                <Button title="PharmaCheck" color="#326fa8" disabled={this.state.novaButtonDisabled}
                        onPress={this.handleTabChange}/>
                <Button title="NovaCheck" color="#326fa8" disabled={!this.state.novaButtonDisabled}
                        onPress={this.handleTabChange}/>
                <Text>à {this.props.base.name}</Text>
                <View>
                    {this.state.novaButtonDisabled ? (
                        <FlatList
                            data={this.state.nova}
                            renderItem={({item}) => (<NovaCheckForm novaCheck={item}/>)}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    ) : (
                        <FlatList
                            data={this.state.pharma}
                            renderItem={({item}) => (<Text>{item.id}</Text>)}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    )}
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
});