import { StyleSheet, Text, Pressable, View } from 'react-native';

export default function Button({isDisabled, logIn}) {
  return (
    <View style={styles.buttonContainer}>
        <Pressable style={[styles.button, !isDisabled && styles.buttonDisabled]} disabled={isDisabled} onPress={logIn}>
            <Text style={styles.buttonText}>Click</Text>
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
    buttonContainer:{
        display: 'flex',
        alignItems: 'flex-end'
      },
      button:{
        marginTop: 17,
        marginRight: 30,
        borderRadius: 10,
        backgroundColor: '#cbd2d9',
        width: '22%',
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      },
      buttonDisabled:{
        backgroundColor: '#b4b9be'
      },
      buttonText:{
        fontSize: 17,
        color: '#5d6f7d'
      }
});
