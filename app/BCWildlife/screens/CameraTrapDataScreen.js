import React, { useEffect,useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import EncryptedStorage from 'react-native-encrypted-storage';
import Location from './Location';



const CameraTrapDataScreen = () => {
  const [projects, setProjects] = React.useState([]);
  const [selectedValueProject, setSelectedValueProject] = useState(null);
  const [deployCheck, setDeployCheck] = React.useState('deploy');
  const [cameraAttached, setCameraAttached] = React.useState(false);
  const [isDeployView, setIsDeployView] = React.useState(true);
  const [fieldcrew, setFieldcrew] = React.useState('');
  const [dateTime, setDateTime] = React.useState('');
  const [stationId, setStationId] = React.useState('');
  const [stationNorthing, setStationNorthing] = React.useState('');
  const [stationEasting, setStationEasting] = React.useState('');
  const [securityBox, setSecurityBox] = React.useState('');
  const [cameraHeight, setCameraHeight] = React.useState('');
  const [cameraDirection, setCameraDirection] = React.useState('');
  const [cameraId,setCameraId] = React.useState('');
  const [cameraMake, setCameraMake] = React.useState('');
  const [customCamera, setCustomCamera] = React.useState(false);
  const [customCamValue,setCustomCamValue] = React.useState('');
  const [cameraModel, setCameraModel] = React.useState('');
  const [sdCardId,setSdCardId] = React.useState('');
  const [keyId, setKeyId] = React.useState('');
  const [visibility, setVisiblity] = React.useState('');
  const [habitatType, setHabitatType] = React.useState('');
  const [project_id, setProjectId] = React.useState('');
  const [surveyId,setSurveyId] = React.useState('');
  const [customHabitat, setCustomHabitat] = React.useState(false);
  const [customHabitatValue, setCustomHabitatValue] = React.useState('');
  const [targetFeature, setTargetFeature] = React.useState('');
  const [customTargetFeature, setCustomTargetFeature] = React.useState(false);
  const [customTargetFeatureValue, setCustomTargetFeatureValue] = React.useState('');
  const [distanceFeature, setDistanceFeature] = React.useState('');
  const [quitePeriod, setQuitePeriod] = React.useState('0');
  const [triggerSensitivity, setTriggerSensitivity] = React.useState('Low');
  const [triggerTiming, setTriggerTiming] = React.useState('0');
  const [photosTrigger, setPhotosTrigger] = React.useState('1');

  const [cameraActiveArriving, setCameraActiveArriving] = React.useState(false);
  const [cameraRemoved, setCameraRemoved] = React.useState(false);
  const [cameraReplaced, setCameraReplaced] = React.useState(false);
  const [batteriesReplaced, setBatteriesReplaced] = React.useState(false);
  const [sdCardReplaced, setSdCardReplaced] = React.useState(false);
  const [locationPermission, setLocationPermission] = useState(null);


 
  

  useEffect(() => {
    handleLocalValues();
  }, []);

  const handleValueChange = (value) => {
    console.log(value);
    setSelectedValueProject(value);
    projects.map(project => {
      if (project.project_id === value) {
        setSurveyId(project.project.survey_id);
      }
    });
  };

  const handleLocalValues = async() => {
    try{
      const projectsData = await EncryptedStorage.getItem('projects');
      console.log(projectsData);
      var proj = JSON.parse(projectsData);
      setProjects(proj);

          // datetime 
      const currentDate = new Date();
      const day = currentDate.getDate();
      const month = currentDate.toLocaleString('default', { month: 'short' });
      const year = currentDate.getFullYear();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();

      const formattedDate = `${day} ${month} ${year} ${hours}:${minutes}`;
      setDateTime(formattedDate);
    }catch(error){
      console.log(error);
    }

  }

  const handleDeployCheck= (itemValue) => {
      console.log(itemValue);
      setDeployCheck(itemValue);
      if (itemValue === 'deploy') {
        setIsDeployView(true);
      }else{
        setIsDeployView(false);
      }
  }

  const handleHabitatType = (itemValue) => {
    console.log(itemValue);
    setHabitatType(itemValue);
    if (itemValue === 'Other') {
      setCustomHabitat(true);
    }else{
      setCustomHabitat(false);
    } 
  }

  const showCustomInputForHabitat = () => {
    if (customHabitat) {
      return (<View style={styles.inputContainer}>
        <Text style={styles.inputLabel}> Custom habitat type </Text>
        <TextInput
          style={styles.input}
          placeholder="Custom habitat type"
          keyboardType="default"
          value={customHabitatValue}
          onChangeText={(text) => setCustomHabitatValue(text)}
        />
      </View>);
    } else {
      return <></>;
    }
  };


  const handlecameraMake = (itemValue) => {
    console.log(itemValue);
    if (itemValue === 'Other') {
      setCameraMake(itemValue);
      setCustomCamera(true);
    }else{
      setCameraMake(itemValue);
      setCustomCamera(false);
    }
  }

  const handleCustomCameraMake = (text) => {
    console.log(text);
    setCustomCamValue(text);
    //setCameraMake(text);
  }

  const showCustomInputCameraMake = () => {
    if (customCamera) {
      return (<View style={styles.inputContainer}>
           <Text style={styles.inputLabel}> Custom camera make </Text>
              <TextInput
                style={styles.input}
                placeholder="Custom camera make"
                keyboardType="default"
                value={customCamValue}
                onChangeText={(text) => handleCustomCameraMake(text)}
              />
              </View>);
    } else {
      return <></>;
    }
  };

  const handleTargetFeature = (itemValue) => {
    console.log(itemValue);
    setTargetFeature(itemValue);
    if (itemValue === 'Other') {
      setCustomTargetFeature(true);
    }else{
      setCustomTargetFeature(false);
    }
  }

  const handleCustomTargetFeatureValue = (text) => {
    console.log(text);
    setCustomTargetFeatureValue(text);
  }

  const showCustomInputTargetFeature = () => {
    if (customTargetFeature) {
      return (<View style={styles.inputContainer}>
           <Text style={styles.inputLabel}> Custom Target Feature </Text>
              <TextInput
                style={styles.input}
                placeholder="Custom Target Feature"
                keyboardType="default"
                value={customTargetFeatureValue}
                onChangeText={(text) => handleCustomTargetFeatureValue(text)}
              />
              </View>);
    } else {
      return <></>;
    }
  };


  return (
    
    <View style={styles.container}>
      <ScrollView>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/bc_abbreviated.png')} style={styles.logo} />
        <Text style={styles.label}>Camera Trap Data</Text>
      </View>
      
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}> Project </Text>
              <View style={styles.dropdownContainer}>
              <Picker
                selectedValue={selectedValueProject}
                onValueChange={handleValueChange}
                  >
                    <Picker.Item label="Select a project" value={null} />
                    {projects.map(project => (
                      <Picker.Item
                        key={project.id}
                        label={project.project_id}
                        value={project.project_id}
                      />
                    ))}
              </Picker>
              </View>
              <Text style={styles.inputLabel}> Survey ID </Text>
              <TextInput
                style={styles.input}
                placeholder="Survey ID"
                keyboardType="default"
                value={surveyId}
                onChangeText={(text) => setSurveyId(text)}
              />
              <Text style={styles.inputLabel}> Field Crew </Text>
              <TextInput
                style={styles.input}
                placeholder="Field Crew"
                keyboardType="default"
                value={fieldcrew}
                onChangeText={(text) => setFieldcrew(text)}
              />
              <Text style={styles.inputLabel}> Date Time </Text>
              <TextInput
                style={styles.input}
                placeholder="Date Time"
                keyboardType="default"
                value={dateTime}
                onChangeText={(text) => setDateTime(text)}
              />

              <Text style={styles.inputLabel}> Station ID </Text>
              <TextInput
                style={styles.input}
                placeholder="Station ID"
                keyboardType="default"
                value={stationId}
                onChangeText={(text) => setStationId(text)}
              />
              <Text style={styles.inputLabel}> Deployment Check </Text>
              <View style={styles.dropdownContainer}>
                <Picker
                  selectedValue={deployCheck}
                  onValueChange={(itemValue) => handleDeployCheck(itemValue)}
                >
                  <Picker.Item label="Deploy" value="deploy" />
                  <Picker.Item label="Check" value="check" />
                </Picker>
              </View>
              {isDeployView ? (
            <View style={styles.inputContainer} >

              <Text style={styles.inputLabel}> Station northing </Text>
              <Location />
              <TextInput
                style={styles.input}
                placeholder="Station northing"
                keyboardType="default"
                value={stationNorthing}
                onChangeText={(text) => setStationNorthing(text)}
              />
              <Text style={styles.inputLabel}> Station easting </Text>
              <TextInput
                style={styles.input}
                placeholder="Station easting"
                keyboardType="default"
                value={stationEasting}
                onChangeText={(text) => setStationEasting(text)}
              />
              <Text style={styles.inputLabel}> Camera Attached </Text>
                <View style={styles.dropdownContainer}>
                  <Picker
                    selectedValue={cameraAttached}
                    onValueChange={(itemValue) => setCameraAttached(itemValue)}
                  >
                    <Picker.Item label="Yes" value="true" />
                    <Picker.Item label="No" value="false" />
                  </Picker>
              </View>
              
              <Text style={styles.inputLabel}> Security Box </Text>
                <View style={styles.dropdownContainer}>
                  <Picker
                    selectedValue={securityBox}
                    onValueChange={(itemValue) => setSecurityBox(itemValue)}
                  >
                    <Picker.Item label="Yes" value="true" />
                    <Picker.Item label="No" value="false" />
                  </Picker>
              </View>


              <Text style={styles.inputLabel}> Camera Height ( in cm) </Text>
              <TextInput
                style={styles.input}
                placeholder="Camera Height in cms"
                keyboardType="default"
                value={cameraHeight}
                onChangeText={(text) => setCameraHeight(text)}
              />

              <Text style={styles.inputLabel}> Camera Compass Direction</Text>
              <TextInput
                style={styles.input}
                placeholder="Camera Compass Direction in degrees"
                keyboardType="default"
                value={cameraDirection}
                onChangeText={(text) => setCameraDirection(text)}
              />

              <Text style={styles.inputLabel}> Camera ID</Text>
              <TextInput
                style={styles.input}
                placeholder="Camera ID"
                keyboardType="default"
                value={cameraId}
                onChangeText={(text) => setCameraId(text)}
              />

              <Text style={styles.inputLabel}> Camera Make </Text>
                <View style={styles.dropdownContainer}>
                  <Picker
                    selectedValue={cameraMake}
                    onValueChange={(itemValue) => handlecameraMake(itemValue)}
                  >
                    <Picker.Item label="Reconyx" value="Reconyx" />
                    <Picker.Item label="Bushnell" value="Bushnell" />
                    <Picker.Item label="Browning" value="Browning" />
                    <Picker.Item label="Other" value="Other" />
                  </Picker>
              </View>
              {showCustomInputCameraMake()}

              <Text style={styles.inputLabel}> Camera Model </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Camera Model"
                value={cameraModel}
                onChangeText={(text) => setCameraModel(text)}
                
              />


              <Text style={styles.inputLabel}> SD Card ID  </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter SD Card ID"
                value={sdCardId}
                onChangeText={(text) => setSdCardId(text)}
              />


            <Text style={styles.inputLabel}>Key ID  </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Key ID"
                value={keyId}
                onChangeText={(text) => setKeyId(text)}
              />

            <Text style={styles.inputLabel}>Visiblity  </Text>
              <TextInput
                style={styles.input}
                placeholder="Visiblity n meters"
                value={visibility}
                onChangeText={(text) => setVisiblity(text)}
              />

              <Text style={styles.inputLabel}> Habitat Type </Text>
                <View style={styles.dropdownContainer}>
                  <Picker
                    selectedValue={habitatType}
                    onValueChange={(itemValue) => handleHabitatType(itemValue)}
                  >
                    <Picker.Item label="Forest" value="Forest" />
                    <Picker.Item label="Meadow" value="Meadow" />
                    <Picker.Item label="Bog" value="Bog" />
                    <Picker.Item label="Other" value="Other" />
                  </Picker>
              </View>

              {showCustomInputForHabitat()}

              <Text style={styles.inputLabel}> Target Feature </Text>
                <View style={styles.dropdownContainer}>
                  <Picker
                    selectedValue={targetFeature}
                    onValueChange={(itemValue) => handleTargetFeature(itemValue)}
                  >
                    <Picker.Item label="Game Trail" value="Game Trail" />
                    <Picker.Item label="Human Trail" value="Human Trail" />
                    <Picker.Item label="Road" value="Road" />
                    <Picker.Item label="Feeding Area" value="Feeding Area" />
                    <Picker.Item label="Water hole" value="Water hole" />
                    <Picker.Item label="Rubbing Posts" value="Rubbing Posts" />
                    <Picker.Item label="Other" value="Other" />
                  </Picker>
              </View>

              {showCustomInputTargetFeature()}

              <Text style={styles.inputLabel}> Distance Feature </Text>
              <TextInput
                style={styles.input}
                value={distanceFeature}
                placeholder="Distance feature in meters"
                onChangeText={(text) => setDistanceFeature(text)}
                keyboardType="numeric"
              />

              <Text style={styles.inputLabel}> Quite Period </Text>
              <TextInput
                style={styles.input}
                value={quitePeriod}
                keyboardType="numeric"
                placeholder="Quiet Period"
                onChangeText={(text) => setQuitePeriod(text)}
              />


              <Text style={styles.inputLabel}> Trigger Sensitivity </Text>
              <View style={styles.dropdownContainer}>
                  <Picker
                    selectedValue={triggerSensitivity}
                    onValueChange={(itemValue) => setTriggerSensitivity(itemValue)}
                  >
                    <Picker.Item label="Low" value="Low" />
                    <Picker.Item label="Medium" value="Medium" />
                    <Picker.Item label="High" value="High" />
                  </Picker>
              </View>

              <Text style={styles.inputLabel}> Trigger Timing </Text>
              <TextInput
                style={styles.input}
                value={triggerTiming}
                keyboardType="numeric"
                placeholder="Trigger Timing"
                onChangeText={(text) => setTriggerTiming(text)}
              />

              <Text style={styles.inputLabel}> Photos Trigger </Text>
              <TextInput
                style={styles.input}
                value={photosTrigger}
                keyboardType="numeric"
                placeholder="Trigger Timing"
                onChangeText={(text) => setPhotosTrigger(text)}
              />

              <TextInput
                style={styles.input}
                placeholder="Number of Photos"
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Battery Percent"
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Purpose Visit"
                keyboardType="default"
              />
              </View>) : (
                <View style={styles.inputContainer} >
                   <TextInput
                      style={styles.input}
                      placeholder="Camera Damaged"
                      keyboardType="default"
                    />

                    </View>)}

            </View>
          </ScrollView>
        </View>
    );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    backgroundColor: '#EFEFEF',
    padding: 10,
    marginBottom: 10,
  },
});

export default CameraTrapDataScreen;
