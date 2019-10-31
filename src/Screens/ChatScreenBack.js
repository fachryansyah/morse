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
    Divider,
    Text,
    TouchableOpacity,
    ImageBackground,
    Overlay,
    Button
} from '@shoutem/ui'

class ChatScreenBack extends Component {

    constructor(props) {
        super(props)
        this.state = {
            message: '',
            messages: [
                {
                    _id: 1,
                    text: 'Hello developer',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },
            ],
            // messages:[
            //     {
            //         position: 'left',
            //         message: 'halo'
            //     },
            //     {
            //         position: 'right',
            //         message: 'iyaa..'
            //     },
            //     {
            //         position: 'left',
            //         message: 'lagi apa ?'
            //     },
            //     {
            //         position: 'right',
            //         message: 'galer'
            //     },
            //     {
            //         position: 'left',
            //         message: 'hah ?'
            //     },
            //     {
            //         position: 'left',
            //         message: 'paansi ?'
            //     },
            // ]
        }
    }

    __renderChatRight(message) {
        return (
            <View style={styles.chatRight}>
                <View style={styles.chatCardRight}>
                    <Text style={styles.chatTextRight}>{message.message}</Text>
                </View>
                <Caption>12:00</Caption>
            </View>
        )
    }

    __renderChatLeft(message) {
        return (
            <View style={styles.chatLeft}>
                <View style={styles.chatCardLeft}>
                    <Text>{message.message}</Text>
                </View>
                <Caption>12:00</Caption>
            </View>
        )
    }

    async pushMessage() {
        await this.setState({
            messages: [
                ...this.state.messages,
                { position: 'right', message: this.state.message }
            ]
        })
        this.setState({
            message: ''
        })
    }

    render() {
        const { navigate } = this.props.navigation

        return (
            <Screen style={{ flex: 1 }}>
                <ImageBackground
                    source={{ uri: 'https://i.ibb.co/mHK3chr/sakura-gun.jpg' }}
                    style={{ width: '100%', height: 70 }}
                >
                    <Overlay styleName="fill-parent image-overlay">
                        <NavigationBar
                            styleName="clear"
                            leftComponent={
                                <Button onPress={() => this.props.navigation.goBack(null)}>
                                    <Icon name="back" style={{ color: '#fff' }} />
                                </Button>
                            }
                            centerComponent={
                                <Title>Fahriansyah</Title>
                            }
                            rightComponent={
                                <Button onPress={() => this.props.navigation.navigate('Profile')}>
                                    <Icon name="about" style={{ color: '#fff' }} />
                                </Button>
                            }
                        />
                    </Overlay>
                </ImageBackground>

                <View style={{ flex: 1, marginTop: 12 }}>
                    <ListView
                        ref={ref => this.flatList = ref}
                        onContentSizeChange={() => this.flatList.scrollToEnd({ animated: true })}
                        style={{ flexGrow: 10 }}
                        data={this.state.messages}
                        renderRow={(message) => (
                            <View style={{ paddingHorizontal: 12 }}>
                                {message.position == 'right' ? this.__renderChatRight(message) : this.__renderChatLeft(message)}
                            </View>
                        )}
                    />
                </View>

                <View style={{ alignItems: 'center' }}>
                    <View styleName="horizontal">
                        <TextInput
                            placeholder={'message...'}
                            style={{ width: '85%' }}
                            value={this.state.message}
                            onChangeText={(val) => this.setState({ message: val })}
                        />
                        <Button styleName="secondary" style={{ height: "100%" }} onPress={() => this.pushMessage()}>
                            <Icon name="play" />
                        </Button>
                    </View>
                </View>

            </Screen>
        )
    }
}

const styles = StyleSheet.create({
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

export default ChatScreenBack