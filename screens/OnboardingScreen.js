import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import validateEmail from '../validators/validateEmail';
import validateName from '../validators/validateName';
import InputField from '../components/InputField';
import Header from '../components/Header';
import Button from '../components/Button';

export default function OnboardingScreen({setOnboarded}) {
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const isFirstNameValid = validateName(firstName);

    const isEmailValid = validateEmail(email);

    const isDisabled = isFirstNameValid && isEmailValid

    const logger = async(logStatus) => {
      try{
        await AsyncStorage.setItem("isLoggedIn", String(logStatus));
      }catch(err){
        console.error(err);
      }
    }

    const saveData = async() => {
      try{
        const firstNameData = firstName !== null ? firstName.trim() : "";
        const emailData = email !== null ? email.trim() : "";
        const imageInitial = firstNameData !== null && firstNameData.charAt(0).toUpperCase();
    
        const data = {
          "firstName": firstNameData,
          "email": emailData,
          "avatar": imageInitial,
        };
    
        await AsyncStorage.multiSet(Object.entries(data));

      }catch(err){
        console.error(err);
      }finally{
        setOnboarded(true);
      }
    }

    const logIn = () =>{
      logger(true);
      saveData();
    }

    useEffect(() =>{
      setLoading(true);
      logger(false);
      setLoading(false);
    },[])

    if(loading) return <SplashScreen />

    return (
        <View style={styles.container}>
            <Header bgColor={'#dee3e9'}/>
            <View style={styles.body}>
                <Text style={styles.headerText}>Let us get to know you</Text>
                <View>
                    <InputField title={'First name'} value={firstName} setter={setFirstName} isValid={isFirstNameValid} invalidText={"first name"} containerStyle={{alignItems: 'center'}} labelStyle={styles.label} inputStyle={styles.input} placeholder={"Write your first name"}/>
                    <InputField title={'Email'} value={email} setter={setEmail} isValid={isEmailValid} invalidText={"valid Email"} containerStyle={{alignItems: 'center'}} labelStyle={styles.label} inputStyle={styles.input} placeholder={"Write your email"}/>
                </View>
            </View>
            <Button isDisabled={!isDisabled} func={logIn} additionalStyle={{alignItems: 'flex-end'}}/>
        </View>
    );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  headerText:{
    fontFamily: 'sans-serif',
    color: '#4f635d',
    fontSize: 26,
    marginTop: 20,
    marginBottom: 100
  },
  body:{
    backgroundColor: '#cbd2d9',
    height: '80%',
    alignItems: 'center',
  },
  label:{
    color: '#3b4f5a',
    fontSize: 23
  },
  input:{
    marginTop: 20
  }
});
