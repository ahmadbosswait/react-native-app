import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import RootNavigation from './navigation/RootNavigation';
import MainTabNavigator from './navigation/MainTabNavigator';
import ApiKeys from './constants/apiKeys';
import * as firebase from 'firebase';

export default class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isLoadingComplete: false,
			isAuthenticationReady: false,
			isAuthenticated: false,
		};

		// Initialize firebase...
		if (!firebase.apps.length) { firebase.initializeApp(ApiKeys.FirebaseConfig); }
		firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
	}

	onAuthStateChanged = (user) => {
		this.setState({ isAuthenticationReady: true });
		this.setState({ isAuthenticated: !!user });
	}

	render() {
		if ((!this.state.isLoadingComplete || !this.state.isAuthenticationReady) && !this.props.skipLoadingScreen) {
			return (
				<View style={styles.container}>
					{Platform.OS === 'ios' && <StatusBar barStyle="default" />}
					{Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
					{(this.state.isAuthenticated) ? <MainTabNavigator /> : <RootNavigation />}
				</View>
			);
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	statusBarUnderlay: {
		height: 24,
		backgroundColor: 'rgba(0,0,0,0.2)',
	},
});