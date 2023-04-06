import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ApproveSignupAccessScreen = () => {
  const data = [
    { name: 'John Doe', value: 'johndoe@example.com' },
    { name: 'Jane Doe', value: 'janedoe@example.com' },
    { name: 'Bob Smith', value: 'bobsmith@example.com' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../assets/bc_abbreviated.png')} />
        <Text style={styles.title}>Approve Signup Access</Text>
      </View>
      <View style={styles.cardList}>
        {data.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardName}>{item.name}</Text>
            <Text style={styles.cardValue}>{item.value}</Text>
            <View style={styles.cardButtonContainer}>
              <TouchableOpacity style={[styles.cardButton, { backgroundColor: '#234075' }]}>
                <Text style={styles.cardButtonText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.cardButton, { backgroundColor: '#ccc' }]}>
                <Text style={styles.cardButtonText}>Reject</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    height: 50,
    width: 50,
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardList: {
    flex: 1,
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
