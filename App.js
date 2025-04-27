import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Platform, StyleSheet, StatusBar, View, Image, Dimensions } from 'react-native';

import ClassicsScreen from './screens/Classics';
import CreateScreen from './screens/Create';
import CartScreen from './screens/Cart';
import DessertsScreen from './screens/Desserts';

// Get device dimensions for responsive sizing
const { width, height } = Dimensions.get('window');
const isSmallDevice = width < 375;

// Enhanced coffee theme colors
const COLORS = {
  primary: '#5F4330',     // Rich dark coffee brown
  secondary: '#8C6B51',   // Medium roast brown
  accent: '#D4A574',      // Caramel coffee color
  background: '#FAF3E0',  // Cream color
  secondaryBackground: '#F0E6D5', // Lighter cream
  text: '#3A2A1B',        // Dark espresso
  textLight: '#705642',   // Light coffee text
  white: '#FFFFFF',
  lightGrey: '#F8F8F8',
  success: '#5AA871',     // Green for selection confirmation
  shadow: 'rgba(59, 43, 28, 0.15)',
  overlay: 'rgba(59, 43, 28, 0.03)'
};

const Tab = createBottomTabNavigator();

// Custom tab bar icon with logo for the middle button
const LogoIcon = () => (
  <View style={styles.logoIconContainer}>
    <Image
      source={require('./images/logo.png')}
      style={styles.logoIcon}
      resizeMode="contain"
    />
  </View>
);

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarStyle: styles.tabBar,
            tabBarActiveTintColor: COLORS.primary,
            tabBarInactiveTintColor: COLORS.secondary,
            tabBarLabelStyle: styles.tabBarLabel,
            tabBarItemStyle: styles.tabBarItem,
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitle,
            headerTintColor: COLORS.primary,
            tabBarShowLabel: false,
            headerShadowVisible: false,
            // Size adjustments for icons based on device size
            tabBarIconStyle: { 
              width: isSmallDevice ? 22 : 28 
            },
            tabBarIcon: ({ color, size, focused }) => {
              let iconName;
              // Adjust icon size based on device
              const iconSize = isSmallDevice ? size - 2 : size;

              if (route.name === 'Classics') {
                iconName = focused ? 'cafe' : 'cafe-outline';
              } else if (route.name === 'Create') {
                iconName = focused ? 'sparkles' : 'sparkles-outline';
              } else if (route.name === 'Desserts') {
                iconName = focused ? 'ice-cream' : 'ice-cream-outline';
              } else if (route.name === 'Cart') {
                iconName = focused ? 'cart' : 'cart-outline';
              }

              // Custom styling for the focused icon
              return (
                <View style={[
                  styles.iconContainer, 
                  focused && styles.focusedIconContainer,
                  isSmallDevice && styles.iconContainerSmall
                ]}>
                  <Ionicons name={iconName} size={iconSize} color={focused ? COLORS.white : color} />
                </View>
              );
            },
          })}
          // Add responsive tab bar height
          tabBarOptions={{
            adaptive: true,
            safeAreaInsets: { bottom: 6 }
          }}
        >
          <Tab.Screen 
            name="Classics" 
            component={ClassicsScreen}
            options={{
              headerShown: true,
              title: "Coffee Classics",
            }}
          />
          <Tab.Screen 
            name="Create" 
            component={CreateScreen}
            options={{
              headerShown: false, // Hide header for the Create screen
              title: "Create Your Coffee",
            }}
          />
          <Tab.Screen 
            name="Desserts" 
            component={DessertsScreen}
            options={{
              headerShown: true,
              title: "Sweet Treats",
            }}
          />
          <Tab.Screen 
            name="Cart" 
            component={CartScreen}
            options={{
              headerShown: true,
              title: "Your Order",
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.white,
    borderTopWidth: 0,
    elevation: 10,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    height: Platform.OS === 'ios' ? (isSmallDevice ? 75 : 85) : (isSmallDevice ? 60 : 70),
    paddingHorizontal: isSmallDevice ? 8 : 16,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? (isSmallDevice ? 20 : 25) : 8,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  tabBarItem: {
    padding: isSmallDevice ? 6 : 8,
    marginTop: Platform.OS === 'ios' ? 5 : 0,
    marginHorizontal: isSmallDevice ? 4 : 8,
    marginBottom: Platform.OS === 'ios' ? 0 : 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBarLabel: {
    fontSize: isSmallDevice ? 10 : 12,
    fontWeight: '600',
    marginTop: 2,
    marginBottom: Platform.OS === 'ios' ? 4 : 0,
  },
  header: {
    backgroundColor: COLORS.background,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
    height: Platform.OS === 'ios' ? (isSmallDevice ? 90 : 110) : (isSmallDevice ? 70 : 90),
  },
  headerTitle: {
    fontWeight: '700',
    fontSize: isSmallDevice ? 18 : 20,
    color: COLORS.primary,
  },
  iconContainer: {
    width: isSmallDevice ? 40 : 46,
    height: isSmallDevice ? 40 : 46,
    borderRadius: isSmallDevice ? 20 : 23,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainerSmall: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  focusedIconContainer: {
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  logoIconContainer: {
    width: isSmallDevice ? 42 : 50,
    height: isSmallDevice ? 42 : 50,
    borderRadius: isSmallDevice ? 21 : 25,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 5,
  },
  logoIcon: {
    width: isSmallDevice ? 26 : 32,
    height: isSmallDevice ? 26 : 32,
    tintColor: COLORS.white,
  },
});
