import { StyleSheet, Text, Pressable, View, Image, TextInput } from 'react-native';
import MagnifyingGlassIcon from "../assets/MagnifyingGlassIcon.svg"

export default function MagnifyingGlass({value, func}) {
  return (
    <View style={styles.buttonContainer}>
        <View style={styles.button}>
            <Image style={styles.magnifyingGlass} source={MagnifyingGlassIcon}/>
            <TextInput style={styles.input} value={value} onChangeText={func}/>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    buttonContainer:{
        display: 'flex',
        marginBottom: 10,
        marginLeft: 5,
        marginTop: 10,
    },
    button:{
        marginRight: 30,
        borderRadius: 50,
        backgroundColor: '#e4e4e4',
        width: '90%',
        height: 40,
        padding: 1,
        gap: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    magnifyingGlass:{
        width: 22,
        height: 22,
    },
    input:{
        width: '85%'
    }
});
