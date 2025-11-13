import { StyleSheet, View, FlatList, TextInput, TouchableOpacity, Text, ActivityIndicator, Modal } from 'react-native';

import WeatherCard from '../components/WeatherCard';
import { CityWeather, GeolocationResponse } from '../types';

import { useEffect, useState } from 'react';
import { mapCityWeather } from '../helpers/mappers';
import { getCityWeather } from '../services/weather';
import { getCoordinatesByLocationName } from '../services/geolocation';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  ListScreen: undefined;
  ForecastScreen: { cityWeather: CityWeather };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ListScreen() {
  const [citiesWeather, setCitiesWeather] = useState<CityWeather[]>([]);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<GeolocationResponse[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);
  const navigation = useNavigation<NavigationProp>();

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

  async function handleSearch() {
    if (!searchText.trim()) {
      return;
    }

    setIsSearching(true);
    try {
      const results = await getCoordinatesByLocationName(searchText.trim());
      setSearchResults(results);
      setShowSearchModal(true);
    } catch (error) {
      console.error('Error searching cities:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }

  async function handleSelectCity(selectedCity: GeolocationResponse) {
    setIsLoadingWeather(true);
    setShowSearchModal(false);
    
    try {
      const weatherData = await getCityWeather({ lat: selectedCity.lat, lon: selectedCity.lon });
      const cityName = `${selectedCity.name}, ${selectedCity.country}`;
      const newCityWeather = mapCityWeather(weatherData, cityName);
      
      // Verificar se a cidade já existe na lista
      const cityExists = citiesWeather.some(city => city.cityName === cityName);
      if (!cityExists) {
        setCitiesWeather([...citiesWeather, newCityWeather]);
      }
      
      setSearchText('');
      setSearchResults([]);
    } catch (error) {
      console.error('Error adding city:', error);
    } finally {
      setIsLoadingWeather(false);
    }
  }

  function formatCityName(city: GeolocationResponse): string {
    return `${city.name}, ${city.country}`;
  }

  useEffect(() => {
    getDefaultList();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar cidade..."
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearch}
          disabled={isSearching}
        >
          {isSearching ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.searchButtonText}>Buscar</Text>
          )}
        </TouchableOpacity>
      </View>

      <Modal
        visible={showSearchModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowSearchModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Selecione uma cidade</Text>
              <TouchableOpacity
                onPress={() => setShowSearchModal(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            
            {searchResults.length === 0 ? (
              <View style={styles.emptyResults}>
                <Text style={styles.emptyResultsText}>Nenhum resultado encontrado</Text>
              </View>
            ) : (
              <FlatList
                data={searchResults}
                keyExtractor={(item, index) => `${item.name}-${item.lat}-${item.lon}-${index}`}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.resultItem}
                    onPress={() => handleSelectCity(item)}
                  >
                    <Text style={styles.resultItemName}>{formatCityName(item)}</Text>
                    <Text style={styles.resultItemCoords}>
                      {item.lat.toFixed(2)}, {item.lon.toFixed(2)}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        </View>
      </Modal>

      {isLoadingWeather && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Adicionando cidade...</Text>
        </View>
      )}

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
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchInput: {
    flex: 1,
    height: 44,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 80,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#666',
  },
  emptyResults: {
    padding: 40,
    alignItems: 'center',
  },
  emptyResultsText: {
    fontSize: 16,
    color: '#999',
  },
  resultItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  resultItemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  resultItemCoords: {
    fontSize: 12,
    color: '#999',
  },
});
