import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from 'react-native-gesture-handler';

const TelemetryTriangulationScreen = () => {
  const [entries, setEntries] = useState([{ time: '', northing: '', easting: '', bearing: '', signal: '', bias: '' }]);

  const handleAddEntry = () => {
    setEntries([...entries, { time: '', northing: '', easting: '', bearing: '', signal: '', bias: '' }]);
  };

  const handleRemoveEntry = (index) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  const handleInputChange = (index, field, value) => {
    const newEntries = [...entries];
    newEntries[index][field] = value;
    setEntries(newEntries);
  };

  const handleTriangulate = () => {
    // Perform the triangulation calculations and display the result
    const bearings = [];
  const distances = [];
  const stationCoordinates = [];

  // Iterate over each entry and extract the necessary data
  entries.forEach((entry) => {
    const bearing = Number(entry.bearing);
    const signal = entry.signal;
    const bias = Number(entry.bias);
    const distance = calculateDistance(signal, bias); // Custom function to calculate the distance
    const stationCoordinatesEntry = [Number(entry.northing), Number(entry.easting)];

    bearings.push(bearing);
    distances.push(distance);
    stationCoordinates.push(stationCoordinatesEntry);
  });

  // Calculate the triangulation results
  const result = triangulate(stationCoordinates, bearings, distances); // Custom function to perform triangulation

  // Log the results to the console
  console.log(`Latitude: ${result.latitude}\nLongitude: ${result.longitude}\nElevation: ${result.elevation}`);
  };

  const triangulate = (stationCoordinates, bearings, distances) => {
    const earthRadius = 6371; // Earth radius in kilometers
  
    // Convert station coordinates to radians
    const stationCoordinatesRad = stationCoordinates.map((coord) => coord.map((val) => val * Math.PI / 180));
  
    // Calculate the reference station
    const station1 = stationCoordinatesRad[0];
  
    // Calculate the other stations relative to the reference station
    const relativeStations = stationCoordinatesRad.slice(1).map((coord) => [coord[0] - station1[0], coord[1] - station1[1]]);
  
    // Calculate the bearings relative to the reference station
    const bearingsRelative = bearings.slice(1).map((bearing) => bearing - bearings[0]);
  
    // Calculate the distance ratios relative to the reference station
    const distancesRelative = distances.slice(1).map((distance) => distance / distances[0]);
  
    // Calculate the coefficients for the least-squares solution
    const a = relativeStations.map((coord) => Math.sin(coord[1]) * Math.cos(coord[0]));
    const b = relativeStations.map((coord) => Math.sin(coord[1]) * Math.sin(coord[0]));
    const c = relativeStations.map((coord) => Math.cos(coord[1]));
    const d = bearingsRelative.map((bearing) => Math.sin(bearing));
    const e = bearingsRelative.map((bearing) => Math.cos(bearing));
    const f = distancesRelative.map((ratio) => ratio - 1);
  
    // Calculate the least-squares solution
    const A = [
      //[sum(a.map((val) => val ** 2)) sum(a.map((val, index) => val * b[index])), sum(a.map((val, index) => val * c[index]))],
      [sum(b.map((val, index) => val * a[index])), sum(b.map((val) => val**2)), sum(b.map((val, index) => val * c[index]))],
      [sum(c.map((val, index) => val * a[index])), sum(c.map((val, index) => val * b[index])), sum(c.map((val) => val**2))],
    ];
    const B = [sum(d.map((val, index) => val * f[index])), sum(e.map((val, index) => val * f[index])), sum(f)];
    const [x, y, z] = numeric.solve(A, B);
  
    // Calculate the triangulation result
    const latitude = Math.atan2(z, Math.sqrt(x**2 + y**2)) * 180 / Math.PI;
    const longitude = Math.atan2(y, x) * 180 / Math.PI;
    const elevation = Math.sqrt(x**2 + y**2 + z**2) - earthRadius;
  
    return { latitude, longitude, elevation };
  };

  return (
    <View style={styles.container}>
      {/* Header section */}
      <View style={styles.header}>
        <Image
          source={require('../assets/bc_abbreviated.png')}
          style={styles.logo}
        />
        <Text style={styles.label}>Radio Telemetry Triangulation Calculator</Text>
      </View>

      {/* Add/remove entry section */}
      <View style={styles.entryControls}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddEntry}>
          <Text style={styles.buttonText}>Add Entry</Text>
        </TouchableOpacity>
        {entries.length > 1 && (
          <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveEntry(entries.length - 1)}>
            <Text style={styles.buttonText}>Remove Last Entry</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Entry input fields */}
      <ScrollView style={styles.entryFields}>
        <View >
        
        {entries.map((entry, index) => (
          <View key={index} style={styles.entryContainer}>
            <Text style={styles.entryHeader}>Entry {index + 1}</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Time:</Text>
              <TextInput
                style={styles.inputField}
                value={entry.time}
                onChangeText={(value) => handleInputChange(index, 'time', value)}
                placeholder="Enter time in 24-hour format (HH:mm)"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Station UTM Northing:</Text>
              <TextInput
                style={styles.inputField}
                value={entry.northing}
                onChangeText={(value) => handleInputChange(index, 'northing', value)}
                placeholder="Enter station UTM northing"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Station UTM Easting:</Text>
              <TextInput
                style={styles.inputField}
                value={entry.easting}
                onChangeText={(value) => handleInputChange(index, 'easting', value)}
                placeholder="Enter station UTM easting"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Bearing:</Text>
              <TextInput
                style={styles.inputField}
                value={entry.bearing}
                onChangeText={(value) => handleInputChange(index, 'bearing', value)}
                placeholder="Enter bearing in degrees"
              />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Signal:</Text>
                <View style={styles.inputField}>
                    <Picker
                    selectedValue={entry.signal}
                    onValueChange={(value) => handleInputChange(index, 'signal', value)}
                    >
                        <Picker.Item label="Constant" value="constant" />
                        <Picker.Item label="Pulsing" value="pulsing" />
                        <Picker.Item label="Faint" value="faint" />
                        <Picker.Item label="Mortality" value="mortality" />
                    </Picker>
                </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Bias:</Text>
              <TextInput
                style={styles.inputField}
                value={entry.bias}
                onChangeText={(value) => handleInputChange(index, 'bias', value)}
                placeholder="Enter bias"
              />
            </View>
          </View>
        ))}
      </View>
      </ScrollView>

      {/* Triangulate button */}
      <TouchableOpacity style={styles.triangulateButton} onPress={handleTriangulate}>
        <Text style={styles.buttonText}>Triangulate</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  logo: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    marginRight: 10,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  entryControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#234075',
    padding: 10,
    borderRadius: 5,
  },
  removeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  entryFields: {
    flex: 1,
    height: 300,
    width: '100%',
  },
  entryContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  entryHeader: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  inputLabel: {
    flex: 1,
    fontWeight: 'bold',
  },
  inputField: {
    flex: 2,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  triangulateButton: {
    backgroundColor: '#234075',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
});

export default TelemetryTriangulationScreen;
