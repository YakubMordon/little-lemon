import { StyleSheet, Text, Image, View } from 'react-native';
import image from "../assets/little-lemon-logo.bmp"

export default function Header({bgColor}) {
  return (
    <View style={[styles.header, {backgroundColor: bgColor}]}>
        <Image source={image}/>
        <Text style={styles.headerText}> Little Lemon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    header: {
      height: 55,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    headerText:{
      fontFamily: 'sans-serif',
      color: '#4f635d',
      fontSize: 26
    },
});
