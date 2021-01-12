import React, { useState } from "react";
import { View, Button, Text, TextInput } from "react-native";
import * as firebase from "firebase";

export default function Register({ state: any }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const onSignUp = () => {
    firebase
      .auth()
      // create new user with password
      .createUserWithEmailAndPassword(email, password)
      // after promise resolves create instance of user doc in firestore
      .then((result) => {
        firebase
          // access firestore
          .firestore()
          // find collection
          .collection("users")
          // create document/generate user unique id hash
          .doc(firebase.auth().currentUser.uid)
          // set document k-v with payload
          .set({ name, email });
      })
      .catch((err) => console.error(err));
  };

  return (
    <View>
      <TextInput
        autoFocus={true}
        placeholder="Name"
        autoCompleteType
        onChange={(name) => setName({ name })}
      ></TextInput>
      <TextInput
        placeholder="Email"
        autoCompleteType
        onChange={(email) => setEmail({ email })}
      ></TextInput>
      <TextInput
        placeholder="Password"
        autoCompleteType
        secureTextEntry={true}
        onChange={(password) => setPassword({ password })}
      ></TextInput>
      <Button
        onPress={() => {
          onSignUp();
        }}
      ></Button>
    </View>
  );
}
