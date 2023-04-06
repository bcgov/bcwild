import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';


import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import AddProjectScreen from './screens/AddProjectScreen';
import ProjectRequestAccessScreen from './screens/ProjectRequestAccessScreen';
import ApproveSignupAccessScreen from './screens/ApproveSignupAccessScreen';
import DashboardScreen from './screens/DashboardScreen';


const Stack = createStackNavigator();
const MyTheme = {
  colors: {
    primary: 'rgb(255, 255, 255)',
  },
};

function App() {
  return (
    <NavigationContainer
        theme={MyTheme}
        initialRouteName='Login'
    >
      
       <Stack.Navigator screenOptions={{headerShown: false,}}>
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        <Stack.Screen name="AddProject" component={AddProjectScreen} />
        <Stack.Screen name="ApproveSignupAccess" component={ApproveSignupAccessScreen} />
       <Stack.Screen name="ProjectAccess" component={ProjectRequestAccessScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
