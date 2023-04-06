import React, { useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';


export default function LoadingIndicator({ visible }) {
  const [loadingVisible, setLoadingVisible] = useState(visible);

  const showLoadingIndicator = () => {
    setLoadingVisible(true);
  };

  const hideLoadingIndicator = () => {
    setLoadingVisible(false);
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator animating={loadingVisible} size="large" color="#0000ff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
});
