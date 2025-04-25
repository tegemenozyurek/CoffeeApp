import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform, StyleSheet } from 'react-native';

import ClassicsScreen from './screens/Classics';
import CreateScreen from './screens/Create';
import CartScreen from './screens/Cart';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Classics"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Classics') {
                iconName = focused ? 'cafe' : 'cafe-outline';
              } else if (route.name === 'Create') {
                iconName = focused ? 'sparkles' : 'sparkles-outline';
              } else if (route.name === 'Cart') {
                iconName = focused ? 'cart' : 'cart-outline';
              }

              return <Ionicons name={iconName} size={24} color={color} />;
            },
            tabBarActiveTintColor: '#6366F1',
            tabBarInactiveTintColor: '#6B7280',
            tabBarStyle: styles.tabBar,
            tabBarItemStyle: styles.tabBarItem,
            tabBarLabelStyle: styles.tabBarLabel,
            headerShown: false
          })}
        >
          <Tab.Screen name="Classics" component={ClassicsScreen} />
          <Tab.Screen name="Create" component={CreateScreen} />
          <Tab.Screen name="Cart" component={CartScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
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
