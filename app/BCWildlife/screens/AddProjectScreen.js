import React,{useEffect} from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import LoadingOverlay from '../utility/LoadingOverlay';
import EncryptedStorage from 'react-native-encrypted-storage';
import { addproject_url } from '../network/path';
import createAxiosInstance from '../network/axiosauth';

const AddProjectScreen = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [date,setDate] = useState('ddMMMyyyy');
  const [projectId,setProjectId] = useState('');
  const [studyArea,setStudyArea] = useState('');

  useEffect(async () => {
      handleLocalValue();
    }, [])

    const handleLocalValue = async () => {
      const token = await EncryptedStorage.getItem("user_session")
      .then((token) => {
        console.log(token) 
        tokendata = JSON.parse(token);
        console.log(tokendata);
        let dataitem = tokendata.data.username;
        console.log(dataitem);
        setUsername(dataitem);
        //accTokenValue = accToken;
        //const axiosInstance = createAxiosInstance(accToken);
        //getPendingSignupAccessRequests(axiosInstance);
      }).catch((error) => {
        console.log(error)
      });

      const today = new Date();

      const day = today.getDate().toString().padStart(2, '0');
      const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(today);
      const year = today.getFullYear();

      const dateString = `${day} ${month} ${year}`;
      setDate(dateString);
    
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

    const clearAllValues = () => {
      setProjectId('');
      setStudyArea('');
    }


    const addProject = async () => {

      const data = {
        "project_id": projectId,
        "study_area": studyArea,
        "creation_date": date,
        "username": username,
        "survey_id": "1"
      }

      const token = await EncryptedStorage.getItem("user_session")
    .then((token) => {
      console.log(token) 
      tokendata = JSON.parse(token);
      console.log(tokendata);
      let dataitem = tokendata.data.tokens;
      let accToken = dataitem.accessToken;
      console.log(accToken);
      accTokenValue = accToken;
      const axiosInstance = createAxiosInstance(accToken);
      try{
        axiosInstance.post(addproject_url, data)
        .then((response) => { 
          if(response.status == 200){
            setLoading(false);
            showAlertOnly('Success','Request processed successfully');
            clearAllValues();
          }else{
            setLoading(false);
            console.log( response.data)
            showAlertOnly('Error',response.data.message);
          }
          }).catch((error) => {
            setLoading(false);
            console.log( error.data)
            showAlertOnly('Error',error.data.message);
          });
      }catch(error){
        setLoading(false);
        console.log(error);
      }
    }).catch((error) => {
      console.log(error)
    });

    }
  

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../assets/bc_abbreviated.png')} />
        <Text style={styles.projectTitle}>Project</Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput style={styles.input} editable={false} 
         value={username} />
        <TextInput style={styles.input} 
        value={projectId} placeholder="Project ID" 
        onChange={setProjectId}/>
        <TextInput style={styles.input} placeholder="Study Area" 
        value={studyArea}
        onChange={setStudyArea}/>
        <TextInput style={styles.input} placeholder="Creation Date"
        value={date}
        onChange={setDate}
         />
        <TouchableOpacity style={styles.addButton}
        onPress={()=>addProject()}>
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
