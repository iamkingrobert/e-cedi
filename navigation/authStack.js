import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';

import HomeScreen from '../screens/HomeScreen';
import SignOnScreen from '../screens/SignOnScreen';
import SignUpScreen from '../screens/SignUpScreen';


const Stack = createNativeStackNavigator();

export default function authStack(){
    return(
    <NativeBaseProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SignOnScreen" component={SignOnScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </NativeBaseProvider>
    )
}