import React, {useEffect, useMemo} from 'react';
import { SectionListBasics } from '@/components/SectionListBasics';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {FetchSpecies, PlantSpecies} from '@/store/reducers/species';
import HeaderWithSearch from '@/components/ui/headerWithSearch';

//blank page with text in the middle
export default function SpeciesScreen() {
  const dispatch = useDispatch();
  const { variety, loading, error } = useSelector((state: PlantSpecies ) => state.species);
  useEffect(()=>{
    dispatch(FetchSpecies())
  },[])

  const orderItems = useMemo(() => {
    const groupedVariety = variety.reduce((acc: { [x: string]: any[]; }, item: { common_name: string[]; }) => {
      const firstLetter = item.common_name[0].toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(item.common_name);
      return acc;
    }, {});

    return Object.keys(groupedVariety).sort().map(letter => ({
      title: "letter",
      data: groupedVariety[letter],
    }));
  }, [variety]);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      <HeaderWithSearch
        title="Specie"
        onSearch={() => {}}
        fadedText = "Specie"
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
  containerSafe: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
