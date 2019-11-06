import React, { Component } from 'react'
import {View, Image, StyleSheet, Dimensions} from 'react-native'
import * as firebase from "firebase"
import { connect } from 'react-redux'
import { authenticate } from '../Redux/Actions/Auth'
import {Spinner, Text} from '@shoutem/ui'

const SCREEN_WIDTH = Dimensions.get('window').width

class LoadingScreen extends Component {
    componentDidMount(){
        firebase.auth().onAuthStateChanged( async (user) => {
            if (user) {
                console.log('user logged')

                this.props.dispatch(authenticate({
                    uuid: user.uid
                }))
                
                this.props.navigation.replace('Home')

            }else{
                this.props.navigation.replace('Login')
            }
        });
    }
    render(){
        return(
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Image source={require('../Assets/Images/splash.png')} style={styles.image} />
                <Text style={{ alignSelf: 'center', marginBottom: 18 }}>LAUNCHING..</Text>
                <Spinner />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    image:{
        width: SCREEN_WIDTH * 0.8,
        height: SCREEN_WIDTH * 0.5,
        marginBottom: 12,
        alignSelf: 'center'
    }
})

const mapStateToProps = state => {
    return{
        auth: state.Auth
    }
}

export default connect(mapStateToProps)(LoadingScreen)