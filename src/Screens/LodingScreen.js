import React, { Component } from 'react'
import * as firebase from "firebase"
import { connect } from 'react-redux'
import { authenticate } from '../Redux/Actions/Auth'

class LoadingScreen extends Component {
    componentWillMount(){
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
            <>
            </>
        )
    }
}

const mapStateToProps = state => {
    return{
        auth: state.Auth
    }
}

export default connect(mapStateToProps)(LoadingScreen)