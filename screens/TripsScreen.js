import React, { Component } from 'react'
import { TextInput, View, StyleSheet, Button,Alert } from 'react-native'
import axios from 'axios';

export class TripsScreen extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
		   name: "",
		};
	 }
  
	 // Occurs when signout is pressed...
	 sendData = () => {
		axios({
			method: 'post',
			url: 'http://5x5.ir/api/RestUser/users',
			headers: {"Authorization" : `Basic YWRtaW46MTIzNA==`},
			data: {
				firstname: this.state.name,
				img_src: '1895804_09bf_21.jpg',
				img_src_thumb: '1895804_09bf_21_thumb.jpg'
			}
		  })
		  .then(function (response) {
			console.log(response.data.data.firstname);
		  })
		  .catch(function (error) {
			console.log(error);
		  });
			this.textInput.clear();

	 }


	render() {
		return (
			<View style={styles.container}>

            <TextInput style={styles.textInput}
			   placeholder="Name" autoCapitalize="none" 
			   ref={input => { this.textInput = input }}
			   onSubmitEditing={ () => this.sendData() }
               onChangeText={(text) => { this.setState({ name: text }) }}
            />

            <Button title="Send" onPress={this.sendData} />
         </View>
		)
	}
}

export default TripsScreen

const styles = StyleSheet.create({
	text: { color: "white", fontWeight: "bold", textAlign: "center", fontSize: 20, },
	textInput: { borderWidth:1, borderColor:"gray", marginVertical: 20, padding:10, height:40, alignSelf: "stretch", fontSize: 18, },
  });