import React, { Component } from 'react'
import {
    View,
    DrawerLayoutAndroid,
    Dimensions,
    StyleSheet
} from 'react-native'
import {
    Icon,
    NavigationBar,
    Title,
    ListView,
    Caption,
    Subtitle,
    Row,
    Image,
    Screen,
    Divider,
    Text,
    TouchableOpacity,
    Spinner,
    Button
} from '@shoutem/ui'
import { connect } from 'react-redux'
import { authenticate } from '../Redux/Actions/Auth'
import * as firebase from "firebase"
import AsyncStorage from '@react-native-community/async-storage'

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height

class HomeScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            contacts: [],
            test:[],
            isLoading: true
        }
    }

    async componentDidMount(){
        await this.getUserData()
        this.getContactList()
    }

    async signOut(){
        await firebase.auth().signOut()
        this.props.navigation.replace('Login')
    }

    async getUserData(){

        const userDataFromStorage = await AsyncStorage.getItem('@user')
        const userData = JSON.parse(userDataFromStorage)

        await this.props.dispatch(authenticate({
            uid: userData.uid,
            email: userData.email,
            emailVerified: userData.emailVerified,
            fullname: userData.fullname,
            phone: userData.phone,
            status: userData.status,
            username: userData.username,
            avatar: userData.avatar,
            token: userData.token
        }))
    }

    async getContactList(){
        
        this.setState({
            isLoading: true
        })

        await firebase.database().ref('contacts/' + this.props.auth.user.username).on('value', (data) => {
            const contactObject = data.val()

            let contactList = []

            data.forEach((val, key) => {
                contactList.push(JSON.parse(JSON.stringify(val)))
            })

            this.setState({
                contacts: contactList,
                isLoading: false
            })
        })
    }

    openDrawer() {
        this.refs['drawer'].openDrawer();
    }

    __renderContact(contact, navigate) {
        if (!contact) {
            return null;
        }

        return (
            <View>
                <TouchableOpacity onPress={() => navigate('Chat', {
                    username: contact.username,
                    fullname: contact.fullname,
                    avatar: contact.avatar,
                    status: contact.status,
                    phone: contact.phone,
                    token: contact.token
                })}>
                    <Row>
                        <Image
                            style={{ borderRadius: 65 }}
                            styleName="small"
                            source={{ uri: contact.avatar }}
                        />
                        <View styleName="vertical stretch space-between">
                            <Subtitle>{contact.fullname}</Subtitle>
                            <Text numberOfLines={1}>online</Text>
                            <Caption numberOfLines={1}>{contact.status}</Caption>
                        </View>
                        <Icon style={{ marginLeft: 'auto' }} name="right-arrow" />
                    </Row>
                </TouchableOpacity>
                <Divider styleName="line" />
            </View>
        );
    }

    __renderDrawer() {
        return (
            <View style={{ padding: 12 }}>
                <View style={styles.drawerProfile}>
                    <Image
                        style={{ borderRadius: 65, width: 90, height: 90 }}
                        source={{ uri: this.props.auth.user.avatar }}
                    />
                    <View style={{ padding: 12 }}>
                        <Title>{this.props.auth.user.fullname}</Title>
                        <Subtitle>@{this.props.auth.user.username}</Subtitle>
                        <Caption>{this.props.auth.user.status}</Caption>
                    </View>
                </View>
                <Button onPress={() => this.props.navigation.navigate('AddContact')}>
                    <Row styleName="small">
                        <Icon name="add-friend" />
                        <Text>Add contacts</Text>
                    </Row>
                </Button>
                <Divider styleName="line" />
                <Button onPress={() => this.props.navigation.navigate('Setting')}>
                    <Row styleName="small">
                        <Icon name="settings" />
                        <Text>Settings</Text>
                    </Row>
                </Button>
                <Divider styleName="line" />
                <Button onPress={() => this.signOut()}>
                    <Row styleName="small">
                        <Icon name="exit-to-app" />
                        <Text>Sign out</Text>
                    </Row>
                </Button>
            </View>
        )
    }

    __renderContactList(navigate){
        if (this.state.isLoading) {
            return(
                <Spinner style={{ marginTop: SCREEN_HEIGHT * 0.4 }} />
            )
        }else{
            return(
                <ListView
                    autoHideHeader={true}
                    data={this.state.contacts}
                    renderRow={(contact) => this.__renderContact(contact, navigate)}
                />
            )
        }
    }

    render() {
        const {navigate} = this.props.navigation
        return (
            <Screen>

                <DrawerLayoutAndroid
                    ref="drawer"
                    drawerWidth={SCREEN_WIDTH * 0.8}
                    drawerPosition={DrawerLayoutAndroid.positions.Left}
                    renderNavigationView={() => this.__renderDrawer()}>

                    <NavigationBar
                        styleName="inline"
                        leftComponent={
                            <Button onPress={() => this.openDrawer()}>
                                <Icon name="sidebar" />
                            </Button>
                        }
                        rightComponent={
                            <Button onPress={() => alert('Up Coming gan..')}>
                                <Icon name="search" />
                            </Button>
                        }
                        centerComponent={<Title>MORSE</Title>}
                    />

                    {this.__renderContactList(this.props.navigation.navigate)}

                </DrawerLayoutAndroid>


            </Screen>
        )
    }
}

const styles = StyleSheet.create({
    drawerProfile: {
        flexDirection: 'row',
        marginBottom: 12
    }
})

const mapStateToProps = state => {
    return {
        auth: state.Auth
    }
}

export default connect(mapStateToProps)(HomeScreen)