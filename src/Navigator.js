import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import HomeScreen from './Screens/HomeScreen'
import ProfileScreen from './Screens/ProfileScreen'
import ChatScreen from './Screens/ChatScreen'
import LoginScreen from './Screens/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen'
import LoadingScreen from './Screens/LodingScreen'
import AddContactScreen from './Screens/AddContactScreen'


const AppNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen
    },
    Chat: {
        screen: ChatScreen
    },
    Profile: {
        screen: ProfileScreen
    },
    AddContact: {
        screen: AddContactScreen
    },
    Login: {
        screen: LoginScreen
    },
    Register: {
        screen: RegisterScreen
    },
    Loading: {
        screen: LoadingScreen
    }
}, {
    initialRouteName: 'Loading',
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
}
)

const Navigator = createAppContainer(AppNavigator)

export default Navigator