import React, { Component } from 'react'
import { TextInput, View, StyleSheet, Button,Alert } from 'react-native'
import axios from 'axios';

export class TripsScreen extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			 post: "",
			 title:""
		};
	 }
  
	 // Occurs when signout is pressed...
	 sendData = () => {
		axios({
			method: 'post',
			url: 'http://5x5.ir/api/RestUser/users',
			headers: {"Authorization" : `Basic YWRtaW46MTIzNA==`},
			data: {
				firstname: this.state.post,
				lastname: this.state.title,
				img_src: '1895804_09bf_21.jpg',
				img_src_thumb: '1895804_09bf_21_thumb.jpg'
			}
		  })
		  .then(function (response) {
				alert('its done ...');
			console.log(response.data.data.firstname);
		  })
		  .catch(function (error) {
			console.log(error);
		  });
			this.textInput.clear();
			this.textInputTitle.clear();

	 }


	render() {
		return (
			<View style={styles.container}>
					<TextInput style={styles.textInputTitle}
						placeholder="Write title" autoCapitalize="none" 
						ref={input => { this.textInputTitle = input }}
						onSubmitEditing={ () => this.sendData() }
									onChangeText={(text) => { this.setState({ title: text }) }}
					/>
            <TextInput multiline = {true} numberOfLines = {4} style={styles.textInput}
			   placeholder="Write post" autoCapitalize="none" 
			   ref={input => { this.textInput = input }}
			   onSubmitEditing={ () => this.sendData() }
               onChangeText={(text) => { this.setState({ post: text }) }}
            />

            <Button title="Send" onPress={this.sendData} />
         </View>
		)
	}
}

export default TripsScreen

const styles = StyleSheet.create({
	text: { color: "white", fontWeight: "bold", textAlign: "center", fontSize: 20, },
	textInput: { borderWidth:1, borderColor:"gray", marginVertical: 20, padding:10, height:100, alignSelf: "stretch", fontSize: 18, },
	textInputTitle: { borderWidth:1, borderColor:"gray", marginVertical: 20, padding:10, alignSelf: "stretch", fontSize: 18, },
  });