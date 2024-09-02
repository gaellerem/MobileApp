import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/Login';
import SignUpStack from './SignUpStack';

const Stack = createStackNavigator();

export default function () {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUpStack} />
    </Stack.Navigator>
  );
}
