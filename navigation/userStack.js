import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DashboardScreen from '../screens/DashboardScreen';
import TopUpScreen from '../screens/TopUpScreen';
import UserScreen from '../screens/UserScreen';
import SignOnScreen from '../screens/SignOnScreen';
const Stack = createNativeStackNavigator();

export default function userStack(){
    return(
        <NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
        <Stack.Screen name="UserScreen" component={UserScreen} />
        <Stack.Screen name="TopUpScreen" component={TopUpScreen} />
        <Stack.Screen name="SignOnScreen" component={SignOnScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    )
}