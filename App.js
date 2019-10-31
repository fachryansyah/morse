/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react'
import {
  StatusBar,
} from 'react-native'

import { Provider } from 'react-redux'
import Store from './src/Redux/store'

import * as firebase from "firebase"

import Navigator from './src/Navigator'

import PushNotification from 'react-native-push-notification'

const config = {
  apiKey: "AIzaSyCngLBONP7ygZCQSzCqIVZircuvBNAzur0",
  authDomain: "morse-937ed.firebaseapp.com",
  databaseURL: "https://morse-937ed.firebaseio.com",
  storageBucket: "morse-937ed"
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}else{
  firebase.app()
}

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function(token) {
    console.log("TOKEN:", token);
  },
 
  // (required) Called when a remote or local notification is opened or received
  onNotification: function(notification) {
    console.log("NOTIFICATION:", notification);
 
    // process the notification
    PushNotification.localNotification({ 
      /* iOS and Android properties */
      title: notification.title, // (optional)
      message: notification.body, // (required)
      playSound: true, // (optional) default: true
      repeatType: 'day', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
      actions: '["Yes", "No"]',  // (Android only) See the doc for notification actions to know more
    })
  },
 
  // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
  senderID: "55502078067",
 
  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,
 
  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   */
  requestPermissions: true
});

const App: () => React$Node = () => {
  return (
    <>
      <Provider store={Store}>
        <StatusBar barStyle="light-content" />
        <Navigator />
      </Provider>
    </>
    
  );
};

export default App;
