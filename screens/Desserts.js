import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const DessertsScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Desserts</Text>
        {/* Add your desserts content here */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    color: '#1F2937',
  },
});

export default DessertsScreen;