import React, { Component } from 'react'
import {
    View,
    DrawerLayoutAndroid,
    ScrollView,
    Dimensions,
    StyleSheet
} from 'react-native'
import {
    Icon,
    Caption,
    Row,
    Image,
    Screen,
    Text,
    Heading,
    TextInput,
    Spinner,
    Button
} from '@shoutem/ui'

import { connect } from 'react-redux'
import * as firebase from "firebase"
import AsyncStorage from '@react-native-community/async-storage'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { GoogleSignin } from '@react-native-community/google-signin'
import PushNotification from 'react-native-push-notification'

const SCREEN_WIDTH = Dimensions.get('window').width

class LoginScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            isLoading: false
        }
    }

    logginWithEmail(){
        
        this.setState({
            isLoading: true
        })

        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then( async (res) => {

            const userRef = 'users/' + res.user.displayName
            
            await PushNotification.configure({
                onRegister: async (token) => {
                    
                    await firebase.database().ref(userRef).update({
                        token
                    })

                }
            })

            await firebase.database().ref(userRef).once('value', async (data) => {
                const userData = data.val()

                const cacheUserToStorage = {
                    uid: res.user.uid,
                    email: res.user.email,
                    emailVerified: res.user.emailVerified,
                    fullname: userData.fullname,
                    phone: userData.phone,
                    status: userData.status,
                    username: userData.username,
                    avatar: userData.avatar,
                    token: userData.token
                }

                await AsyncStorage.setItem('@user', JSON.stringify(cacheUserToStorage))

                this.setState({
                    isLoading: false
                })
                
                this.props.navigation.replace('Home')
            })
        })
        .catch((err) => {
            console.log(err.message)
            alert(err.message)
            this.setState({
                isLoading: false
            })
        })
    }

    async loginWithGoogle(){
        await GoogleSignin.configure()
        GoogleSignin.signIn()
        .then(async(data) => {
            const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
            await firebase.auth().signInWithCredential(credential)
            this.props.navigation.replace('Home')
        })
        .catch((error) => {
            const { code, message } = error;
            console.log(message)
            // For details of error codes, see the docs
            // The message contains the default Firebase string
            // representation of the error
        });
    }

    __renderButtonSignIn(){
        if (this.state.isLoading) {
            return(
                <Spinner style={{ marginTop: 12 }} />
            )
        }else{
            return(
                <Button styleName="secondary" style={{ marginTop: 12 }} onPress={() => this.logginWithEmail()}>
                    <Text>SIGN IN</Text>
                </Button>
            )
        }
    }

    render() {
        return (
            <Screen style={{ backgroundColor: '#fff' }}>
                <ScrollView>
                    <Image
                        source={require('../Assets/Images/login.png')}
                        style={styles.imageHeader}
                    />
                    <View style={styles.container}>
                        <View style={styles.alignCenter}>
                            <Heading>Welcome</Heading>
                            <Caption styleName="h-center">Morse is App chat with Simple ui design, make you easier to use</Caption>
                        </View>

                        <View style={styles.authInput}>
                            <TextInput
                                placeholder={'Email address'}
                                value={this.state.email}
                                onChangeText={(val) => this.setState({ email: val })}
                            />
                            <TextInput
                                placeholder={'********'}
                                value={this.state.password}
                                secureTextEntry
                                onChangeText={(val) => this.setState({ password: val })}
                            />
                            
                            {this.__renderButtonSignIn()}

                            <Row style={{ marginTop: 12, justifyContent: 'center' }}>
                                <Button onPress={() => this.loginWithGoogle()}>
                                    <FontAwesomeIcon name="google" color="#000" size={20} style={{ marginRight: 8 }} />
                                    <Text>Google </Text>
                                </Button>
                                <Button>
                                    <Icon name="facebook" />
                                    <Text>Facebook </Text>
                                </Button>
                            </Row>

                            <Button styleName="clear" style={{ marginTop: 6 }} onPress={() => this.props.navigation.replace('Register')}>
                                <Text>Don't have account ? register here..</Text>
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </Screen>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        marginTop: 12
    },
    imageHeader: {
        width: SCREEN_WIDTH * 0.7,
        height: SCREEN_WIDTH * 0.45,
        marginTop: 12, alignSelf: 'center'
    },
    alignCenter: {
        alignItems: 'center',
    },
    authInput: {
        marginTop: 12,
        padding: 18,
        backgroundColor: '#f5f5f5'
    }
})

const mapStateToProps = state => {
    return { 
        auth: state.Auth
    }
}

export default connect(mapStateToProps)(LoginScreen)