import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const AddProjectScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../assets/bc_abbreviated.png')} />
        <Text style={styles.projectTitle}>Project</Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput style={styles.input} placeholder="Username" />
        <TextInput style={styles.input} placeholder="Project ID" />
        <TextInput style={styles.input} placeholder="Study Area" />
        <TextInput style={styles.input} placeholder="Creation Date" />
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
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
    resizeMode: 'contain',
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
