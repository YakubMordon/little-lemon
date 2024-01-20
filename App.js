import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./screens/SplashScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(false);
  const [onboarded,setOnboarded] = useState(false);
  
  const fetchData = async () =>{
    try{
      const logged = await AsyncStorage.getItem('isLoggedIn') === "true";
      setOnboarded(logged);
    }catch(err){
      console.error(err)
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchData();
    setLoading(false);
  }, []);

  if(loading) return <SplashScreen />

  return (
    <NavigationContainer>
      <Stack.Navigator>
      {onboarded ? (
        <Stack.Screen name="Profile" component={ProfileScreen} />
      ) : (
        <Stack.Screen name="Onboarding" component={OnboardingScreen} initialParams={{setOnboarded}}/>
      )}
      </Stack.Navigator> 
    </NavigationContainer>
  );
}