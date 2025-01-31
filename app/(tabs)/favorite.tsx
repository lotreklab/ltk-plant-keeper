import React, { useMemo } from 'react';
import { SectionListBasics } from '@/components/SectionListBasics';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderWithSearch from '@/components/ui/headerWithSearch';
import { useDispatch, useSelector } from 'react-redux';
import { selectStarredPlants } from '@/store/reducers/starred';

//blank page with text in the middle
export default function FavoriteScreen() {
  const starredPlants = useSelector(selectStarredPlants);

  const orderItems = useMemo(() => {
    const groupedVariety = starredPlants.reduce((acc: { [x: string]: any[] }, item: { common_name: string[] }) => {
      const firstLetter = item.common_name[0].toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push({
        ...item,
        title: item.common_name,
      });
      return acc;
    }, {});

    return Object.keys(groupedVariety).sort().map(letter => ({
      title: letter,
      data: groupedVariety[letter]
    }));
  }, [starredPlants]);


  return (
    <View style={styles.container}>
      <HeaderWithSearch
        title="Preferiti"
        showBackButton = {false}
        fadedText = "Preferiti"
      />
      <SectionListBasics data={orderItems} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
