import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import { NativeBaseProvider } from 'native-base';
import SignOnScreen from './screens/SignOnScreen';
import DashboardScreen from './screens/DashboardScreen';
import TopUpScreen from './screens/TopUpScreen';
import RootNavigation from './navigation/Index';



// const Stack = createNativeStackNavigator();

export default function App() {
  return <RootNavigation/> 
    // <NativeBaseProvider>
    // <NavigationContainer>
    //  <Stack.Navigator>
    //    <Stack.Screen name="Home" component={HomeScreen} />
    //    <Stack.Screen name="SignOnScreen" component={SignOnScreen} />
    //    <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    //    <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
    //    <Stack.Screen name="TopUpScreen" component={TopUpScreen} />
    //  </Stack.Navigator>
    // </NavigationContainer>
    // </NativeBaseProvider>
  

  
    
 
}
