import React from "react";
import {View, Text, FlatList} from "react-native";
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
        axios.get(`${ServerUrl}myactionsinshift/${this.props.route.params}`, {
            headers: {
                'Authorization': `Bearer ${this.props.authToken}`
            }
        }).then(res => {
            this.setState({actions: [...res.data.data]})
            console.log(this.state.actions)
        })
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.actions}
                    renderItem={({item}) => (<Text>{item.action} - {item.at}</Text>)}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
        )
    }
}