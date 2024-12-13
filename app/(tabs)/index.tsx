import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


//blank page with text in the middle
export default function Photo() {
  const navigation = useNavigation();
  // Set user has already boarded
  const isAlreadyBoarded = true;
  // Check if user has already boarded
  if (isAlreadyBoarded){
    navigation.navigate('onboarding' as never);
  } else {
    navigation.navigate('homepage' as never);
  }
  return (
    <View style={styles.container}>
        <SafeAreaView style={styles.containerSafe}>
            <Text>index</Text>
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