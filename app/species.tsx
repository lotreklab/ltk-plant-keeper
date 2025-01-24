import React, { useEffect, useMemo, useState, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FetchSpecies, PlantSpecies } from '@/store/reducers/species';
import HeaderWithSearch from '@/components/ui/headerWithSearch';
import { SectionListBasics } from '@/components/SectionListBasics';
import { searchFilterFunction } from '@/components/SearchFilterFunction'; // Importa la funzione

export default function SpeciesScreen() {
  const dispatch = useDispatch();
  const { variety, loading, error } = useSelector((state: PlantSpecies) => state.species);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    dispatch(FetchSpecies());
  }, [dispatch]);

  const handleSearch = (text: string) => {
    searchFilterFunction(text, variety, setFilteredData); // Usa la funzione importata
  };

  const orderItems = useMemo(() => {
    const groupedVariety = variety.reduce((acc: { [x: string]: any[] }, item: { common_name: string[] }) => {
      const firstLetter = item.common_name[0].toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(item.common_name);
      return acc;
    }, {});

    return Object.keys(groupedVariety).sort().map(letter => ({
      title: letter,
      data: groupedVariety[letter],
    }));
  }, [variety]);

  useEffect(() => {
    setFilteredData(orderItems);
  }, [orderItems]);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      <HeaderWithSearch
        title="Specie"
        onSearch={handleSearch} // Usa la funzione di gestione della ricerca
        fadedText="Specie"
      />
      <View style={styles.containerSafe}>
        <SectionListBasics  data={filteredData} />
      </View>
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