import React,{useEffect} from 'react';
import { View,Text,StyleSheet,
  Image,TouchableOpacity,Alert } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { BackHandler } from 'react-native';


const DashboardScreen = ({route,navigation}) => {
  const { admin } = route.params;
  

  // useEffect(() => {
  //   const backAction = () => {
  //     BackHandler.exitApp();
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction
  //   );
  //   return () => backHandler.remove();
  // }, []);

  
  const handleApproveSignupReqs = () => {
    navigation.navigate('ApproveSignupAccess');
  }

  const handleAddProject = () => {
    navigation.navigate('AddProject');
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
            handleLogout();
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


  const handleLogout = async () => {
    await EncryptedStorage.clear()
    .then(() => console.log('success'))
    .catch(err => console.log(err));
    navigation.navigate('Login');
  };

  return (
    <View style={{flex:1,flexDirection:'column',backgroundColor: 'white',rowGap:35}}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={require('../assets/bc_notext.png')} />
        </View>
        <View style={styles.imageContainer}>
          <Image style={styles.c_image} source={require('../assets/bc_logo.png')} />
        </View>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={() => showAlert('Logout','Are you sure you want to Logout?')}>
            <Image style={styles.l_image} source={require('../assets/logout.png')} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{flex:1 ,marginTop:90, flexDirection:'row',alignItems:'center'}}>
       
         <Image style={{height:15,width:15,marginLeft:20}} source={require('../assets/plus_sign.png')} />
         <TouchableOpacity onPress={()=>handleAddProject()}>
         <Text style={{fontSize:20,color:'black',fontWeight:'bold',marginLeft:10}}>Project Setup</Text>
         </TouchableOpacity>
      </View>

      <View style={{flex:1 ,marginTop:10,paddingVertical:50,
         flexDirection:'row',alignItems:'center',
         justifyContent:'space-evenly',
         backgroundColor:'#E8F0FF'}}>
          <Image style={{height:80,width:80,resizeMode:'contain'}} source={require('../assets/cam_trap.png')} />
          <Image style={{height:95,width:95, resizeMode:'contain'}} source={require('../assets/telemetry.png')} />
      </View>
      <View style={{flex:1 ,marginTop:10, flexDirection:'row',alignItems:'center'}}>
        <Image style={{height:15,width:15,marginLeft:20,resizeMode:'contain'}} source={require('../assets/proj_req_ico.png')} />
        <TouchableOpacity onPress={()=>navigation.navigate('ProjectAccess')}>
        <Text style={{fontSize:20,color:'black',fontWeight:'bold',marginLeft:10}}>Project Request</Text>
          </TouchableOpacity>
     </View>
      {admin ? (
        <View style={{flex:1 ,marginTop:0,paddingVertical:50,
          flexDirection:'row',alignItems:'center',
          justifyContent:'space-evenly',
          backgroundColor:'#E8F0FF'}}>
           <Image style={{height:90,width:90,resizeMode:'contain'}} source={require('../assets/approve_req_access.png')} />
           <TouchableOpacity onPress={()=>handleApproveSignupReqs()}>
           <Image style={{height:85,width:85, resizeMode:'contain'}} source={require('../assets/approve_signup_access.png')} />
           </TouchableOpacity>
       </View>
      ) : null}
     <View style={{flex:1 ,marginTop:10, flexDirection:'row',alignItems:'center'}}>
        <Image style={{height:25,width:25,marginLeft:20,resizeMode:'contain'}} source={require('../assets/ack_ico.png')} />
        <Text style={{fontSize:20,color:'black',fontWeight:'bold',marginLeft:10}}>Acknowledgements / Glossary</Text>
     </View>
      <View style={{flex:4}}>
        <></>
      </View>  
    </View>
  );
 
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  imageContainer: {
    margin: 10
  },
  image: {
    width: 80,
    height: 90,
    resizeMode: 'contain'
  },
  c_image: {
    width: 160,
    height: 70,
    resizeMode: 'contain'
  },
  l_image: {
    width: 70,
    height: 70,
    resizeMode: 'contain'
  }
});

export default DashboardScreen;
