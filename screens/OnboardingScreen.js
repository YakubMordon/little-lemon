import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import InputField from '../components/InputField';
import Button from '../components/Button';

export default function OnboardingScreen() {
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');

    function validateEmail() {
        const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    const isDisabled = firstName.length > 0 && validateEmail(email)

    const logger = async(logStatus) => {
        try{
            await AsyncStorage.setItem("isLoggedIn", String(logStatus));
        }catch(err){
            console.error(err);
        }
    }

    const logIn = () =>{
        logger(true);
    }

    useEffect(() =>{
      logger(false);
    },[])

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.body}>
                <Text style={styles.headerText}>Let us get to know you</Text>
                <View>
                    <InputField title={'First name'} value={firstName} setter={setFirstName}/>
                    <InputField title={'Email'} value={email} setter={setEmail}/>
                </View>
            </View>
            <Button isDisabled={isDisabled} logIn={logIn}/>
        </View>
    );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop: 20,
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
});
