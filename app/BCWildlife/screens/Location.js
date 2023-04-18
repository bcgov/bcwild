import React, { useEffect, useState } from 'react';
import { Alert, PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { fromLonLat } from 'proj4';

const Location = () => {
  const [locationPermission, setLocationPermission] = useState(null);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location permission required',
          message:
            'This app needs to access your location to get current position',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setLocationPermission(true);
        getLocation();
      } else {
        setLocationPermission(false);
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        const utmCoordinates = fromLonLat([longitude, latitude]);
        const { northing, easting } = getUTMCoordinates(utmCoordinates);
        console.log(`Northing: ${northing}, Easting: ${easting}`);
      },
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  const getUTMCoordinates = (utmCoordinates) => {
    const [easting, northing] = utmCoordinates;
    return { easting, northing };
  };

  if (locationPermission === null) {
    return null;
  } else if (locationPermission === false) {
    return (
      <View>
        <Text>Location permission denied</Text>
      </View>
    );
  } else {
    return null;
  }
};

export default Location;
