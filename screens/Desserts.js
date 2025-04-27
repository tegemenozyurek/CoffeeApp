import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DESSERT_LIST = [
  {
    id: 'tiramisu',
    name: 'Tiramisu',
    image: { uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80' },
    desc: 'Classic Italian dessert with coffee and mascarpone.'
  },
  {
    id: 'cheesecake',
    name: 'Cheesecake',
    image: { uri: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80' },
    desc: 'Creamy, rich, and smooth cheesecake slice.'
  },
  {
    id: 'brownie',
    name: 'Brownie',
    image: { uri: 'https://images.unsplash.com/photo-1505250469679-203ad9ced0cb?auto=format&fit=crop&w=400&q=80' },
    desc: 'Chocolatey, fudgy, and delicious brownie.'
  },
  {
    id: 'croissant',
    name: 'Croissant',
    image: { uri: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80' },
    desc: 'Flaky, buttery French pastry.'
  },
  {
    id: 'macaron',
    name: 'Macaron',
    image: { uri: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80' },
    desc: 'Colorful, delicate, and sweet French treat.'
  },
  {
    id: 'donut',
    name: 'Donut',
    image: { uri: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80' },
    desc: 'Soft, sweet, and glazed donut.'
  },
];

const DessertsScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Logo and Title */}
        <View style={styles.logoRow}>
          <Image source={require('../images/logo.png')} style={styles.logo} resizeMode="contain" />
          <Text style={styles.logoText}>Cowee</Text>
        </View>
        {/* Dessert List */}
        <FlatList
          data={DESSERT_LIST}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.dessertCard} activeOpacity={0.85}>
              <Image source={item.image} style={styles.dessertImg} resizeMode="cover" />
              <View style={styles.dessertInfo}>
                <Text style={styles.dessertName}>{item.name}</Text>
                <Text style={styles.dessertDesc}>{item.desc}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7f6f9',
  },
  container: {
    flex: 1,
    paddingTop: 18,
    backgroundColor: '#f7f6f9',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 110,
    height: 70,
    marginRight: 18,
  },
  logoText: {
    fontSize: 54,
    fontWeight: 'bold',
    color: '#5F4330',
    letterSpacing: 2,
  },
  listContent: {
    paddingHorizontal: 18,
    paddingBottom: 24,
  },
  dessertCard: {
    backgroundColor: '#fff',
    borderRadius: 22,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  dessertImg: {
    width: 90,
    height: 90,
    borderRadius: 18,
    margin: 12,
  },
  dessertInfo: {
    flex: 1,
    paddingRight: 12,
  },
  dessertName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#3A2A1B',
    marginBottom: 4,
  },
  dessertDesc: {
    fontSize: 15,
    color: '#705642',
    fontWeight: '400',
  },
});

export default DessertsScreen;