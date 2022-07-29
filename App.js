import React, { createContext } from "react";

import Navigation from "./Components/Navigation/Navigation";
import Login from "./Components/LoginRegistration/LoginRegistration";
import { StyleSheet, SafeAreaView, View } from "react-native";

import firebase from "firebase/compat";
import "firebase/firestore";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

firebase.initializeApp({
  apiKey: "AIzaSyAeMQYRYiNr0Xgntt4h6FxbZozETo59f8g",
  authDomain: "reactnative-22574.firebaseapp.com",
  projectId: "reactnative-22574",
  storageBucket: "reactnative-22574.appspot.com",
  messagingSenderId: "228198099180",
  appId: "1:228198099180:web:8bd7c02707ab3717251dc9",
  measurementId: "G-V1FPV7KFWS",
});

export const Context = createContext(null);
const auth = firebase.auth();
const firestore = firebase.firestore();
export default function App() {
  const [user] = useAuthState(auth);
  return (
    <Context.Provider
      value={{
        firebase,
        auth,
        firestore,
      }}
    >
      {user ? (
        <Navigation />
      ) : (
        <SafeAreaView style={styles.container}>
          <Login />
        </SafeAreaView>
      )}
    </Context.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e3e8e4",
    alignItems: "center",
    justifyContent: "center",
  },
});
