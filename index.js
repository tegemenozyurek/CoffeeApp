import { AppRegistry } from 'react-native';
import { registerRootComponent } from 'expo';
import App from './App';

// First, register with AppRegistry directly for native builds
AppRegistry.registerComponent('main', () => App);

// Also use registerRootComponent for Expo compatibility
registerRootComponent(App);
