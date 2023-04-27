import React,{useEffect} from 'react';
import { View, Text,Alert, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import LoadingOverlay from '../utility/LoadingOverlay';
import EncryptedStorage from 'react-native-encrypted-storage';
import { addproject_url } from '../network/path';
import axiosUtility from '../network/AxiosUtility';
import DateTimePickerModal from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import { getAccessToken,getUsernameG, setUsernameG } from '../global';


const AddProjectScreen = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  let refreshTokenCount = 0;

  const configAuth = () => { 
    let token = getAccessToken();
    let AuthStr = 'Bearer '.concat(token);
    return { headers: { Authorization: AuthStr } };
  }

  useEffect( () => {
      handleLocalValue();
    }, [])

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

    const handleDateChange = (event, newDate) => {
      setShowPicker(Platform.OS === 'ios');
      if (newDate !== undefined) {
        setDate(newDate);
      }
    };
  
    const togglePicker = () => {
      setShowPicker(true);
    };
  

    const handleLocalValue =  () => {
      (async () => {
      const token = await EncryptedStorage.getItem("user_session")
      .then((token) => {
        console.log(token) 
        tokendata = JSON.parse(token);
        console.log(tokendata);
        let dataitem = tokendata.data.username;
        console.log(dataitem);
        setUsernameG(dataitem);
        setUsername(dataitem);
      }).catch((error) => {
        console.log(error)
      });
    })();
  }

    const showAlertOnly=(title, message)=> {
      Alert.alert(
        title,
        message,
        [
          {
            text: 'Ok',
            onPress: () =>{
              console.log('OK Pressed')
            } 
          }
        ]
      );
    }



    const handleAddProject = () => {
      if(this.projectId=='' || this.studyArea=='' || this.surveyId==''){
        showAlertOnly('Error','Please fill all the fields');
      }else{
        setLoading(true);
       addProjectNetworkCall();
      }
    }

    async function addProjectNetworkCall(username, projectId, studyArea, surveyId, creationDate) {
    
    
      const data = {
        username:getUsernameG(),
        project_id: this.projectId,
        study_area: this.studyArea,
        survey_id: this.surveyId,
        creation_date: date,
      };
  
      //console.log('configAuth',configAuth());

    try{
      axiosUtility.post(addproject_url, data, configAuth())
      .then((response) => {
        console.log(response);
        setLoading(false);
        showAlertOnly('Success','Project added successfully');
        navigateToDashboard();
      }).catch((error) => {
        setLoading(false);
        if (error.response) {
          let errorMessage = error.response.data.message;
          if(errorMessage.indexOf('token') > -1 && refreshTokenCount < 1){
            generateNewAccessToken()
            .then((response) => {
              refreshTokenCount++;
              console.log('new access token generated');
              axiosUtility.post(addproject_url, data, configAuth())
              .then(response => {
                showAlertOnly('Success',response.message);
                navigateToDashboard();
                setLoading(false);
              }).catch((error) => {
                setLoading(false);
                if (error.response) {
                  console.log('Response error:', error.response.data);
                  showAlertOnly('Error',error.response.data.message);
                } else if (error.request) {
                  console.log('Request error:', error.request);
                  showAlertOnly('Error',error.response.data.message);
                } else {
                  console.log('Error message:', error.message);
                  showAlertOnly('Error',error.response.data.message);
                }
              });
            }).catch((error) => {
              refreshTokenCount++;
              console.log('error generating new access token');
            });
          }
          console.log('Response error:', error.response.data);
          showAlertOnly('Error',error.response.data.message);
        } else if (error.request) {
          console.log('Request error:', error.request);
          showAlertOnly('Error',error.response.data.message);
        } else {
          console.log('Error message:', error.message);
          showAlertOnly('Error',error.response.data.message);
        }
      });

    }catch(error){
      console.log(error);
      setLoading(false);
      showAlertOnly('Error','Something went wrong');
  
    }

  }
    

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../assets/bc_abbreviated.png')} />
        <Text style={styles.projectTitle}>Project</Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput style={styles.input} editable={false} 
         value={username}
          />
        <TextInput style={styles.input} placeholder="Project ID" 
        onChangeText={(text) => this.projectId = text}/>

        <TextInput style={styles.input} placeholder="Study Area" 
        onChangeText={(text) => this.studyArea = text}
        />

        <TextInput style={styles.input} placeholder="Survey ID" 
        onChangeText={(text) => this.surveyId = text}
        />

      <TextInput
        style={styles.input}
        value={date.toLocaleDateString()}
        onFocus={togglePicker}
      />
      {showPicker && (
        <DateTimePickerModal
          mode="date"
          value={date}
          display="default"
          onChange={handleDateChange}
        />
      )}
         
        <TouchableOpacity style={styles.addButton}
        onPress={()=>handleAddProject()}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <LoadingOverlay loading={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 32,
    alignItems: 'center',
    resizeMode: 'contain',
  },
  logo: {
    height: 190,
    width: 190,
    resizeMode:'contain'
  },
  projectTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 16,
    color:'black'
  },
  formContainer: {
    flex: 2,
    alignItems: 'center',
    paddingHorizontal: 32,
    marginTop: 32,
  },
  input: {
    height: 48,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  addButton: {
    height: 48,
    width: '100%',
    backgroundColor: '#234075',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default AddProjectScreen;
