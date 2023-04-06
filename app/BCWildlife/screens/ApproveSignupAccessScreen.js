import React,{useEffect,useState} from 'react';
import { View, Text, Image, Alert,TouchableOpacity, StyleSheet } from 'react-native';
import { getpendinguser_url } from '../network/path';
import axios from '../network/axiosauth';
import createAxiosInstance from '../network/axiosauth';
import EncryptedStorage from 'react-native-encrypted-storage';
import LoadingOverlay from '../utility/LoadingOverlay';
import { ScrollView } from 'react-native-gesture-handler';
import { statuschange_url } from '../network/path';

const ApproveSignupAccessScreen = (navigation) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  let accTokenValue=''

  const onhandleAccept = (item) => {
    console.log(item);
    showAlert('Accept','Are you sure you want to accept this request? ',item);
  }
  const onhandleReject = (item) => {
      showAlert('Reject','Are you sure you want to reject this request?',item);
  }

  const showAlert=(title, message,item)=> {
    Alert.alert(
      title,
      message,
      [
        {
          text: 'Yes',
          onPress: () =>{
            setLoading(true);
            console.log('OK Pressed')
            if(title=='Accept'){
              // approve network request
              let data = JSON.stringify({
                "id": item,
                "status": "approved"
              });
              statusChangeForUser( data);
            }else {
              let data = JSON.stringify({
                "id": item,
                "status": "rejected"
              });
              statusChangeForUser(data);
              // reject network request
            }
            
          } 
        },
        {
          text: 'Cancel',
          onPress: () =>{
            console.log('cancel Pressed')
            // do nothing
          } 
        }
      ]
    );
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


  const handleGoBack = () => {
    navigation.goBack();
  };
  useEffect(() => {
      getTokenClient();
    }, [])
  let tokendata;
  const getTokenClient = async () => {
    setLoading(true);
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
        getPendingSignupAccessRequests(axiosInstance);
      }).catch((error) => {
        console.log(error)
      });
    
  }

  const statusChangeForUser = async (data) => {
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
        axiosInstance.post(statuschange_url, data)
        .then((response) => { 
          if(response.status == 200){
            setLoading(false);
            showAlertOnly('Success','Request processed successfully');
            getTokenClient();
          }else{
            setLoading(false);
            console.log( response.data)
            showAlertOnly('Error',response.data.message);

          }
          }).catch((error) => {
            setLoading(false);
            console.log( response.data)
            showAlertOnly('Error',response.data.message);
          });
      }catch(error){
        setLoading(false);
        console.log(error);
      }
    }).catch((error) => {
      console.log(error)
    });



  
        
        
  }

  const getPendingSignupAccessRequests = (axiosInstance) => {
    try{
      axiosInstance.get(getpendinguser_url)
      .then((response) => { 
        if(response.status == 200){
        datavar = JSON.stringify(response);
        console.log(datavar);
        firstChild = JSON.parse(datavar);
        secondChild = firstChild.data;
        console.log(secondChild);
        thirdChild = secondChild.data;  
        console.log(thirdChild);
        fourthChild = thirdChild.rows;
        console.log(fourthChild);
        fourthChild.forEach(element => {
          console.log(element);
        });
        listItems = fourthChild;
        setItems(listItems);
        setLoading(false);
      }else{
        setLoading(false);
        console.log("Error");
      }
      }).catch((error) => {
        setLoading(false);
        console.log(error);
      });
    }catch(error){
      setLoading(false);
      console.log(error);
    }

  }

  if (items.length === 0) {
    return (
      <View style={{flex:1}}>
        <Text>Loading...</Text>
        <LoadingOverlay loading={loading} />
      </View>
    );
  }
 

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>handleGoBack}>
      <Image style={{height:30,width:30,margin:25}} source={require('../assets/arrow_back_ios.png')} />
      </TouchableOpacity>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../assets/bc_abbreviated.png')} />
        <Text style={styles.title}>Approve Signup Access</Text>
      </View>
      <View style={styles.cardList}>
        <ScrollView>
        {listItems.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardName}>{item.first_name +" "+ item.last_name}  </Text>
            <Text style={styles.cardValue}>{item.email}</Text>
            <View style={styles.cardButtonContainer}>
              <TouchableOpacity
                onPress={() => onhandleAccept(item.id)}
               style={[styles.cardButton, { backgroundColor: '#234075' }]}>
                <Text style={styles.cardButtonText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => onhandleReject(item.id)}
              style={[styles.cardButton, { backgroundColor: '#ccc' }]}>
                <Text style={styles.cardButtonText}>Reject</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoContainer: {
    flex:3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    height: 200,
    width: 200,
    marginRight: 16,
    resizeMode:'contain'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color:'black'
  },
  cardList: {
    flex: 7,
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 16,
    marginBottom: 16,
  },
  cardName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 14,
    marginBottom: 16,
  },
  cardButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardButton: {
    flex: 1,
    height: 32,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  cardButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ApproveSignupAccessScreen;
