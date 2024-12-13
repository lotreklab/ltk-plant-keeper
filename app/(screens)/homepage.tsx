import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OnboardingLayout: React.FC = ({ children }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Plant Keeper - Homepage</Text>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default OnboardingLayout;
