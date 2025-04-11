import 'react-native-reanimated'; // 🔹 IMPORTACIÓN OBLIGATORIA
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import RegisterProductScreen from '../screens/RegisterProductScreen';
import DetailsScreen from '../screens/DetailsScreen';
import ScannerScreen from '../screens/ScannerScreen';
import AlertsScreen from '../screens/AlertsScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="RegisterProduct" component={RegisterProductScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="Scanner">
  {(props) => <ScannerScreen {...props} />}
</Stack.Screen>
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main">
          {() => (
            <Drawer.Navigator screenOptions={{ headerShown: false }}>
              <Drawer.Screen name="Inicio" component={HomeStack} />
              <Drawer.Screen name="Alertas" component={AlertsScreen} />
              <Drawer.Screen name="Configuración" component={SettingsScreen} />
            </Drawer.Navigator>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
