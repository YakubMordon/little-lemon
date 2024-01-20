import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import image from "../assets/little-lemon-logo.bmp"
import InputField from '../components/InputField';
import { useState } from 'react';

export default function Onboarding() {
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');

    function validateEmail() {
        const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    const isDisabled = firstName.length > 0 && validateEmail(email)

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={image}/>
                <Text style={styles.headerText}> Little Lemon</Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.headerText}>Let us get to know you</Text>
                <View>
                    <InputField title={'First name'} value={firstName} setter={setFirstName}/>
                    <InputField title={'Email'} value={email} setter={setEmail}/>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Pressable style={[styles.button, !isDisabled && styles.buttonDisabled]} disabled={isDisabled}>
                    <Text style={styles.buttonText}>Click</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container:{
    marginTop: 20
  },
  header: {
    height: 55,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dee3e9'
  },
  headerText:{
    fontFamily: 'sans-serif',
    color: '#4f635d',
    fontSize: 26
  },
  body:{
    backgroundColor: '#cbd2d9',
    height: '85%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 240,
    flexDirection: 'column'
  },
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
