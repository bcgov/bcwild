import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';

const LoginScreen = ({ navigation }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Add logic here to handle login button click
  };

  return (
  
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor: 'white' }}>
      <Image source={require('../assets/bc_logo.png')}
       style={{ width: 200, height: 150 ,resizeMode:'contain',
                      alignItems :'center' 
                      ,justifyContent:'center'}} />
      <Image source={require('../assets/bc_elongated.png')} style={{ width: 200, height: 150 , marginTop:20 }} />

      <Text style={{ fontWeight: 'bold', fontSize: 26, marginTop: 40,color:'black' }}>Login</Text>


      <View style={{ marginTop: 50, width: '80%' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Username</Text>
        <TextInput
          style={{ backgroundColor: '#EFEFEF', padding: 10, borderRadius: 10, marginTop: 5 }}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter your username"
          placeholderTextColor="#C7C7CD"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoCompleteType="email"
          returnKeyType="next"
          blurOnSubmit={false}
          accessibilityLabel="Username"
          testID="username"
        />
        <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 20 }}>Password</Text>
        <TextInput
          style={{ backgroundColor: '#EFEFEF', padding: 10, borderRadius: 10, marginTop: 5 }}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          placeholderTextColor="#C7C7CD"
          secureTextEntry={true}
          autoCompleteType="password"
          returnKeyType="done"
          accessibilityLabel="Password"
          testID="password"
        />
        <TouchableOpacity
          style={{ backgroundColor: '#234075', borderRadius: 10, marginTop: 20, padding: 10,
          justifyContent:'center'
          ,alignItems:'center' }}
          onPress={handleLogin}
          textalign='center'
          accessibilityLabel="Login Button"
          testID="loginButton"
        >
          <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 18 }}>Login</Text>
        </TouchableOpacity>


        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
            <TouchableOpacity
                  style={{ marginTop: 10 }}
                  accessibilityLabel="Forgot Password Link"
                  testID="forgotPasswordLink"
                  onPress={() => navigation.navigate('ForgotPassword')}
                >
                  <Text style={{ color: '#234075', fontWeight: 'bold', fontSize: 16 }}>Forgot Password?</Text>
            </TouchableOpacity>


            <TouchableOpacity
              style={{ marginTop: 10 }}
              accessibilityLabel="Signup Link"
              testID="signupLink"
              onPress={() => navigation.navigate('Signup')}
            >
              <Text style={{ color: '#234075', fontWeight: 'bold', fontSize: 16 }}>Sign Up</Text>
            </TouchableOpacity>
        </View>    
      </View>
    </View>
  );
};

export default LoginScreen;
