import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function InputField({title, value, setter}) {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <TextInput style={styles.input} value={value} onChangeText={(text) => setter(text)}/>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        marginVertical: 8,
        display: 'flex',
        alignItems: 'center'
    },
    title:{
        color: '#3b4f5a',
        fontSize: 23
    },
    input:{
        marginTop: 20,
        borderColor: '#7f8c99',
        borderWidth: 2,
        borderRadius: 10,
        width: 260,
        height: 40,
        padding: 10,
    }
});
