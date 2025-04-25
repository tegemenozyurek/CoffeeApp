import { View, Text, StyleSheet } from 'react-native';

const CreateScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    color: '#1F2937',
  },
});

export default CreateScreen;