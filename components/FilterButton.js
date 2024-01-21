import { StyleSheet, Text, Pressable, View } from 'react-native';

export default function FilterButton({func, text, isSelected}) {
  return (
    <View style={styles.buttonContainer}>
        <Pressable onPress={func} style={[styles.button, isSelected && styles.buttonSelected]}>
            <Text style={styles.buttonText}>{text}</Text>
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
      height: 40,
      padding: 5,
      backgroundColor: '#edefee',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttonSelected:{
        backgroundColor: '#cacccb'
    },
    buttonText:{
      fontSize: 14,
      color: '#495e57'
    }
});
