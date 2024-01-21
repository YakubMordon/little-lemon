import { StyleSheet, Text, Pressable, View } from 'react-native';

export default function Button({isDisabled, func, additionalStyle}) {
  return (
    <View style={[styles.buttonContainer, additionalStyle]}>
        <Pressable onPress={func} style={[styles.button, isDisabled && styles.buttonDisabled]} disabled={isDisabled}>
            <Text style={styles.buttonText}>Click</Text>
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
    buttonContainer:{
      flex: 1,
      display: 'flex',
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
