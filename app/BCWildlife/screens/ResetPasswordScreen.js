import React, { useState } from 'react';
import { View, Text, Image, TextInput,Alert, TouchableOpacity } from 'react-native';
import axiosUtility from '../network/AxiosUtility';
import { resetpass_url } from '../network/path';
import LoadingOverlay from '../utility/LoadingOverlay';
import { ScrollView } from 'react-native-gesture-handler';
import { getAccessToken } from '../global';

const ResetPasswordScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [password,setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');


  const configAuth = () => { 
    let token = getAccessToken();
    let AuthStr = 'Bearer '.concat(token);
    return { headers: { Authorization: AuthStr } };
  }
  
  const submitPassword = async () => {
    setLoading(true);
  
    const data = {
      new_password: password,
      confirm_password: confirmPassword,
    };

    axiosUtility.post(resetpass_url, data, configAuth() )
    .then((response) => {
      setLoading(false);
      console.log('Response:', response);
      if(response.type=='success'){
        console.log('Success');
        showAlert('Success',response.message);
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
    if (!password || !confirmPassword) {
      showAlert('Error','Please enter password');
      return;
    }

    if(password!=confirmPassword){
      showAlert('Error','Password does not match');
      return;
    }

    submitPassword();
  };

  const showAlert=(title, message)=> {
    Alert.alert(
      title,
      message,
      [
        {
          text: 'OK',
          onPress: () => {
            console.log('OK Pressed')
            if(title=='Success'){
              navigation.navigate('Profile');
            }
          }
        }
      ]
    );
  }

  return (
    <ScrollView style={{backgroundColor:'white'}}>
    <View style={{ flex: 1, alignItems: 'center',marginTop:100, justifyContent: 'center',backgroundColor:'white' }}>
       <View style={{flexDirection:'row', width:'60%', height: 30, backgroundColor: '#fff' ,justifyContent:'flex-end'}}>
       <TouchableOpacity
       onPress={() => navigation.navigate('Profile')}
        >
          <Image source={require('../assets/x.png')} style={{ width: 20, height: 20,resizeMode:'contain' }} />
          </TouchableOpacity> 
        </View>
      <Image source={require('../assets/forgot_logo.png')} style={{ width: 200, height: 150,resizeMode:'contain' }} />
      <Text style={{ fontWeight: 'bold', fontSize: 26, marginTop: 20 ,color:'black'}}>Reset Password </Text>
      

      <View style={{ marginTop: 60, width: '80%' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>New Password</Text>
        <TextInput
          style={{ backgroundColor: '#EFEFEF', padding: 10, borderRadius: 10, marginTop: 5 }}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter new password"
          placeholderTextColor="#C7C7CD"
          returnKeyType="send"
          blurOnSubmit={false}
          secureTextEntry={true}
          autoCompleteType="password"
          accessibilityLabel="newpassword"
          testID="newpassword"
        />

        <Text style={{ fontWeight: 'bold', fontSize: 16,marginTop:20 }}>Confirm Password</Text>
        <TextInput
          style={{ backgroundColor: '#EFEFEF', padding: 10, borderRadius: 10, marginTop: 5 }}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm new password"
          placeholderTextColor="#C7C7CD"
          returnKeyType="send"
          secureTextEntry={true}
          autoCompleteType="password"
          blurOnSubmit={false}
          accessibilityLabel="confpassword"
          testID="confnewpassword"
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
    </ScrollView>
  );
};

export default ResetPasswordScreen;
