# Morse : Simple chat aplication made with React Native

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)
[![Code](https://camo.githubusercontent.com/65f7d034f575d55d73f27883473847130e1ead2e/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f436f64652532305374796c652d5374616e646172642d79656c6c6f772e737667)](https://standardjs.com)

<p align="center">
    <img title="dashboard" src="/demo.gif?raw=true" />
</p>

## Table Of Contents

*  [Intro](#Intro)
*  [Requirments](#Requirments)
*  [Related Projects](#Related-Projects)
*  [Dependencies](#Dependencies)
    *  [Clone Repo](#Clone-Repo)
    *  [Install Depedencies](#Install-Depedencies)
    *  [Setup Environment](#Setup-Environment)
    *  [Run server development](#Run-server-development)
    *  [Build For Production](#Build-For-Production)
* [Dependencies](#Dependencies)
* [License](#License)
___
### Intro

Morse is chat app with simple design make you easier to use, build with React Native and firebase.

___
### Features
- [x] Manage Contact
- [x] Realtime chat messaging
- [x] Simple UI Design
- [x] Share your location to friends
- [x] Push notification
- [x] Change profile name or status
- [x] Show friend profile
- [x] Simple to setup, just insert your firebase account to .env
___
### Requirments

* [Nodejs](https://nodejs.org/en/) v10 LTS version
* [Android SDK](https://developer.android.com/studio#downloads)
* [Npm](https://www.npmjs.com/get-npm) package / [Yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable) package
___

### Related Projects
This project is related to several platforms

* Cloud function [https://github.com/fachryansyah/point-of-sale-backend](https://github.com/fachryansyah/point-of-sale-backend)
___

### Installation

##### 1. Clone Repo
clone the repository

```sh
$ git clone https://github.com/fachryansyah/point-of-sale-frontend
$ cd point-of-sale-frontend
```

##### Install Depedencies
Install requirement depedencies

```sh
$ npm install
```

##### Setup Environment
Before project development or build for production, you should create new .env file, edit some variable to backend server. you can found the backend server here.. [https://github.com/fachryansyah/point-of-sale-backend](https://github.com/fachryansyah/point-of-sale-backend)

```sh
$ cp .env.example .env
```

```sh
API_KEY=<your-firebase-api-key>
AUTH_DOMAIN=<your-firebase-auth-domain>
DATABASE_URL=<your-firebase-database>
STORAGE_BUCKET=<your-firebase-storage-bucket>
```

##### Run on android device
if you want start on development mode.

```sh
$ react-native run android
```

##### Run on ios device
if you want start on development mode.

```sh
$ react-native run ios
```

##### Build For Production
build for production ready, and host ready

```sh
$ cd android && ./gradlew --assembleRelease
```
___

### Dependencies

List of depedencies using in this project

| Plugin | Description |
| ------ | ------ |
| [React Native](https://facebook.github.io/react-native/) | Mobile Apps Framework |
| [Axios](https://github.com/axios/axios) | HTTP client for request API |
| [Shoutem](https://shoutem.github.io/docs/extensions/tutorials/getting-started) | Ui Kit |
| [Gifted Chat](hhttps://github.com/FaridSafi/react-native-gifted-chat) | Chat kit |
| [Firebase](https://www.npmjs.com/package/firebase) | Firebase SDK |
| [Redux](https://redux.js.org) | Global State Management |
| [Redux Promise Middleware](https://www.npmjs.com/package/redux-promise-middleware) | Promise handler for react redux 

License
----

MIT


@2019 - Fahriansyah
