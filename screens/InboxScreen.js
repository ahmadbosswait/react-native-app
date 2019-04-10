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
import Category from './components/Inbox/Category'
import Icon from 'react-native-vector-icons/Ionicons'

export class InboxScreen extends React.Component {
   state = {
      posts: [],
      loading: true,
	  refreshing: false,
	  baseUploadUrl: 'http://5x5.ir/assets/upload/'
   }
   componentWillMount() {
      fetch('http://5x5.ir/api/user/showAll')
         .then(response => response.json())
         .then(data => {
            setTimeout(() => {
               this.setState({
                  loading: false,
                  refreshing: false,
                  posts: data.users
            })}, 1000)
         });
   }
   handleRefresh = () => {
      this.setState({
         refreshing: true,
       });
         fetch('http://5x5.ir/api/user/showAll')
            .then(response => response.json())
            .then(data => {
               setTimeout(() => {
                  this.setState({
                     loading: false,
                     refreshing: false,
                     posts: data.users
                  }
                  )}, 1000)
             });
   }
         handleListTap = item => {
      this.props.navigation.navigate('Single', {
         name: item.firstname,
         imageSrc: this.state.baseUploadUrl + item.img_src,
         date : item.modified
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
                  keyExtractor={item => item.id}
                  renderItem={({ item }) =>
                     <TouchableOpacity
                        onPress={() => this.handleListTap(item)}
                     >
                        <Category name={item.firstname} imageUri={this.state.baseUploadUrl+ item.img_src_thumb} date={item.Modified} />
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

export default InboxScreen

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
   },
});