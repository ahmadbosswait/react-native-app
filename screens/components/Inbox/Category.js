import React, { Component } from "react";
import {
   View,
   Text,
   StyleSheet,
   Image,
   TouchableOpacity
} from "react-native";

class Category extends Component {
   render() {
      return (
         <View
            style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}
         >
            <Image
               style={{ width: 50, height: 50, borderRadius: 25 }}
               source={{ uri: this.props.imageUri }}
            />
            <Text style={{ padding: 10 }}>{this.props.name}</Text>
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
   }
});