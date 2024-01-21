import { StyleSheet, Text, Pressable, View } from 'react-native';

export default function CircleButton({func}) {
  return (
    <View style={styles.buttonContainer}>
        <Pressable onPress={func} style={styles.button}>
            <Text style={styles.buttonText}>←</Text>
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
    buttonContainer:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        marginLeft: 20
    },
    button:{
        marginTop: 17,
        marginRight: 30,
        borderRadius: 50,
        backgroundColor: '#495e57',
        width: 40,
        height: 40,
        padding: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText:{
        marginTop: -10,
        fontSize: 27,
        color: 'white',
    }
});
