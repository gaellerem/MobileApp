import { createStackNavigator } from '@react-navigation/stack';

import SignUpMail from '../screens/SignUpMail';
import SignUp from '../screens/SignUp';

const Stack = createStackNavigator();

export default function () {
  return (
    <Stack.Navigator
      initialRouteName="SignUp"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignUp" component={SignUpMail} />
      <Stack.Screen name="Register" component={SignUp} />
    </Stack.Navigator>
  );
}
