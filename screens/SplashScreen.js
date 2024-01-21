import { Image, StyleSheet, View } from 'react-native';
import image from "../assets/little-lemon-logo.bmp"

export default function Profile() {
  return (
    <View style={styles.container}>
        <Image style={styles.image} source={image}/>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    image: {
      width: 80,
      height: 80
    }
});
