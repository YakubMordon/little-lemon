import { StyleSheet, Text, Pressable, View } from 'react-native';

export default function FormButton({func, width, buttonStyle, textStyle, text, isDisabled}) {
  return (
    <View style={[styles.buttonContainer, {width: width}]}>
        <Pressable onPress={func} style={[styles.button, buttonStyle]} disabled={isDisabled}>
            <Text style={[styles.buttonText, textStyle]}>{text}</Text>
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
    buttonContainer:{
      display: 'flex',
    },
    button:{
      marginTop: 17,
      marginRight: 30,
      borderRadius: 10,
      width: '100%',
      height: 40,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttonText:{
      fontSize: 17,
    }
});
