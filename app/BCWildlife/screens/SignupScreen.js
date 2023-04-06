import React, { useState } from 'react';
import { Modal } from 'react-native';
import { View, Text, 
  Image, TextInput,
  TouchableOpacity, Alert,StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-simple-toast';
import axios from '../network/axiosutil';
import { register_url } from '../network/path';
import LoadingOverlay from '../utility/LoadingOverlay';


const SignupScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [contact_number, setContactNumber] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  let url = register_url;
  const [showSuccess, setShowSuccess] = useState(false);

  const formatPhoneNumber = (text) => {
    let formattedText = text.replace(/[^0-9]/g, ''); // Remove all non-numeric characters
    if (formattedText.length > 3 && formattedText.length < 7) {
      formattedText = `${formattedText.slice(0, 3)}-${formattedText.slice(3)}`;
    } else if (formattedText.length >= 7) {
      formattedText = `${formattedText.slice(0, 3)}-${formattedText.slice(3, 6)}-${formattedText.slice(6, 10)}`;
    }
    setContactNumber(formattedText);
  }

  function CustomAlertDialog(props) {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.visible}
        onRequestClose={props.onRequestClose}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              style={styles.image}
              source={props.imageSource}
            />
            <View style={styles.textContainer}>
              <Text style={styles.title}>
                {props.title}
              </Text>
              <Text style={styles.message}>{props.message}</Text>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={props.onPress}
            >
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  function handleShowSuccess() {
    setShowSuccess(true);
  }

  function handleOkPress() {
    setShowSuccess(false);
    navigation.navigate('Login')
  }
  const handleSignup = async() => {
    // Add logic here to handle signup button click
    if(!first_name){
      showToast('Invalid First Name')
      return;
    }
    if(!last_name){
      showToast('Invalid Last Name');
      return;
    }
    if(!contact_number){
      showToast('Invalid Contact Number');
      return;
    }
    if(!username){
      showToast('Invalid Username');
      return;
    }

    if (!isValidEmail(email)) {
      showToast('Invalid Email');
      return;
    } 

    if(!password){
      showToast('Invalid password');
      return;
    }
    if(!confirm_password){
      showToast('Invalid Confirm password')
      return;
    }

    if(password.trim() != confirm_password.trim()){
        showToast('Passwords do not match');
        return 
    }
    makeSignupRequest();
  };


  const makeSignupRequest=()=>{
    setLoading(true);
    const axiosInstance = axios.create();
    // Add a request interceptor
    
  

    const data = {
      first_name:first_name,
      last_name:last_name,
      email:email,
      username:username,
      contact_number:contact_number,
      password:password,
      confirm_password:confirm_password
    };
  
    axiosInstance.post(url, data)
      .then(function (response) {
        console.log(response.data);
        setLoading(false);
        if (response.status === 200) {
          console.log('Success! Response code: ' + response.status);
          handleShowSuccess();
        } else {
          showAlert('Error',response.data.message);
          console.log('Error! Response code: ' + response.status);
          
        }
      })
      .catch(function (error) {
        setLoading(false);
        console.log('Error:', error);
      });
  
  }


  const showToast = (message) => {
    Toast.show(message,Toast.SHORT);
  };

  const isValidEmail=(email) =>{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }


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
          value={first_name}
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
          value={last_name}
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
          value={contact_number}
          placeholder="Enter your contact number"
          placeholderTextColor="#C7C7CD"
          returnKeyType="next"
          onChangeText={formatPhoneNumber}
          keyboardType="phone-pad"
          maxLength={12}
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
          secureTextEntry={true}
          returnKeyType="next"
        
          blurOnSubmit={false}
          accessibilityLabel="Contact Number"
          testID="contactNumber"
        />
        <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 20 }}>confirm Password</Text>
        <TextInput
          style={{ backgroundColor: '#EFEFEF', padding: 10, borderRadius: 10, marginTop: 5 }}
          value={confirm_password}
          onChangeText={setConfirmPassword}
          placeholder="Confirm Password"
          placeholderTextColor="#C7C7CD"
          secureTextEntry={true}
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
        <CustomAlertDialog
          visible={showSuccess}
          imageSource={require('../assets/bc_elongated.png')}
          title="Signup Success!"
          message="Thank you for signing up. Please wait for approval."
          onPress={handleOkPress}
        />
        <LoadingOverlay loading={loading} />
      </View>
   </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center'
  },
  image: {
    width: 160,
    height: 160,
    marginBottom: 16
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 16
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8
  },
  message: {
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#234075',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignSelf: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default SignupScreen;

        