import React from 'react';
import { SectionListBasics } from '@/components/SectionListBasics';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderWithSearch from '@/components/ui/headerWithSearch';

//blank page with text in the middle
export default function FavoriteScreen() {
  return (
    <View style={styles.container}>
      <HeaderWithSearch
        title="Preferiti"
        showBackButton = {false}
        fadedText = "Preferiti"
      />
      <SectionListBasics data={[]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
