import { StyleSheet, View, FlatList } from 'react-native';

import WeatherCard from '../components/WeatherCard';
import { CityWeather } from '../types';

import { useEffect, useState } from 'react';
import { mapCityWeather } from '../helpers/mappers';
import { getCityWeather } from '../services/weather';
import { useNavigation } from '@react-navigation/native';

export default function ListScreen() {
  const [citiesWeather, setCitiesWeather] = useState<CityWeather[]>([]);
  const navigation = useNavigation();

  async function getDefaultList(){
    try{
      const [caruaruWeather, lagoaDosGatosWeather, londonWeather] = await Promise.all([
        getCityWeather({lat: -8.2829702, lon: -35.9722852}),
        getCityWeather({lat: -8.6537614, lon: -35.9045124}),
        getCityWeather({lat: 51.5073219, lon: -0.1276474}),
      ])
    
      setCitiesWeather([
        mapCityWeather(caruaruWeather, 'Caruaru, BR'), 
        mapCityWeather(lagoaDosGatosWeather, 'Lagoa dos Gatos, BR'),
        mapCityWeather(londonWeather, 'London, UK')
      ]);
    }catch(error){
      console.error(error);
    }
  }

  function handleRemoveCity(removedCity: CityWeather){
    const newCitiesWeather = citiesWeather
      .filter(city => city.cityName !== removedCity.cityName);
    setCitiesWeather(newCitiesWeather);
  }

  useEffect(() => {
    getDefaultList();
  }, []);

  return (
    <View style={styles.container}>
        <FlatList
          data={citiesWeather}
          renderItem={({item}) => 
            <WeatherCard 
              cityWeather={item} 
              onRemove={() => {
                handleRemoveCity(item);
              }} 
              onViewForecast={() => {
                navigation.navigate('ForecastScreen', { 
                    cityWeather: {...item} 
                });
              }} 
            />}
          keyExtractor={item => item.cityName}
        />
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
