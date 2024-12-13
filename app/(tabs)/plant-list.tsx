import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import useFetchData from '@/hooks/useFetchData';
import Plant from '@/types/plant';


const PlantList = () => {
    const { data, loading, error } = useFetchData<Plant[]>('/plant/search?alias=acer&limit=10&offset=20');
    
    if (loading) {
        return (
        <View style={styles.container}>
            <ActivityIndicator size="large" />
        </View>
        );
    }
    
    if (error) {
        return (
        <View style={styles.container}>
            <Text>{error}</Text>
        </View>
        );
    }
    
    const results = data?.results || [];
    const next = data?.next;
    const previous = data?.previous;
    const count = data?.count;
    return (
        <View style={styles.container}>
        <Text>Plant count: {count}</Text>
        {results.map(plant => (
            <Text key={plant.pid}>{plant.display_pid}</Text>
        ))}
        </View>
    );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default PlantList;
