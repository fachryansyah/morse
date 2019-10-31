import React, { Component } from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import {
    Icon,
    View,
    Caption,
    Row,
    Image,
    Screen,
    Text,
    Heading,
    TextInput,
    Spinner,
    Divider,
    Subtitle,
    TouchableOpacity,
    ListView,
    Title,
    NavigationBar,
    Button
} from '@shoutem/ui'
import { connect } from 'react-redux'
import * as firebase from "firebase"

const SCREEN_WIDTH = Dimensions.get('window').get

class AddContactScreen extends Component {

    constructor(props){
        super(props)
        this.state = {
            search: '',
            searchResults: []
        }
    }

    async addToContact(data){
        await firebase.database().ref('contacts/' + this.props.auth.user.username + '/' + data.username).set(data)
        alert('added to contact list')
        this.props.navigation.replace('Home')
    }

    async findUser(){
        firebase.database().ref('users/' + this.state.search).on('value', async (data) => {
            const userData = data.val()

            this.setState({
                searchResults: [userData]
            })
        })
    }

    __renderSearchResult(searchResult, navigate) {
        if (!searchResult) {
            return null;
        }

        return (
            <View>
                <TouchableOpacity onPress={() => this.addToContact(searchResult)}>
                    <Row>
                        <Image
                            style={{ borderRadius: 65 }}
                            styleName="small"
                            source={{ uri: searchResult.avatar }}
                        />
                        <View styleName="vertical stretch space-between">
                            <Subtitle>{searchResult.fullname}</Subtitle>
                            <Text numberOfLines={1}>@{searchResult.username}</Text>
                            <Caption numberOfLines={1}>{searchResult.status}</Caption>
                        </View>
                        <Icon style={{ marginLeft: 'auto' }} name="right-arrow" />
                    </Row>
                </TouchableOpacity>
                <Divider styleName="line" />
            </View>
        );
    }

    render(){
        const {navigate} = this.props.navigation
        return(
            <Screen>
                <NavigationBar
                    styleName="inline"
                    leftComponent={
                        <Button onPress={() => this.props.navigation.goBack(null)}>
                            <Icon name="back" />
                        </Button>
                    }
                    centerComponent={<Title>ADD CONTACT</Title>}
                />
                <View style={{ backgroundColor: '#f5f5f5' }}>
                    <View styleName="horizontal">
                        <TextInput
                            placeholder={'Find by username'}
                            value={this.state.search}
                            style={{ width: '83%' }}
                            onChangeText={(val) => this.setState({ search: val })}
                        />
                        <Button styleName="secondary" style={{ height: '100%' }} onPress={() => this.findUser()}>
                            <Text>FIND</Text>
                        </Button>
                    </View>
                    
                    <ListView
                        autoHideHeader={true}
                        data={this.state.searchResults}
                        renderRow={(searchResult) => this.__renderSearchResult(searchResult, navigate)}
                    />

                </View>

            </Screen>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.Auth
    }
}

export default connect(mapStateToProps)(AddContactScreen)