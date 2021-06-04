import React from "react";
import {View, Text, FlatList} from "react-native";
import axios from "axios";
import ServerUrl from "../ServerUrl";

export default class ConsultationsScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            drugs: [],
            shifts: [],
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
        })
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.drugs}
                    renderItem={({item}) => (<Text>Le {item.date} à {item.base}</Text>)}
                    keyExtractor={item => item.id.toString()}
                />
                <FlatList
                    data={this.state.shifts}
                    renderItem={({item}) => (<Text>Le {item.date} à {item.base}</Text>)}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
        )
    }
}