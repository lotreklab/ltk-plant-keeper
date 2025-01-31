import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import useFetchData from '@/hooks/useFetchData';
import Plant from '@/types/plant';



const PlantList = () => {
    const { data, loading, error } = useFetchData<Plant[]>(`species`);

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

    const results = data?.data || [];
    const next = data?.links.next;
    const count = data?.meta.total || [];

    return (
        <View style={styles.container}>
        <Text>Plant count:{count} </Text>
        {results.map(plant => (
            <Text key={plant.id}>{plant.common_name}</Text>
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
