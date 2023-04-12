import React, { useState } from 'react';
import { View, Text, Image, TextInput,Alert, TouchableOpacity } from 'react-native';
import axiosUtility from '../network/AxiosUtility';
import { forgotpass_url } from '../network/path';
import LoadingOverlay from '../utility/LoadingOverlay';

const ForgotPasswordScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };


  
  const submitEmail = async (email) => {
    setLoading(true);
    if (!validateEmail(email)) {
      console.error('Invalid email');
      setLoading(false);
      return;
    }
  
    const data = {
      email: email,
    };

    axiosUtility.post(forgotpass_url, data)
    .then((response) => {
      setLoading(false);
      console.log('Response:', response);
      if(response.type=='success'){
        console.log('Success');
        showAlert('Success',response.message);
        setEmail('');
      }else{
        showAlert('Error',response.message);
      }
    })
    .catch((error) => {
      setLoading(false);
      if (error.response) {
        console.log('Response error:', error.response.data);
        showAlert('Error',error.response.data.message);
      } else if (error.request) {
        console.log('Request error:', error.request);
        showAlert('Error',error.response.data.message);
      } else {
        console.log('Error message:', error.message);
        showAlert('Error',error.response.data.message);
      }
    });

  }

  const handleSend = () => {
    submitEmail(email);
    // Add logic here to handle send button click
  };

  const showAlert=(title, message)=> {
    Alert.alert(
      title,
      message,
      [
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed')
        }
      ]
    );
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:'white' }}>
       <View style={{flexDirection:'row', width:'60%', height: 30, backgroundColor: '#fff' ,justifyContent:'flex-end'}}>
       <TouchableOpacity
       onPress={() => navigation.navigate('Login')}
        >
          <Image source={require('../assets/x.png')} style={{ width: 20, height: 20,resizeMode:'contain' }} />
          </TouchableOpacity> 
        </View>
      <Image source={require('../assets/forgot_logo.png')} style={{ width: 200, height: 150,resizeMode:'contain' }} />
      <Text style={{ fontWeight: 'bold', fontSize: 26, marginTop: 20 ,color:'black'}}>Forgot Password ?</Text>

      <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 20 , color:'black' }}>Don’t worry it happens. Please enter the
the email associated with your account.</Text>
      

      <View style={{ marginTop: 120, width: '80%' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Email</Text>
        <TextInput
          style={{ backgroundColor: '#EFEFEF', padding: 10, borderRadius: 10, marginTop: 5 }}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          placeholderTextColor="#C7C7CD"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoCompleteType="email"
          returnKeyType="send"
          onSubmitEditing={handleSend}
          blurOnSubmit={false}
          accessibilityLabel="Email"
          testID="email"
        />
        <TouchableOpacity
          style={{ backgroundColor: '#234075', borderRadius: 10, marginTop: 20, padding: 10 ,justifyContent:'center'}}
          onPress={handleSend}
          accessibilityLabel="Send Button"
          testID="sendButton"
        >
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18,textAlign:'center' }}>SEND</Text>
        </TouchableOpacity>
      </View>
      <LoadingOverlay loading={loading} />
    </View>
  );
};

export default ForgotPasswordScreen;
