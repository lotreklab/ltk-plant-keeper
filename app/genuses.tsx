import React, { useEffect, useMemo, useState, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FetchGenus, PlantGenusState } from '@/store/reducers/genus';
import HeaderWithSearch from '@/components/ui/headerWithSearch';
import { SectionListBasics } from '@/components/SectionListBasics';
import { searchFilterFunction } from '@/components/SearchFilterFunction'; // Importa la funzione

export default function GenusScreen() {
  const dispatch = useDispatch();
  const { genusList, loading, error } = useSelector((state: PlantGenusState) => state.genus);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    dispatch(FetchGenus());
  }, [dispatch]);

  const handleSearch = (text: string) => {
    searchFilterFunction(text, genusList, setFilteredData); // Usa la funzione importata
  };


  const orderItems = useMemo(() => {
    const groupedGenus = genusList.reduce((acc: { [x: string]: any[] }, item: { name: string[] }) => {
      const firstLetter = item.name[0].toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push({
        ...item,
        title: item.name,
      });
      return acc;
    }, {});

    return Object.keys(groupedGenus).sort().map(letter => ({
      title: letter,
      data: groupedGenus[letter]
    }));
  }, [genusList]);

  useEffect(() => {
    setFilteredData(orderItems);
  }, [orderItems]);

  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      <HeaderWithSearch
        title="Specie"
        onSearch={handleSearch} // Usa la funzione di gestione della ricerca
        fadedText="Specie"
      />
      <View style={styles.containerSafe}>
        {loading ?
          <View style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color="#2DDA93" />
          </View>
        :
          <SectionListBasics  data={filteredData} path={'category'} />
        }
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
