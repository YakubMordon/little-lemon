import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function InputField({title, value, setter, isValid, invalidText, containerStyle, labelStyle, inputStyle, placeholder}) {
  return (
    <>
        <View style={[styles.container, containerStyle]}>
            <Text style={labelStyle}>{title}</Text>
            <TextInput style={[styles.input, inputStyle]} value={value} onChangeText={(text) => setter(text)} placeholder={placeholder}/>
        </View>
        {
            !isValid && <Text style={styles.error}>Please enter a {invalidText}</Text>
        }
    </>
  );
}

const styles = StyleSheet.create({
    container:{
        marginVertical: 8,
        display: 'flex',
    },
    input:{
        borderColor: '#7f8c99',
        borderWidth: 2,
        borderRadius: 10,
        width: 260,
        height: 40,
        padding: 10,
    },
    error:{
        color: 'red'
    }
});
