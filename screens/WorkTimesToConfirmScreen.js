import React from "react";
import {View, Text, FlatList, StyleSheet} from "react-native";
import axios from "axios";
import ServerUrl from "../ServerUrl";
import ErrorMessage from "../components/ErrorMessage";
import WorkTimeToConfirmForm from "../components/WorkTimeToConfirmForm"

export default class WorkTimesToConfirmScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showErrorMessage: false,
            showNoWorkTimesToConfirmMessage: false,
            workTimesToConfirm: null,
            workTimesNumberToConfirm: 0,
        }
    }

    /**
     * Make an api call to get all the unconfirmed work plans
     */
    componentDidMount() {
        axios.get(`${ServerUrl}unconfirmedworkplans`, {
            headers: {
                'Authorization': `Bearer ${this.props.authToken}`
            }
        }).then(res => {
            // To show a message when there is no data
            if (res.data < 1)
                this.setState({
                    showNoWorkTimesToConfirmMessage: true,
                })

            this.setState({
                workTimesToConfirm: res.data,
                workTimesNumberToConfirm: res.data.length,
            })
        }).catch(() => {
            this.setState({
                showErrorMessage: true,
            })
        })
    }

    /**
     * Remove the confirmed work time from the array (to rerender)
     * @param workTimeId
     */
    removeConfirmedWorkTime = (workTimeId) => {
        let newWorkTimesToConfirm = [...this.state.workTimesToConfirm]
        let index = newWorkTimesToConfirm.indexOf(workTimeId)

        if (index !== -1) {
            newWorkTimesToConfirm.splice(index, 1)
            this.setState({
                workTimesToConfirm: newWorkTimesToConfirm,
            }, () => console.log(this.state.workTimesToConfirm))
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.showErrorMessage ? (
                    <ErrorMessage message={"Une erreur est survenue veuillez vérifier votre connexion internet."}/>
                ) : (
                    <View>
                        {this.state.showNoWorkTimesToConfirmMessage ? (
                            <Text>Vous avez confirmé tous vos horaires.</Text>
                        ) : (
                            <View>
                                <Text style={styles.blueText}>Il reste {this.state.workTimesNumberToConfirm} horaires à
                                    confirmer</Text>
                                <FlatList
                                    data={this.state.workTimesToConfirm}
                                    renderItem={({item}) => (
                                        <WorkTimeToConfirmForm workTime={item} authToken={this.props.authToken}
                                                               removeConfirmedWorkTime={this.removeConfirmedWorkTime}/>)}
                                    keyExtractor={item => item.id.toString()}
                                />
                            </View>
                        )}
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
        justifyContent: "center",
        textAlign: "center"
    },
    blueText: {
        color: "#326fa8",
    }
});