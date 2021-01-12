import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import * as firebase from "firebase";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './redux/reducers';


import {FIREBASE_CONFIG} from "@env";
const FIREBASE_CONFIG = process.env.FIREBASE_CONFIG;

if (firebase.apps.length == 0) {
  firebase.initializeApp(FIREBASE_CONFIG);
}

import LandingScreen from "./components/auth/Landing";
import RegisterScreen from "./components/auth/Register";
import LoginScreen from "./components/auth/Login";
import Main from "./components/Main";

const Stack = createStackNavigator();

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    return () => {
      firebase.auth().onAuthStateChanged((user) => {
        //if user does exist set loaded to true but logged in to false
        if (!user) {
          setLoggedIn(false);
          setLoaded(true);
        } else {
          setLoggedIn(true);
          setLoaded(true);
        }
      });
    };
  }, []);

  return (
    <>
      {loaded ? (
        <NavigationContainer>
          {
            // Initial page
          }
          <Stack.Navigator initialRouteName="Landing">
            {
              // Our various pages of our mobile app
            }
            <Stack.Screen
              name="Landing"
              component={LandingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <ActivityIndicator size="large" />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
