import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	Button,
	FlatList,
	TouchableOpacity
} from 'react-native';

export default class Single extends React.Component {
	state = {
		message: 'I am State',
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>{this.props.navigation.getParam('name', 'no title')}</Text>
				<Image
					style={{ width: '100%', height: '100%' }}
					source={{ uri: this.props.navigation.getParam('imageSrc') }}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
});
