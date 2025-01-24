import React, { useEffect, useMemo, useState, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FetchSpecies, PlantSpecies } from '@/store/reducers/species';
import HeaderWithSearch from '@/components/ui/headerWithSearch';
import { SectionListBasics } from '@/components/SectionListBasics-new';

export default function SpeciesScreen() {
  const dispatch = useDispatch();
  const { variety, loading, error } = useSelector((state: PlantSpecies) => state.species);
  const [filteredData, setFilteredData] = useState([]);
  const sectionListRef = useRef(null);

  useEffect(() => {
    dispatch(FetchSpecies());
  }, [dispatch]);

  const searchFilterFunction = (text: string) => {
    const newData = variety.filter(item => {
      const itemData = item.common_name ? item.common_name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    const groupedVariety = newData.reduce((acc: { [x: string]: any[] }, item: { common_name: string[] }) => {
      const firstLetter = item.common_name[0].toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(item.common_name);
      return acc;
    }, {});

    const orderItems = Object.keys(groupedVariety).sort().map(letter => ({
      title: letter,
      data: groupedVariety[letter],
    }));

    setFilteredData(orderItems);
    if (sectionListRef.current) {
      sectionListRef.current.updateData(orderItems);
      sectionListRef.current.scrollToTop();
    }
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
  }, []);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      <HeaderWithSearch
        title="Specie"
        onSearch={searchFilterFunction}
        fadedText="Specie"
      />
      <View style={styles.containerSafe}>
        {filteredData.length === 0 ? (
          <Text>No species found</Text>
        ) : (
          <SectionListBasics data={filteredData} />
        )}
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