import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { colors } from '../utils/constants';

const ResponderMap = ({ userLocation, responderLocation }) => {
  // If we don't have both locations, show a loading view
  if (!userLocation || !responderLocation) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text>Loading map...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {/* User's location marker */}
        <Marker
          coordinate={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          }}
          title="Your Location"
          pinColor="blue"
        />
        
        {/* Responder's location marker */}
        <Marker
          coordinate={{
            latitude: responderLocation.latitude,
            longitude: responderLocation.longitude,
          }}
          title="Responder Location"
          pinColor="red"
        />
        
        {/* Line connecting user and responder */}
        <Polyline
          coordinates={[
            userLocation,
            responderLocation
          ]}
          strokeColor="#000"
          strokeWidth={2}
        />
      </MapView>
      
      <View style={styles.trafficWarning}>
        <Text style={styles.trafficWarningText}>
          Note: Traffic conditions may affect arrival time
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  trafficWarning: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 8,
    borderRadius: 5,
  },
  trafficWarningText: {
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic'
  }
});

export default ResponderMap;