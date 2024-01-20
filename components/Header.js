import { StyleSheet, Text, Image, View } from 'react-native';
import image from "../assets/little-lemon-logo.bmp"

export default function Header() {
  return (
    <View style={styles.header}>
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
        alignItems: 'center',
        backgroundColor: '#dee3e9'
      },
      headerText:{
        fontFamily: 'sans-serif',
        color: '#4f635d',
        fontSize: 26
      },
});
