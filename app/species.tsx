import React, {useEffect} from 'react';
import { SectionListBasics } from '@/components/SectionListBasics';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import {FetchSpecies, PlantSpecies} from '@/store/reducers/species';


//blank page with text in the middle
export default function SpeciesScreen() {
  const dispatch = useDispatch();
  const { variety, loading, error } = useSelector((state: PlantSpecies ) => state.species);
  useEffect(()=>{
    dispatch(FetchSpecies())
  },[])

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.containerSafe}>
        <Text>Species</Text>
        {variety.map((item, key)=>(
          <Text>{item.common_name}</Text>
        )
          
        )}
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