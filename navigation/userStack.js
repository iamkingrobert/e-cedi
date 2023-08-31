import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardScreen from "../screens/DashboardScreen";
import TopUpScreen from "../screens/TopUpScreen";
import UserScreen from "../screens/UserScreen";
import SignOnScreen from "../screens/SignOnScreen";
import ImagePickers from "../screens/ImagePickers";
import InvestmentScreen from "../screens/InvestmentScreen";
import { Provider } from "react-redux";
import store from "../features/store";
const Stack = createNativeStackNavigator();

export default function userStack() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
          <Stack.Screen name="UserScreen" component={UserScreen} />
          <Stack.Screen name="TopUpScreen" component={TopUpScreen} />
          <Stack.Screen name="SignOnScreen" component={SignOnScreen} />
          <Stack.Screen name="Update Profile" component={ImagePickers} />
          <Stack.Screen name="Investment" component={InvestmentScreen} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
