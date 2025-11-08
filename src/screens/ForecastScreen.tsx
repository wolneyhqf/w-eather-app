import { RouteProp } from "@react-navigation/native";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { CityWeather } from "../types";

function ForecastScreen({ route }: { route: RouteProp<{ ForecastScreen: { cityWeather: CityWeather } }> }) {
    const { cityWeather } = route.params;
    const hourlyForecast = cityWeather.hourly.slice(0, 8);

    function formatTime(datetime: string): string {
        try {
            const date = new Date(datetime);
            if (isNaN(date.getTime())) {
                return datetime;
            }
            return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        } catch (error) {
            return datetime;
        }
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.header}>
                <Text style={styles.cityName}>{cityWeather.cityName}</Text>
                <Text style={styles.subtitle}>Previsão das Próximas 8 Horas</Text>
            </View>

            {hourlyForecast.map((hour, index) => (
                <View key={index} style={styles.hourCard}>
                    <View style={styles.hourHeader}>
                        <View style={styles.timeContainer}>
                            <Text style={styles.timeLabel}>Hora</Text>
                            <Text style={styles.timeValue}>{formatTime(hour.datetime)}</Text>
                        </View>
                        <View style={styles.temperatureContainer}>
                            <Text style={styles.temperature}>{hour.temperature}°C</Text>
                        </View>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingVertical: 16,
    },
    header: {
        alignItems: 'center',
        marginBottom: 24,
        paddingHorizontal: 16,
    },
    cityName: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#7f8c8d',
        fontWeight: '500',
    },
    hourCard: {
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
    hourHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    timeContainer: {
        alignItems: 'flex-start',
    },
    timeLabel: {
        fontSize: 12,
        color: '#6c757d',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    timeValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    temperatureContainer: {
        alignItems: 'flex-end',
    },
    temperature: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#3498db',
    },
});

export default ForecastScreen;