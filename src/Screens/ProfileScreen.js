import React, { Component } from 'react'
import { Alert, ScrollView, ToastAndroid } from 'react-native'
import {
    Icon,
    View,
    NavigationBar,
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
    Button,
    Heading,
    Lightbox
} from '@shoutem/ui'
import { connect } from 'react-redux'
import * as firebase from 'firebase'

class ProfileScreen extends Component {

    __renderProfilePic(){
        return(
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Image
                    source={{uri: this.props.navigation.getParam('avatar')}}
                    styleName="large"
                />
            </View>
        )
    }

    async removeContact(){
        await firebase.database().ref('contacts/' + this.props.auth.user.username + '/' + this.props.navigation.getParam('username'))
        .remove()
        ToastAndroid.show('Contact has been remove!', ToastAndroid.LONG)
        this.props.navigation.replace('Home')
    }

    render(){
        return(
            <Screen>
                <Lightbox renderContent={() => this.__renderProfilePic()}>
                    <ImageBackground
                        source={{uri: this.props.navigation.getParam('avatar')}}
                        styleName="large"
                    >
                        <Overlay styleName="fill-parent image-overlay">
                            <NavigationBar
                                styleName="clear"
                                leftComponent={
                                    <Button onPress={() => this.props.navigation.goBack(null)}>
                                        <Icon name="back" style={{ color: '#fff' }} />
                                    </Button>
                                }
                            />
                            <Heading styleName="sm-gutter-horizontal">{this.props.navigation.getParam('fullname')}</Heading>
                            <Subtitle>@{this.props.navigation.getParam('username')}</Subtitle>
                        </Overlay>
                    </ImageBackground>
                </Lightbox>
                
                <ScrollView>
                    <View style={{ paddingHorizontal: 12, marginVertical: 12 }}>
                        <Subtitle>Status</Subtitle>
                        <Text>{this.props.navigation.getParam('status')}</Text>
                    </View>

                    <Button>
                        <Row styleName="small">
                            <Icon name="notifications" />
                            <Text>Mute notification</Text>
                        </Row>
                    </Button>
                    <Divider styleName="line" />
                    <Button>
                        <Row styleName="small">
                            <Icon name="address" />
                            <Text>Find location</Text>
                        </Row>
                    </Button>
                    <Divider styleName="line" />
                    <Button onPress={() => {
                        Alert.alert(
                            'Remove This Contact',
                            'Are you sure want to remove this contact ?',
                            [
                              {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                              },
                              {text: 'OK', onPress: () => this.removeContact()},
                            ],
                            {cancelable: false},
                        );
                    }}>
                        <Row styleName="small">
                            <Icon name="close" />
                            <Text>Remove contact</Text>
                        </Row>
                    </Button>
                </ScrollView>
            </Screen>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.Auth
    }
}

export default connect(mapStateToProps)(ProfileScreen)