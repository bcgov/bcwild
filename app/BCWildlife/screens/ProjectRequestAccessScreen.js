import React, { useState ,useEffect} from 'react';
import { View, Text,Alert, Image,TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import LoadingOverlay from '../utility/LoadingOverlay';
import { Picker } from '@react-native-picker/picker';
import { getAccessToken } from '../global';
import { getprojects_url ,requestprojaccess_url} from '../network/path';
import AxiosUtility from '../network/AxiosUtility';



const ProjectRequestAccessScreen = () => {
  const[loading,setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState('submitter');
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');

  let refreshTokenCount = 0;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let token = getAccessToken();
    let AuthStr = 'Bearer '.concat(token);
    const config = { headers: { Authorization: AuthStr } };
      try {
        const response = await AxiosUtility.get(getprojects_url, config);
        setProjects(response.data.rows);
        setSelectedProject(response.data.rows[0].project_id);
      } catch (error) {
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
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [])


  const handleProjectChange = (value) => {
    setSelectedProject(value);
    console.log(value);
  };

  const handleRoleChange = (value) => {
    setSelectedRole(value);
    console.log(value);
  };

 

  const configAuth = () => { 
    let token = getAccessToken();
    let AuthStr = 'Bearer '.concat(token);
    return { headers: { Authorization: AuthStr } };
  }

  const submitRequest = async () => {
    setLoading(true);
    const data = {
      project_id: selectedProject,
      project_role: selectedRole
    }

    try {
      AxiosUtility.post(requestprojaccess_url, data, configAuth())
      .then((response) => {
        console.log(response.data);
        showAlertOnly('Success',response.message);
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
    } catch (error) {
      setLoading(false);
      console.log('Error:', error);
    }
    
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


  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../assets/bc_abbreviated.png')} />
        <Text style={styles.projectTitle}>Project</Text>
      </View>
      <View style={styles.formContainer}>
      <Picker
          style={{borderColor:'red',
          borderWidth: 1,
             height: 50, 
            width: 200, color: '#000'}}
          selectedValue={selectedProject}
          onValueChange={handleProjectChange}
        >
          {projects.map((project) => (
            <Picker.Item
              key={project.id}
              label={project.project_id}
              value={project.project_id}
            />
          ))}
        </Picker>
        <View style={styles.radioContainer}>
          <TouchableOpacity style={[styles.radioButton, selectedRole === 'submitter' && styles.radioButtonSelected]} onPress={() => handleRoleChange('submitter')}>
            <Text style={[styles.radioText, selectedRole === 'submitter' && styles.radioTextSelected]}>Submitter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.radioButton, selectedRole === 'manager' && styles.radioButtonSelected]} onPress={() => handleRoleChange('manager')}>
            <Text style={[styles.radioText, selectedRole === 'manager' && styles.radioTextSelected]}>Manager</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.requestAccessButton}
         onPress={()=>submitRequest()}>
          <Text style={styles.requestAccessButtonText}>Request Access</Text>
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
    marginVertical: 16,
    marginHorizontal: 8,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'contain',
  },
  projectTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 16,
    color: 'black',
  },
  formContainer: {
    flex: 2,
    alignItems: 'center',
    paddingHorizontal: 32,
    gap: 16,
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
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  radioButton: {
    height: 84,
    width: 104,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: '#234075',
    backgroundColor: '#234075',
  },
  radioText: {
    fontSize: 16,
    color: '#000',
  },
  radioTextSelected: {
    color: '#fff',
  },
  requestAccessButton: {
    height: 48,
    width: '100%',
    backgroundColor: '#234075',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  requestAccessButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
 
  label: {
    fontWeight: 'bold',
  },
});

export default ProjectRequestAccessScreen;