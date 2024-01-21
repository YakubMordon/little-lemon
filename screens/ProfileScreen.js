import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import validatePhoneNumber from '../validators/validatePhoneNumber';
import validateEmail from '../validators/validateEmail';
import validateName from '../validators/validateName';
import HeaderLogged from '../components/HeaderLogged';
import FormButton from '../components/FormButton';
import InputField from '../components/InputField';
import Avatar from '../components/Avatar';
import FormCheckbox from '../components/FormCheckbox';

export default function ProfileScreen({setOnboarded}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [orderStatus, setOrderStatus] = useState(false);
  const [passwordChange, setPasswordChange] = useState(false);
  const [specialOffer, setSpecialOffer] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState([]);

  const isFirstNameValid = validateName(firstName);
  const isLastNameValid = validateName(lastName);
  const isEmailValid = validateEmail(email);
  const isPhoneNumberValid = validatePhoneNumber(phoneNumber);

  const isAllValid = isFirstNameValid && isLastNameValid && isEmailValid && isPhoneNumberValid;

  const dataHandler = async () => {
    try {
      const keys = [
        "firstName",
        "email",
        "avatar",
        "lastName",
        "phoneNumber",
        "orderStatus",
        "passwordChange",
        "specialOffer",
        "newsletter",
      ];
  
      const data = await AsyncStorage.multiGet(keys);

      console.log(data);
  
      const dataMap = Object.fromEntries(data);
      
      setFirstName(dataMap.firstName);
      setEmail(dataMap.email);
      setImage(dataMap.avatar);
      setLastName(dataMap.lastName === null ? '' : dataMap.lastName);
      setPhoneNumber(dataMap.phoneNumber === null ? '' : dataMap.phoneNumber);
      setOrderStatus(dataMap.orderStatus === "true");
      setPasswordChange(dataMap.passwordChange === "true");
      setSpecialOffer(dataMap.specialOffer === "true");
      setNewsletter(dataMap.newsletter === "true");
    } catch (error) {
      console.error(error);
    }
  };  

  const saveImage = async() =>{
    const saveData = image.length < 3 ? formInitials() : image;
    try{
      await AsyncStorage.setItem("image", saveData);
      setImage(saveData);
    }catch(error){
      console.error(error);
    }
  }

  const formInitials = () =>{
    if(lastName === null) return firstName.charAt(0).toUpperCase();
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  }

  const logOut = async() =>{
    try{
      await AsyncStorage.clear();
      setOnboarded(false);
    }catch(error){
      console.error(error);
    }
  }

  const discardChanges = () =>{
    setOrderStatus(false);
    setPasswordChange(false);
    setSpecialOffer(false);
    setNewsletter(false);
    setLoading(false);
    setLastName('');
    setPhoneNumber('');

    dataHandler();
  }

  const saveChanges = async () => {
    try {
      const data = {
        "firstName": firstName.trim(),
        "lastName": lastName.trim(),
        "email": email.trim(),
        "phoneNumber": phoneNumber,
        "image": image,
        "orderStatus": String(orderStatus),
        "passwordChange": String(passwordChange),
        "specialOffer": String(specialOffer),
        "newsletter": String(newsletter),
      };
  
      await AsyncStorage.multiSet(Object.entries(data));
    } catch (error) {
      console.error(error);
    }
  };  

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useEffect(()=>{
    setLoading(true);
    dataHandler();
    setLoading(false);
  },[])

  useEffect(()=>{
    saveImage();
  },[image])

  if(loading) return <SplashScreen />

  return (
    <View style={styles.container}>
      <HeaderLogged image={image}/>
      <ScrollView style={styles.innerContainer}>
        <Text style={styles.headerText}>Personal information</Text>

        <Text style={styles.text}>Avatar</Text>
        <View style={styles.avatarContainer}>
          <Avatar size={80} image={image}/>
          <FormButton func={() => pickImage()} width={100} buttonStyle={styles.changeButton} textStyle={styles.changeButtonText} text={"Change"} isDisabled={false}/>
          <FormButton func={() => setImage(formInitials())} width={100} buttonStyle={styles.removeButton} textStyle={styles.removeButtonText} text={"Remove"} isDisabled={false}/>
        </View>

        <InputField  title={'First name'} value={firstName} setter={setFirstName} isValid={isFirstNameValid} invalidText={"first name"} containerStyle={styles.inputContainer} labelStyle={styles.text} inputStyle={styles.input} placeholder={"Write your first name"}/>
        <InputField  title={'Last name'} value={lastName} setter={setLastName} isValid={isLastNameValid} invalidText={"last name"} containerStyle={styles.inputContainer} labelStyle={styles.text} inputStyle={styles.input} placeholder={"Write your last name"}/>
        <InputField  title={'Email'} value={email} setter={setEmail} isValid={isEmailValid} invalidText={"valid Email"} containerStyle={styles.inputContainer} labelStyle={styles.text} inputStyle={styles.input} placeholder={"Write your email"}/>
        <InputField  title={'Phone Number'} value={phoneNumber} setter={setPhoneNumber} isValid={isPhoneNumberValid} invalidText={"valid USA Phone Number"} containerStyle={styles.inputContainer} labelStyle={styles.text} inputStyle={styles.input} placeholder={"Write your phone number"}/>
      
        <Text style={styles.headerText}>Email notifications</Text>
        <FormCheckbox value={orderStatus} setter={setOrderStatus} text={"Order statuses"}/>
        <FormCheckbox value={passwordChange} setter={setPasswordChange} text={"Password changes"}/>
        <FormCheckbox value={specialOffer} setter={setSpecialOffer} text={"Special offers"}/>
        <FormCheckbox value={newsletter} setter={setNewsletter} text={"Newsletter"}/>

        <FormButton func={() => logOut()} width={'97.5%'} buttonStyle={styles.logoutButton} textStyle={styles.logoutButtonText} text={"Log out"}/>

        <View style={styles.changesContainer}>
          <FormButton func={() => discardChanges()} width={180} buttonStyle={styles.removeButton} textStyle={styles.removeButtonText} text={"Discard changes"} isDisabled={false}/>
          <FormButton func={() => saveChanges()} width={180} buttonStyle={styles.changeButton} textStyle={styles.changeButtonText} text={"Save changes"} isDisabled={!isAllValid}/>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'white'
  },
  innerContainer:{
    marginLeft: 8
  },
  headerText:{
    fontFamily: 'sans-serif',
    color: '#4f635d',
    fontSize: 18,
    marginVertical: 20,
    marginLeft: 7
  },
  text:{
    color: '#9c9eaf',
    marginBottom: 4
  },
  avatarContainer:{
    display: 'flex',
    flexDirection: 'row',
    gap: 20
  },
  changeButton:{
    backgroundColor: '#495e57'
  },
  changeButtonText:{
    color: 'white'
  },
  removeButton:{
    backgroundColor: 'white',
    borderColor: '#acacbb',
    borderWidth: 2
  },
  removeButtonText:{
    color: '#acacbb'
  },
  input:{
    marginTop: 5
  },
  logoutButton:{
    backgroundColor: '#f4ce14'
  },
  logoutButtonText:{
    color: '#141001'
  },
  changesContainer:{
    marginLeft: -8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 15
  },
});
