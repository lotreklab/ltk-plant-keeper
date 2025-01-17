import React from 'react';
import { SectionListBasics } from '@/components/SectionListBasics';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

//blank page with text in the middle
export default function FavoriteScreen() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.containerSafe}>
        <Text>Favorites</Text>
        <SectionListBasics />
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