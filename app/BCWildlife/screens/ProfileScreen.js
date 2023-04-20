import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacit,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import RecordsRepo from '../utility/RecordsRepo';

const ProfileScreen = ({navigation}) => {
  const [fname,setFname] = useState('');
  const [lname,setLname] = useState('');
  const [userPhoto, setUserPhoto] = useState(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [projects, setProjects] = useState([]);
  const [fullname, setFullname] = useState('');

  useEffect(() => {
    renderProfile();
  }, []);

  const handleResetPassword = () => {
    // navigation to ResetPasswordScreen
    console.log('Reset Password');
    navigation.navigate('ResetPassword');
  };

  const handleExport = () => {
    // handle export logic
    RecordsRepo.getUnsyncedRecords().then((records) => {
      console.log(records);
    });

    console.log('Export');  

  };
  const handleUpdatePhoto = () => {
    // handle user photo update logic
    console.log('Update Photo');
    showAlert('Update Photo','Are you sure you want to Replace your photo?');
  };

  const renderProfile = async() => {
    try{
    const session = await EncryptedStorage.getItem("user_session");
      console.log(session);
      if(!session){
        return;
      }
      const obj = JSON.parse(session);
      setFullname(obj.data.first_name+' ' +obj.data.last_name);
      setFname(obj.data.first_name);
      setLname(obj.data.last_name);
      console.log(obj.data.first_name+' ' +obj.data.last_name);
      console.log(fullname)
      setUserEmail(obj.data.email);
      console.log(obj.data.email);
      setProjects(obj.data.projects);
      console.log(obj.data.projects);

    } catch(e){
      console.log(e);
    }

    
  };



  const handleLogout = async () => {
    try{
       await EncryptedStorage.clear()
    .then(() => console.log('success'))
    .catch(err => console.log(err));
      navigation.navigate('Login');
    }catch(e){
      console.log(e);
    }
  };

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

  const showAlert=(title, message)=> {
    Alert.alert(
      title,
      message,
      [
        {
          text: 'Yes',
          onPress: () =>{
            console.log('Yes Pressed')
            if(title=='Logout'){
              handleLogout();
            }
          } 
        },
        {
          text: 'No',
          onPress: () =>{
            console.log('No Pressed')
          } 
        }
      ]
    );
  }



  return (
    <ScrollView>
    <View style={styles.container}>

        <View style={{ flexDirection:'row' , width:'100%',justifyContent:'space-between'}}>
            <TouchableOpacity onPress={() => navigateToDashboard()}>
                <Image source={require('../assets/arrow_back_ios.png')}
                style={{height:25,width:25 , marginTop:30}} /> 
                </TouchableOpacity>  
            <Image source={require('../assets/bc_abbreviated.png')} 
            style={{height:90,
                width:90,resizeMode:'contain',marginLeft:35}} />
            <TouchableOpacity
             onPress={() => showAlert('Logout','Are you sure you want to Logout?')}>
              <Image style={styles.l_image} source={require('../assets/logout.png')} />
            </TouchableOpacity>
        </View>
        

      <View style={styles.photoContainer}>
        <TouchableOpacity onPress={handleUpdatePhoto}>
          <Image
            style={styles.photo}
            source={userPhoto ? { uri: userPhoto } : require('../assets/placeholder_profile.png')}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{fullname}</Text>
      </View>

      <Text style={styles.sectionHeader}>User Details</Text>
      <View style={styles.section}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ marginLeft:15 ,marginTop:10,fontSize:20}}>First Name</Text>
        <Text style={{marginRight:15 ,marginTop:10,fontSize:20}}>{fname}</Text>                  
        </View>
        <View
                    style={{
                      borderBottomColor: 'black',
                      borderBottomWidth: StyleSheet.hairlineWidth,
                      }}
            />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ marginLeft:15 ,fontSize:20}}>Last Name</Text>
        <Text style={{ marginRight:15 ,fontSize:20}}>{lname}</Text>
        </View>
        <View
                    style={{
                      borderBottomColor: 'black',
                      borderBottomWidth: StyleSheet.hairlineWidth,
                      }}
            />
       
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ marginLeft:15 ,marginBottom:10,fontSize:20}}>Contact Email</Text>
        <Text style={{ marginRight:15 ,marginBottom:10,fontSize:18}}>{userEmail}</Text>
        </View>
      </View>

      <View style={styles.sectionPlain}>
        <TouchableOpacity onPress={handleResetPassword}>
          <Text style={styles.sectionHeaderResetPass}>Click Here to Reset Password</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionHeader}>Project Authorization </Text>
      <View style={styles.section}>
          <View>
            {projects.map((project, index) => (
              <View key={project.id}>
                <Text style={{fontSize:20,marginLeft:15}}>{project.project_id}</Text>
                {index !== projects.length - 1 && <View
                style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  }}
                />
                }
              </View>
            ))}
          </View>
      </View>
      <View style={{marginTop: 5,
         width: '100%',marginBottom:35}}>
        <TouchableOpacity onPress={handleExport}>
          <Text style={styles.sectionHeaderResetPass}>Click Here to Export</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    padding: 20,
  },
  photoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  photo: {
    width: 120,
    height: 120,
    resizeMode: 'contain'
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5
  },
  title: {
    fontSize: 28,
    color: 'black',
    marginBottom: 5,
    marginTop: 15,
  },

  email: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    marginTop: 20,
    width: '100%',
    backgroundColor: '#E8E8E8',
    borderRadius: 20,
  },
  sectionPlain: {
    marginTop: 5,
    width: '100%',
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 15,
    alignSelf: 'flex-start',
  },
  sectionPlus: {
    fontSize: 30,
    color: '#000',
    marginRight: 15,
    alignSelf: 'flex-end',
  },
  sectionHeaderResetPass: {
    fontSize: 18,
    color: '#234075',
    marginLeft: 15,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  l_image: {
    width: 60,
    height: 60,
    resizeMode: 'contain'
  }
});

export default ProfileScreen;
