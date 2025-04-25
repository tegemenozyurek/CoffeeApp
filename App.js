import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform, StyleSheet } from 'react-native';

import ClassicsScreen from './screens/Classics';
import CreateScreen from './screens/Create';
import CartScreen from './screens/Cart';
import DessertsScreen from './screens/Desserts';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          name="Classics" 
          component={ClassicsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cafe-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen 
          name="Create" 
          component={CreateScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="sparkles-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen 
          name="Desserts" 
          component={DessertsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ice-cream-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen 
          name="Cart" 
          component={CartScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cart-outline" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    height: Platform.OS === 'ios' ? 85 : 60,
    paddingHorizontal: 5,
    paddingTop: 5,
    paddingBottom: Platform.OS === 'ios' ? 25 : 5,
  },
  tabBarItem: {
    padding: 5,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 3,
  }
});
