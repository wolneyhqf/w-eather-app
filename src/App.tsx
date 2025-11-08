import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import ListScreen from './screens/ListScreen';
import ForecastScreen from './screens/ForecastScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="ListScreen" 
            component={ListScreen} 
            options={{ title: 'Weather App' }} />
          <Stack.Screen 
            name="ForecastScreen" 
            component={ForecastScreen} 
            options={{ title: 'Forecast' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
