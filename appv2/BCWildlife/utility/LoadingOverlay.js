import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

class LoadingOverlay extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      loading: props.loading
    };
  }
  
  static defaultProps = {
    loading: false,
    color: 'white',
    size: 'large'
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.loading !== this.props.loading) {
      this.setState({ loading: this.props.loading });
    }
  }
  
  render() {
    const { loading } = this.state;
    const { color, size } = this.props;
    
    return (
      loading && (
        <View style={styles.container}>
          <ActivityIndicator size={size} color={color} animating={loading} />
        </View>
      )
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default LoadingOverlay;
