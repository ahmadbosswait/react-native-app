import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons'; // 6.2.2

import HomeScreen from './../screens/HomeScreen'
import SavedScreen from './../screens/SavedScreen'
import TripsScreen from './../screens/TripsScreen'
import InboxScreen from './../screens/InboxScreen'
import ProfileScreen from './../screens/ProfileScreen'

import SaveSingleScreen from './../screens/components/Saved/SingleScreen'
import InboxSingleScreen from './../screens/components/Inbox/SingleScreen'

class App extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Text></Text>
			</View>
		);
	}
}

const getTabBarIcon = (navigation, focused, tintColor) => {
	const { routeName } = navigation.state;
	let iconName;

	if (routeName === 'Home') {
		iconName = `md-home`;
	} else if (routeName === 'Saved') {
		iconName = `md-heart`;
	} else if (routeName === 'Trips') {
		iconName = `md-car`;
	} else if (routeName === 'Inbox') {
		iconName = `md-mail`;
	} else if (routeName === 'Profile') {
		iconName = `md-person`;
	}
	return <Ionicons name={iconName} size={25} color={tintColor} />;
};

const SaveStackScreen = createStackNavigator({
	Saved: {
		screen: SavedScreen,
		navigationOptions: {
			tabBarLabel: 'SAVED',
			header: null,
		}
	},
	Single: { screen: SaveSingleScreen },
});

const InboxStackScreen = createStackNavigator({
	Inbox: {
		screen: InboxScreen,
		navigationOptions: {
			tabBarLabel: 'SAVED',
			header: null,
		}
	},
	Single: { screen: InboxSingleScreen },
});

const TabNavigator = createBottomTabNavigator({
	Home: { screen: HomeScreen },
	Saved: { screen: SaveStackScreen },
	Trips: { screen: TripsScreen },
	Inbox: { screen: InboxStackScreen },
	Profile: { screen: ProfileScreen },
},
	{
		defaultNavigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused, tintColor }) =>
				getTabBarIcon(navigation, focused, tintColor),
		}),
		tabBarOptions: {
			activeTintColor: '#c70039',
			inactiveTintColor: 'gray',
			style: {
				backgroundColor: 'white',
				borderTopWidth: 0,
				shadowOffset: { width: 2, height: 3 },
				shadowColor: 'black',
				shadowOpacity: 0.5,
				elevation: 5
			}
		}
	}
);

export default createAppContainer(TabNavigator);
