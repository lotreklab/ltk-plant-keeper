import React, { useRef, useState , useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


//blank page with text in the middle
export default function Index() {
  // Set user has already boarded
  // Check if user has already boarded

  return (
    <View style={styles.container}>
        <SafeAreaView style={styles.containerSafe}>
            <Text>Homepage 2</Text>
        </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    containerSafe: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});