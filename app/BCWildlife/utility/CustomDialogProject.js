import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CustomDialogProject = ({ visible, onClose, projects, onSubmit }) => {
  const [selectedProject, setSelectedProject] = useState("");
  const [email, setEmail] = useState('');



  const handleSubmit = () => {
    if (email.trim() !== '' && isValidEmail(email)) { // Check for non-empty email value
      onSubmit(selectedProject, email);
      setSelectedProject(null);
      setEmail('');
    }else{
        Alert.alert('Error', 'Please enter a valid email address');
    }
  };

  const isValidEmail = (email) => {
    // Regex from https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
    };


  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>Select a Project to Export Data</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedProject}
            onValueChange={(itemValue) => setSelectedProject(itemValue)}
          >
            {projects.map((project) => (
              <Picker.Item key={project.project_id} label={project.project_id} value={project.project_id} />
            ))}
          </Picker>
        </View>
        <Text style={styles.title}>Enter Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    width: '100%',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: '100%',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CustomDialogProject;
