import React, { Component } from 'react';
import Login from "../components/auth/Login"
import Signup from "../components/auth/Signup"
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';

const AuthScreen = createStackNavigator({
  Signup: {
    screen: Signup,
    navigationOptions: ({ navigation }) => ({
      title: 'Signup',
    }),
  },
  Login: {
    screen: Login,
    navigationOptions: ({ navigation }) => ({
      title: 'Login',
    }),
  }
})

export default AuthScreen;