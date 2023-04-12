import React,{useEffect} from 'react';
import { View, Text,Alert, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import LoadingOverlay from '../utility/LoadingOverlay';
import EncryptedStorage from 'react-native-encrypted-storage';
import { addproject_url } from '../network/path';
import axiosUtility from '../network/AxiosUtility';

const AddProjectScreen = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [date,setDate] = useState('');
  const [projectId,setProjectId] = useState('');
  const [studyArea,setStudyArea] = useState('');
  const [surveyId,setSurveyId] = useState('');

  useEffect( () => {
      handleLocalValue();
    }, [])

    const handleLocalValue =  () => {
      (async () => {
      const token = await EncryptedStorage.getItem("user_session")
      .then((token) => {
        console.log(token) 
        tokendata = JSON.parse(token);
        console.log(tokendata);
        let dataitem = tokendata.data.username;
        console.log(dataitem);
        setUsername(dataitem);
      }).catch((error) => {
        console.log(error)
      });
    })();

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
      setSurveyId('');
    }

    const handleAddProject = () => {
      if(projectId=='' || studyArea=='' || surveyId==''){
        showAlertOnly('Error','Please fill all the fields');
      }else{
        setLoading(true);
        addProjectNetworkCall(username, projectId, studyArea, surveyId, date);
        //showAlertOnly('Success','Project added successfully');
        //clearAllValues();
      }
    }

    async function addProjectNetworkCall(username, projectId, studyArea, surveyId, creationDate) {
      if (!username || username.trim() === '') {
        console.error('Username cannot be null or empty.');
        return;
      }
    
      if (!projectId || projectId.trim() === '') {
        console.error('Project ID cannot be null or empty.');
        return;
      }
    
      if (!studyArea || studyArea.trim() === '') {
        console.error('Study area cannot be null or empty.');
        return;
      }
    
      if (!surveyId || surveyId.trim() === '') {
        console.error('Survey ID cannot be null or empty.');
        return;
      }
    
      if (!creationDate || creationDate.trim() === '') {
        console.error('Creation date cannot be null or empty.');
        return;
      }
    
      // Convert creationDate to required format (DD/MM/YYYY)
      const dateObj = new Date(creationDate);
      const day = dateObj.getDate().toString().padStart(2, '0');
      const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
      const year = dateObj.getFullYear().toString();
      const formattedDate = `${day}/${month}/${year}`;
    
      const data = {
        username,
        project_id: projectId,
        study_area: studyArea,
        survey_id: surveyId,
        creation_date: formattedDate,
      };
    
      
      try {
        const USER_TOKEN = await EncryptedStorage.getItem('accessToken')
      const AuthStr = 'Bearer '.concat(USER_TOKEN); 

        axiosUtility.post(addproject_url, data,
          { headers: { Authorization: AuthStr } })
        .then(response => {
          setLoading(false);
          console.log('Response:', response.data);
          showAlertOnly('Success','Project added successfully');
          clearAllValues();
        }).catch((error) => {
          setLoading(false);
          if (error.response) {
            console.log('Response error:', error.response.data);
            showAlertOnly('Error',error.response.data.message);
          } else if (error.request) {
            console.log('Request error:', error.request);
            showAlertOnly('Error','Request error');
          } else {
            console.log('Error', error.message);
            showAlertOnly('Error','Error');
          }
        });
      } catch (error) {
        setLoading(false);
        console.error(error);
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
         value={username} />
        <TextInput style={styles.input} placeholder="Project ID" 
        
        onChange={setProjectId}/>

        <TextInput style={styles.input} placeholder="Study Area" 
        
        onChange={setStudyArea}/>

        <TextInput style={styles.input} placeholder="Survey ID" 
        
        onChange={setSurveyId}/>

        <TextInput style={styles.input} placeholder="Creation Date"
          value={date}
        onChange={setDate}
         />
             

         
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
