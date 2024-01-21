import { StyleSheet, Text, Pressable, View, Image } from 'react-native';
import MagnifyingGlassIcon from "../assets/MagnifyingGlassIcon.svg"

export default function MagnifyingGlass({func}) {
  return (
    <View style={styles.buttonContainer}>
        <Pressable onPress={func} style={styles.button}>
            <Image style={styles.magnifyingGlass} source={MagnifyingGlassIcon}/>
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
    buttonContainer:{
        display: 'flex',
        marginBottom: 10,
        marginLeft: 5
    },
    button:{
        marginRight: 30,
        borderRadius: 50,
        backgroundColor: '#e4e4e4',
        width: 40,
        height: 40,
        padding: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    magnifyingGlass:{
        width: 22,
        height: 22,
    }
});
