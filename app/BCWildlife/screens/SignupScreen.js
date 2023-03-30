import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-simple-toast';
import axios from 'axios';


const SignupScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = () => {
    // Add logic here to handle signup button click
    if(!firstName){
      showToast('Invalid First Name')
      return;
    }
    if(!lastName){
      showToast('Invalid Last Name');
      return;
    }
    if(!contactNumber){
      showToast('Invalid Contact Number');
      return;
    }
    if(!username){
      showToast('Invalid Username');
      return;
    }

    if (!this.validateEmail(email)) {
      showToast('Invalid Email');
      return;
    } 

    if(!password){
      showToast('Invalid password');
      return;
    }
    if(!confirmPassword){
      showToast('Invalid Confirm password')
      return;
    }

    if(password.trim() != confirmPassword.trim()){
        showToast('Passwords do not match');
        return 
    }

  };


  const showToast = (message) => {
    Toast.show(message,Toast.SHORT);
  };

  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  };

  return (
    <ScrollView> 
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor: 'white' }}>
      <Image source={require('../assets/bc_logo.png')}
       style={{ width: 200, height: 150 ,resizeMode:'contain',
                      alignItems :'center' 
                      ,justifyContent:'center'}} />
      <Image source={require('../assets/bc_elongated.png')} style={{ width: 200, height: 150 , marginTop:20 }} />

      <Text style={{ fontWeight: 'bold', fontSize: 26, marginTop: 40,color:'black' }}>Sign Up</Text>
      <TouchableOpacity
          onPress={() => navigation.navigate('Login')}>  
      <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 10,color:'black' }}>Already have an account ?
        
        <Text style={{color:'#234075'}}>  Sign In</Text> 
    
      </Text></TouchableOpacity>


      <View style={{ marginTop: 20, width: '80%' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>First Name</Text>
        <TextInput
          style={{ backgroundColor: '#EFEFEF', padding: 10, borderRadius: 10, marginTop: 5 }}
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Enter your first name"
          placeholderTextColor="#C7C7CD"
          returnKeyType="next"
      
          blurOnSubmit={false}
          accessibilityLabel="First Name"
          testID="firstName"
        />
        <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 20 }}>Last Name</Text>
        <TextInput
          style={{ backgroundColor: '#EFEFEF', padding: 10, borderRadius: 10, marginTop: 5 }}
          value={lastName}
          onChangeText={setLastName}
          placeholder="Enter your last name"
          placeholderTextColor="#C7C7CD"
          returnKeyType="next"
        
          blurOnSubmit={false}
          accessibilityLabel="Last Name"
          testID="lastName"
        />
        <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 20 }}>Contact Number</Text>
        <TextInput
          style={{ backgroundColor: '#EFEFEF', padding: 10, borderRadius: 10, marginTop: 5 }}
          value={contactNumber}
          onChangeText={setContactNumber}
          placeholder="Enter your contact number"
          placeholderTextColor="#C7C7CD"
          returnKeyType="next"
        
          blurOnSubmit={false}
          accessibilityLabel="Contact Number"
          testID="contactNumber"
        />

        <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 20 }}>Username</Text>
        <TextInput
          style={{ backgroundColor: '#EFEFEF', padding: 10, borderRadius: 10, marginTop: 5 }}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter Username"
          placeholderTextColor="#C7C7CD"
          returnKeyType="next"
        
          blurOnSubmit={false}
          accessibilityLabel="Contact Number"
          testID="contactNumber"
        />
        <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 20 }}>Email</Text>
        <TextInput
          style={{ backgroundColor: '#EFEFEF', padding: 10, borderRadius: 10, marginTop: 5 }}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          placeholderTextColor="#C7C7CD"        
          returnKeyType="next"
          
          blurOnSubmit={false}
          accessibilityLabel="Contact Number"
          testID="contactNumber"
        />
        <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 20 }}>Create Password</Text>
        <TextInput
          style={{ backgroundColor: '#EFEFEF', padding: 10, borderRadius: 10, marginTop: 5 }}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your Password"
          placeholderTextColor="#C7C7CD"
          
          returnKeyType="next"
        
          blurOnSubmit={false}
          accessibilityLabel="Contact Number"
          testID="contactNumber"
        />
        <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 20 }}>confirm Password</Text>
        <TextInput
          style={{ backgroundColor: '#EFEFEF', padding: 10, borderRadius: 10, marginTop: 5 }}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm Password"
          placeholderTextColor="#C7C7CD"
        
          returnKeyType="next"
        
          blurOnSubmit={false}
          accessibilityLabel="Contact Number"
          testID="contactNumber"
        />

        <TouchableOpacity
          style={{ backgroundColor: '#234075', borderRadius: 10, marginTop: 20, padding: 10,
          marginBottom:20,
          justifyContent:'center'
          ,alignItems:'center' }}
          onPress={handleSignup}
          textalign='center'
          accessibilityLabel="Login Button"
        >
          <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 18 }}>Sign-Up</Text>
        </TouchableOpacity>

      </View>
      </View>
   </ScrollView>
  );
};

export default SignupScreen;

        