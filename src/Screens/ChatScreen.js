import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import {
    Icon,
    View,
    NavigationBar,
    Title,
    ListView,
    Caption,
    Subtitle,
    Row,
    Image,
    TextInput,
    Screen,
    Spinner,
    Divider,
    Text,
    TouchableOpacity,
    ImageBackground,
    Overlay,
    Button
} from '@shoutem/ui'
import Axios from 'axios'
import { connect } from 'react-redux'
import * as firebase from 'firebase'
import { GiftedChat } from 'react-native-gifted-chat'

class ChatScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            message: '',
            messages: [],
            isLoading: true,
            receiver: {}
        }
    }

    componentDidMount(){
        this.getDataReceiver()
        this.getMessages()
    }

    async getDataReceiver(){
        await firebase.database().ref('users/' + this.props.navigation.getParam('username')).once('value', (snapshot) => {
            this.setState({
                receiver: snapshot.val()
            })
        })
    }

    parseSnapshot(snapshot){
        const { createdAt: numberStamp, text, user } = snapshot.val();
        const { key: id } = snapshot;
        const { key: _id } = snapshot; //needed for giftedchat
        const createdAt = new Date(numberStamp);

        const message = {
            id,
            _id,
            createdAt,
            text,
            user,
        };
        return message;
    }

    refOn(callback){
        const reference = 'messages/' + this.props.navigation.getParam('username') + '/' + this.props.auth.user.username
        firebase.database().ref(reference).on('child_added', (snapshot) => callback(this.parseSnapshot(snapshot)))
        this.setState({
            isLoading: false
        })
    }

    getMessages(){
        this.refOn((message) => {
            this.setState((previousState) => ({
                messages: GiftedChat.append(previousState.messages, message),
            }))
        })
    }

    async onSend(messages = []) {

        const referenceFrom = 'messages/' + this.props.auth.user.username + '/' + this.props.navigation.getParam('username')
        const referenceTo = 'messages/' + this.props.navigation.getParam('username') + '/' + this.props.auth.user.username

        
        for (let i = 0; i < messages.length; i++) {
            const { text, user } = messages[i]
            user.avatar = this.props.auth.user.avatar,
            await firebase.database().ref(referenceFrom).push({
                text,
                user,
                createdAt: firebase.database.ServerValue.TIMESTAMP
            })
            await firebase.database().ref(referenceTo).push({
                text,
                user,
                createdAt: firebase.database.ServerValue.TIMESTAMP
            })

            console.log(this.props.navigation.getParam('token'))

            Axios.get('https://us-central1-morse-937ed.cloudfunctions.net/pushNotification?title=@' + this.props.auth.user.username + '&body=test&token=' + this.state.receiver.token.token)
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
        }

    }

    __renderChatAvatar(data){
        console.log(data.message)
    }

    __renderMessages(){
        if (this.state.isLoading) {
            return(
                <Spinner style={{ marginTop: 20 }} />
            )
        }else{
            return(
                <GiftedChat
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: this.props.auth.user.username,
                    }}
                />
            )
        }
    }

    render() {
        const { navigate } = this.props.navigation
        
        return (
            <Screen style={{ flex: 1, backgroundColor: '#fff' }}>

                <View style={styles.navbar}>
                    <View style={{ flex: 15, justifyContent:'center' }}>
                        <Button onPress={() => this.props.navigation.goBack(null)}>
                            <Icon name="back" />
                        </Button>
                    </View>
                    <View style={{ flex: 70, justifyContent:'center' }}>
                        <Title>{this.props.navigation.getParam('fullname')}</Title>
                    </View>
                    <View style={{ flex: 15, justifyContent:'center' }}>
                        <Button onPress={() => this.props.navigation.navigate('Profile', {
                            avatar: this.props.navigation.getParam('avatar'),
                            fullname: this.props.navigation.getParam('fullname'),
                            username: this.props.navigation.getParam('username'),
                            phone: this.props.navigation.getParam('phone'),
                            status: this.props.navigation.getParam('status')
                        })}>
                            <Icon name="about" />
                        </Button>
                    </View>
                </View>

                {this.__renderMessages()}

            </Screen>
        )
    }
}

const styles = StyleSheet.create({
    navbar: {
        height: 60,
        backgroundColor: '#fff',
        flexDirection: 'row',
        borderBottomColor: '#d1d1d1',
        borderBottomWidth: 0.5
    },
    container: {
        paddingHorizontal: 12,
        paddingVertical: 4
    },
    chatLeft: {

    },
    chatCardLeft: {
        padding: 8,
        backgroundColor: '#dbdbdb',
        alignSelf: 'flex-start',
        marginVertical: 4,
        borderRadius: 8,
        elevation: 6
    },
    chatRight: {
        marginLeft: 'auto'
    },
    chatCardRight: {
        padding: 8,
        backgroundColor: '#383838',
        alignSelf: 'flex-start',
        borderRadius: 8,
        marginVertical: 4,
        elevation: 6
    },
    chatTextRight: {
        color: '#fff'
    }
})

const mapStateToProps = state => {
    return {
        auth: state.Auth
    }
}

export default connect(mapStateToProps)(ChatScreen)