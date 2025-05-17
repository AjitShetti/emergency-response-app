// src/components/ResponseTracker.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ResponseTracker = ({ status, responder, estimatedArrival }) => {
  // Format the estimated arrival time
  const formatTime = (date) => {
    if (!date) return 'Calculating...';
    
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute:'2-digit'
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Response Details</Text>
      
      <View style={styles.row}>
        <Text style={styles.label}>Status:</Text>
        <Text style={styles.value}>{status}</Text>
      </View>
      
      <View style={styles.row}>
        <Text style={styles.label}>Responder:</Text>
        <Text style={styles.value}>{responder ? responder.name : 'Assigning...'}</Text>
      </View>
      
      {responder && (
        <View style={styles.row}>
          <Text style={styles.label}>Vehicle:</Text>
          <Text style={styles.value}>{responder.vehicle}</Text>
        </View>
      )}
      
      <View style={styles.row}>
        <Text style={styles.label}>Est. Arrival:</Text>
        <Text style={styles.value}>{formatTime(estimatedArrival)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    fontWeight: '500',
    width: 100,
  },
  value: {
    flex: 1,
  }
});

export default ResponseTracker;