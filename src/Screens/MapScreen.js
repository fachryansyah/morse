import React, { Component } from 'react'
import { connect } from 'react-redux'
import {StyleSheet, View, ToastAndroid, Alert} from 'react-native'
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'
import * as firebase from 'firebase'
import Geolocation from '@react-native-community/geolocation'

class MapScreen extends Component {

    constructor(props){
        super(props)
        this.state = {
            latitude: -6.620495,
            longitude: 106.81849833333332,
            username: ''
        }
    }

    componentDidMount(){
        // Geolocation.getCurrentPosition(
        //     info => {
        //         this.setState({
        //             latitude: info.coords.latitude,
        //             longitude: info.coords.longitude
        //         })
        //     },
        //     error => {
        //         Alert.alert('Error', JSON.stringify(error))
        //     },
        //     {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        // )

        const location = this.props.navigation.getParam('location')
        const username = this.props.navigation.getParam('username')

        if (location) {
            const parseLocation = JSON.parse(JSON.stringify(location))
            this.setState({
                latitude: parseLocation.latitude,
                longitude: parseLocation.longitude,
                username
            })
        }
    }

    componentWillUnmount(){
        firebase.database().ref(`locations/${this.state.username}/`).remove()
    }

    render(){
        return(
            <MapView // remove if not using Google Maps
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                showsUserLocation={true}
                showsMyLocationButton={false}
                zoomEnabled = {true}
                region={{
                    latitude: this.state.latitude,
                    longitude: this.state.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                    }}
                    title="Stark"
                    description="STark industries"
                />
            </MapView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
        height: 400,
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
})

const mapStateToProps = state => {
    return {
        auth: state.Auth
    }
}

export default connect(mapStateToProps)(MapScreen)