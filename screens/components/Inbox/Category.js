import React, { Component } from "react";
import { Font } from 'expo';
import {
   View,
   Text,
   StyleSheet,
   Image,
   TouchableOpacity
} from "react-native";

class Category extends Component {
   state = {
      fontLoaded: false,
   };
   async componentDidMount(){
      await Font.loadAsync({
         'ae_Cortoba': require('./../../../assets/fonts/cortoba.ttf'),
      });

      this.setState({ fontLoaded: true });
   }
   render() {
      return (
         <View
            style={styles.view}
         >
            <Image
               style={{ width: 50, height: 50, borderRadius: 25 }}
               source={{ uri: this.props.imageUri }}
            />
            {
               this.state.fontLoaded ? (
                  <Text style={{ padding: 10, fontFamily:'ae_Cortoba' }}>{this.props.name}</Text>
               ) : null
            }
         </View>
      );
   }
}
export default Category;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
   },
   view: {
      flexDirection: 'row', 
      alignItems: 'center', 
      padding: 10 
   }
});