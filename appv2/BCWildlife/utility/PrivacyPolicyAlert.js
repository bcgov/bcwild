import React, { useState } from 'react';
import { Alert, Linking, Text, TouchableOpacity, View } from 'react-native';

const PrivacyPolicyAlert = ({ onPrivacyPolicyResponse }) => {
  const [showAlert, setShowAlert] = useState(true);

  const handleCloseAlert = () => {
    setShowAlert(false);
    onPrivacyPolicyResponse('no');
  };

  const handlePrivacyPolicyPress = () => {
    const privacyPolicyURL = 'https://www2.gov.bc.ca/gov/content/home/privacy';
    Linking.openURL(privacyPolicyURL);
  };

  const handleAgreePress = () => {
    setShowAlert(false);
    onPrivacyPolicyResponse('yes');
  };

  return (
    showAlert && (
      <View>
        <Alert
          title={'Privacy Policy Consent'}
          message={
            'By using our app, you agree to our Privacy Policy. Please read it carefully before using our app. You can view our Privacy Policy by clicking here.'
          }
          buttons={[
            {
              text: 'Cancel',
              onPress: handleCloseAlert,
              style: 'cancel',
            },
            {
              text: 'Agree',
              onPress: handleAgreePress,
              style: 'default',
            },
          ]}
          onDismiss={handleCloseAlert}
          messageStyle={{ textAlign: 'center' }}
          messageNumberOfLines={3}
          messageEllipsizeMode={'tail'}
        />
        <TouchableOpacity onPress={handlePrivacyPolicyPress}>
          <Text style={{ color: 'blue', textAlign: 'center', marginTop: 10 }}>
            Privacy Policy
          </Text>
        </TouchableOpacity>
      </View>
    )
  );
};

export default PrivacyPolicyAlert;
