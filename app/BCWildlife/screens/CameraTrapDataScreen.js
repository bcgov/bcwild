import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';


const CameraTrapDataScreen = () => {
  const [deployCheck, setDeployCheck] = React.useState('deploy');
  const [cameraActiveArriving, setCameraActiveArriving] = React.useState(false);
  const [cameraRemoved, setCameraRemoved] = React.useState(false);
  const [cameraReplaced, setCameraReplaced] = React.useState(false);
  const [batteriesReplaced, setBatteriesReplaced] = React.useState(false);
  const [sdCardReplaced, setSdCardReplaced] = React.useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/bc_abbreviated.png')} style={styles.logo} />
        <Text style={styles.label}>Camera Trap Data</Text>
      </View>
      <ScrollView>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Survey ID"
                keyboardType="default"
              />
              <TextInput
                style={styles.input}
                placeholder="Field Crew"
                keyboardType="default"
              />
              <TextInput
                style={styles.input}
                placeholder="Date Time"
                keyboardType="default"
              />
              <TextInput
                style={styles.input}
                placeholder="Station ID"
                keyboardType="default"
              />
              <View style={styles.dropdownContainer}>
                <Picker
                  selectedValue={deployCheck}
                  onValueChange={(itemValue) => setDeployCheck(itemValue)}
                >
                  <Picker.Item label="Deploy" value="deploy" />
                  <Picker.Item label="Check" value="check" />
                </Picker>
              </View>
            
              <TextInput
                style={styles.input}
                placeholder="Camera Damaged"
                keyboardType="default"
              />
              <TextInput
                style={styles.input}
                placeholder="Specify"
                keyboardType="default"
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
