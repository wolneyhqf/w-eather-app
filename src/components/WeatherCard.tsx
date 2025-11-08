import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CityWeather } from "../types";

export interface WeatherCardProps {
  cityWeather: CityWeather;
  onViewForecast?: () => void;
  onRemove?: () => void;
}

export default function WeatherCard({ cityWeather, onViewForecast, onRemove }: WeatherCardProps) {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.cityName}>{cityWeather.cityName}</Text>
          <Text style={styles.datetime}>{cityWeather.datetime}</Text>
        </View>
        {onRemove && (
          <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
            <Text style={styles.removeButtonText}>×</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Temperature */}
      <View style={styles.temperatureContainer}>
        <Text style={styles.temperature}>{cityWeather.temperature}°C</Text>
      </View>

      {/* Weather Details Grid */}
      <View style={styles.detailsGrid}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Humidity</Text>
          <Text style={styles.detailValue}>{cityWeather.humidity}%</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Wind Speed</Text>
          <Text style={styles.detailValue}>{cityWeather.windSpeed} km/h</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Pressure</Text>
          <Text style={styles.detailValue}>{cityWeather.pressure} hPa</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Visibility</Text>
          <Text style={styles.detailValue}>{cityWeather.visibility} km</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>UV Index</Text>
          <Text style={styles.detailValue}>{cityWeather.uvIndex}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Dew Point</Text>
          <Text style={styles.detailValue}>{cityWeather.dewPoint}°C</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        {onViewForecast && (
          <TouchableOpacity style={styles.forecastButton} onPress={onViewForecast}>
            <Text style={styles.forecastButtonText}>View Forecast</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  headerContent: {
    alignItems: 'center',
    flex: 1,
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  datetime: {
    fontSize: 14,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  temperatureContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#3498db',
    textAlign: 'center',
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  detailItem: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  detailLabel: {
    fontSize: 12,
    color: '#6c757d',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
  },
  removeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e74c3c',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  removeButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  actionsContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  forecastButton: {
    backgroundColor: '#3498db',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#3498db',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  forecastButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});