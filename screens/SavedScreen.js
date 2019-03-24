import React, { Component } from 'react'
import {
   Text,
   View,
   StyleSheet,
   Platform,
   TouchableOpacity,
   Image,
   SafeAreaView,
   FlatList,
   TextInput,
   ActivityIndicator
} from 'react-native'
import Category from './components/Saved/Category'
import Icon from 'react-native-vector-icons/Ionicons'

export class SavedScreen extends React.Component {
   state = {
      posts: [],
      loading: true,
      refreshing: false,
   }
   componentWillMount() {
      fetch('https://reddit.com/r/aww.json?raw_json=1')
         .then(response => response.json())
         .then(data => {
            this.setState({
               loading: false,
               posts: data.data.children
            });
         });
   }
   handleRefresh = () => {
      fetch('https://reddit.com/r/aww.json?raw_json=1')
         .then(response => response.json())
         .then(data => {
            this.setState({
               loading: false,
               refreshing: false,
               posts: data.data.children
            });
         });
   }
   handleListTap = item => {
      this.props.navigation.navigate('Single', {
         name: item.data.title,
         imageSrc: item.data.preview.images[0].source.url
      });
   }
   render() {
      return (
         <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
               {/* <View style={{
                  flexDirection: 'row', padding: 10,
                  backgroundColor: 'white', marginHorizontal: 20,
                  elevation: 1,
                  marginTop: Platform.OS == 'android' ? 5 : null
               }}>
               </View> */}
               {this.state.loading &&
                  <ActivityIndicator size="large" color="#0000ff" />
               }
               <FlatList
                  ItemSeparatorComponent={() =>
                     <View
                        style={{ height: 1, width: '100%', backgroundColor: 'lightgray' }}
                     />
                  }
                  data={this.state.posts}
                  keyExtractor={item => item.data.id}
                  renderItem={({ item }) =>
                     <TouchableOpacity
                        onPress={() => this.handleListTap(item)}
                     >
                        <Category name={item.data.title} imageUri={item.data.thumbnail} />
                     </TouchableOpacity>
                  }
                  refreshing={this.state.refreshing}
                  onRefresh={this.handleRefresh}
               />
            </View>
         </SafeAreaView>
      )
   }
}

export default SavedScreen

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
   },
});