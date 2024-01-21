import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import OnboardingScreen from "./screens/OnboardingScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SplashScreen from "./screens/SplashScreen";
import HomeScreen from "./screens/HomeScreen";
import { useState, useEffect } from "react";

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
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Profile">
              {(props) => <ProfileScreen {...props} setOnboarded={setOnboarded} />}
            </Stack.Screen>
          </>
        ) : (
          <Stack.Screen name="Onboarding">
            {(props) => <OnboardingScreen {...props} setOnboarded={setOnboarded} />}
          </Stack.Screen>
        )}
      </Stack.Navigator> 
    </NavigationContainer>
  );
}