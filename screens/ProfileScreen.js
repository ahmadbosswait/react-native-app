import React, { Component } from 'react'
import { TextInput, View, StyleSheet, Button,Alert } from 'react-native'
import * as firebase from 'firebase';

export class ProfileScreen extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         currentPassword: "",
         newPassword: "",
         newEmail: "",
      };
   }

   // Occurs when signout is pressed...
   onSignoutPress = () => {
      firebase.auth().signOut();
   }

   // Reauthenticates the current user and returns a promise...
   reauthenticate = (currentPassword) => {
      var user = firebase.auth().currentUser;
      var cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
      return user.reauthenticateAndRetrieveDataWithCredential(cred);
   }

   // Changes user's password...
   onChangePasswordPress = () => {
      this.reauthenticate(this.state.currentPassword).then(() => {
         var user = firebase.auth().currentUser;
         user.updatePassword(this.state.newPassword).then(() => {
            Alert.alert("Password was changed");
         }).catch((error) => { console.log(error.message); });
      }).catch((error) => { console.log(error.message) });
   }

   // Changes user's email...
   onChangeEmailPress = () => {
      this.reauthenticate(this.state.currentPassword).then(() => {
         var user = firebase.auth().currentUser;
         user.updateEmail(this.state.newEmail).then(() => {
            Alert.alert("Email was changed");
         }).catch((error) => { console.log(error.message); });
      }).catch((error) => { console.log(error.message) });
   }

   render() {
      return (
         <View style={styles.container}>
            <Button title="Sign out" onPress={this.onSignoutPress} />

            <TextInput style={styles.textInput} value={this.state.currentPassword}
               placeholder="Current Password" autoCapitalize="none" secureTextEntry={true}
               onChangeText={(text) => { this.setState({ currentPassword: text }) }}
            />

            <TextInput style={styles.textInput} value={this.state.newPassword}
               placeholder="New Password" autoCapitalize="none" secureTextEntry={true}
               onChangeText={(text) => { this.setState({ newPassword: text }) }}
            />

            <Button title="Change Password" onPress={this.onChangePasswordPress} />

            <TextInput style={styles.textInput} value={this.state.newEmail}
               placeholder="New Email" autoCapitalize="none" keyboardType="email-address"
               onChangeText={(text) => { this.setState({ newEmail: text }) }}
            />

            <Button title="Change Email" onPress={this.onChangeEmailPress} />
         </View>
      )
   }
}

export default ProfileScreen

const styles = StyleSheet.create({
   text: { color: "white", fontWeight: "bold", textAlign: "center", fontSize: 20, },
   textInput: { borderWidth:1, borderColor:"gray", marginVertical: 20, padding:10, height:40, alignSelf: "stretch", fontSize: 18, },
 });