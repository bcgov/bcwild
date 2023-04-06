import React, { useState ,useEffect} from 'react';
import { View, Text, Image, TextInput,Alert, TouchableOpacity } from 'react-native';
import axios from '../network/axiosutil';
import { login_url } from '../network/path';
import EncryptedStorage from 'react-native-encrypted-storage';
import LoadingOverlay from '../utility/LoadingOverlay';




const LoginScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  axiosInstance = axios.create();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    navigateToDashboard();
    }, [])

  function validateCredentials(username, password) {
    if (!username || !password) {
      return false;
    }
    return true;
  }

  const showAlert=(title, message)=> {
    Alert.alert(
      title,
      message,
      [
        {
          text: 'OK',
          onPress: () =>{
            console.log('OK Pressed')
            if(title=='Success'){
              navigateToDashboard();
            }// else do nothing
            
          } 
        }
      ]
    );
  }

  const navigateToDashboard = async () => {
    const session = await EncryptedStorage.getItem("user_session");
    console.log(session);
    if(!session){
      return;
    }
    const obj = JSON.parse(session);
    if(obj.data.role=='admin'){
      navigation.navigate('Dashboard',{admin:true});
    }else{
      navigation.navigate('Dashboard',{admin:false});
    }
  }

  const handleLogin = () => {
    if(!validateCredentials(username, password)) {
      showAlert('Error','Invalid credentials')
      console.error('Invalid credentials');
      return;
    }
    const data = {
      username: username,
      password: password
    };
    setLoading(true);
    axiosInstance.post(login_url, data)
      .then(async (response) => {
      setLoading(false); 
        if (response.status === 200) {
          console.log('Success! Response code: ' + response.status);
          try {
            await EncryptedStorage.setItem(
                "user_session",
                JSON.stringify(response.data)
            );
            // Congrats! You've just stored your first value!
        } catch (error) {
            console.log(error);
            // There was an error on the native side
        }
          showAlert('Success',response.data.message);
        } else {
          showAlert('Error',response.data.message);
          console.log('Error! Response code: ' + response.status); 
        }
      
      })
      .catch((error) => {
        setLoading(false); 
        console.error('Error during login');
        console.error(error);
      });
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
      <LoadingOverlay loading={loading} />
    </View>
  );
};

export default LoginScreen;
