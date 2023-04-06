import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ProjectRequestAccessScreen = () => {
  const [selectedRole, setSelectedRole] = useState('submitter');

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../assets/bc_abbreviated.png')} />
        <Text style={styles.projectTitle}>Project</Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput style={styles.input} placeholder="Project ID" />
        <View style={styles.radioContainer}>
          <TouchableOpacity style={[styles.radioButton, selectedRole === 'submitter' && styles.radioButtonSelected]} onPress={() => setSelectedRole('submitter')}>
            <Text style={[styles.radioText, selectedRole === 'submitter' && styles.radioTextSelected]}>Submitter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.radioButton, selectedRole === 'manager' && styles.radioButtonSelected]} onPress={() => setSelectedRole('manager')}>
            <Text style={[styles.radioText, selectedRole === 'manager' && styles.radioTextSelected]}>Manager</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.requestAccessButton}>
          <Text style={styles.requestAccessButtonText}>Request Access</Text>
        </TouchableOpacity>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 150,
    width: 150,
  },
  projectTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 16,
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
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  radioButton: {
    height: 84,
    width: 84,
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
});

export default ProjectRequestAccessScreen;