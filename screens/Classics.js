import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Animated as RNAnimated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const COFFEE_LIST = [
  {
    id: 'americano',
    name: 'Americano',
    image: { uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80' },
    desc: 'Espresso with hot water, smooth and rich.'
  },
  {
    id: 'icedlatte',
    name: 'Iced Latte',
    image: { uri: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=400&q=80' },
    desc: 'Chilled espresso, milk, and ice for a refreshing taste.'
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    image: { uri: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80' },
    desc: 'Espresso, steamed milk, and foam in perfect harmony.'
  },
  {
    id: 'espresso',
    name: 'Espresso',
    image: { uri: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80' },
    desc: 'Strong, bold, and pure Italian coffee shot.'
  },
  {
    id: 'mocha',
    name: 'Mocha',
    image: { uri: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80' },
    desc: 'Espresso, chocolate, and milk for a sweet treat.'
  },
  {
    id: 'flatwhite',
    name: 'Flat White',
    image: { uri: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=400&q=80' },
    desc: 'Velvety microfoam and espresso, smooth and creamy.'
  },
];

const BEANS_NEEDED = 5;
const CURRENT_BEANS = 3;

const ClassicsScreen = () => {
  const progressAnim = useRef(new RNAnimated.Value(CURRENT_BEANS / BEANS_NEEDED)).current;
  useEffect(() => {
    RNAnimated.timing(progressAnim, {
      toValue: CURRENT_BEANS / BEANS_NEEDED,
      duration: 800,
      useNativeDriver: false
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Logo and Title */}
        <View style={styles.logoRow}>
          <Image source={require('../images/logo.png')} style={styles.logo} resizeMode="contain" />
          <Text style={styles.logoText}>Cowee</Text>
        </View>
        {/* Bean Counter */}
        <View style={styles.beanCounterCard}>
          <Text style={styles.beanCounterText}>Coffee Beans</Text>
          <View style={styles.beanProgressRow}>
            <Ionicons name="cafe" size={22} color="#8C6B51" style={{ marginRight: 6 }} />
            <View style={styles.beanProgressBarBg}>
              <RNAnimated.View style={[styles.beanProgressBar, { width: progressAnim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) }]} />
            </View>
            <Text style={styles.beanProgressLabel}>{CURRENT_BEANS}/{BEANS_NEEDED}</Text>
          </View>
          <Text style={styles.beanCounterMsg}>Buy <Text style={{ fontWeight: 'bold', color: '#5F4330' }}>{BEANS_NEEDED - CURRENT_BEANS}</Text> more coffee to get <Text style={{ fontWeight: 'bold', color: '#5AA871' }}>1 free!</Text></Text>
        </View>
        {/* Coffee List */}
        <FlatList
          data={COFFEE_LIST}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.coffeeCard} activeOpacity={0.85}>
              <Image source={item.image} style={styles.coffeeImg} resizeMode="cover" />
              <View style={styles.coffeeInfo}>
                <Text style={styles.coffeeName}>{item.name}</Text>
                <Text style={styles.coffeeDesc}>{item.desc}</Text>
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
  beanCounterCard: {
    backgroundColor: '#fff',
    borderRadius: 22,
    paddingVertical: 18,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginHorizontal: 24,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  beanCounterText: {
    fontSize: 18,
    color: '#8C6B51',
    fontWeight: '600',
    marginBottom: 6,
  },
  beanProgressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  beanProgressBarBg: {
    width: 90,
    height: 10,
    backgroundColor: '#f3e7d7',
    borderRadius: 6,
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  beanProgressBar: {
    height: 10,
    backgroundColor: '#5F4330',
    borderRadius: 6,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  beanProgressLabel: {
    fontSize: 16,
    color: '#5F4330',
    fontWeight: '700',
    marginLeft: 4,
  },
  beanCounterMsg: {
    fontSize: 15,
    color: '#705642',
    marginTop: 2,
    textAlign: 'center',
  },
  listContent: {
    paddingHorizontal: 18,
    paddingBottom: 24,
  },
  coffeeCard: {
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
  coffeeImg: {
    width: 90,
    height: 90,
    borderRadius: 18,
    margin: 12,
  },
  coffeeInfo: {
    flex: 1,
    paddingRight: 12,
  },
  coffeeName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#3A2A1B',
    marginBottom: 4,
  },
  coffeeDesc: {
    fontSize: 15,
    color: '#705642',
    fontWeight: '400',
  },
});

export default ClassicsScreen;