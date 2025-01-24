import React, {useEffect, useMemo} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import {FetchPlantsBySpecies, PlantSpecies} from '@/store/reducers/species';
import { useDispatch, useSelector } from 'react-redux';

import HeaderWithSearch from '../components/ui/headerWithSearch';

type CardData = {
  id: string;
  image: any; // Replace with string if using remote URIs
  title: string;
  subtitle: string;
  tags: string;
  description: string;
  kingdom: string;
  family: string;
};

export default function Category({ navigation }: { navigation: any }) {
  const route = useRoute();
  const { id } = route.params;

  const dispatch = useDispatch();
  const { variety, loading, error } = useSelector((state: PlantSpecies ) => state.species);
  useEffect(()=>{
    dispatch(FetchPlantsBySpecies(id))
  },[])



  const renderCard = ({ item }: { item: CardData }) => (
    <View style={styles.card}>
      <Image source={{uri: item.image_url}} style={styles.cardImage} />
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardTitle}>{item.common_name}</Text>

        <View style={styles.cardTextBoxWrapper}>
          <View style={styles.cardTextBox}>
            <Text style={styles.cardTags}>Genus</Text>
            <Text style={styles.cardSubtitle}>{item.genus}</Text>
          </View>

          <View style={styles.cardTextBox}>
            <Text style={styles.cardTags}>Family</Text>
            <Text style={styles.cardSubtitle}>{item.family}</Text>
          </View>
        </View>

        <View style={styles.cardTextBox}>
          <Text style={styles.cardTags}>Scientific Name</Text>
          <Text style={styles.cardDescription}>{item.scientific_name}</Text>
        </View>

      </View>
    </View>
  );

  const handleSearch = (text) => {
    console.log('Search text:', text);
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <HeaderWithSearch
        title="Category"
        onSearch={handleSearch}
        showBackButton = {true}
        fadedText = "Home"
      />


      {/* Vertical List */}
      <FlatList
        data={variety}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FB',
  },
  listContainer: {
    paddingTop: 50,
    paddingBottom: 80,
  },
  card: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e9e9e9',
  },
  cardTextBoxWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  cardTextBox: {
    flexDirection: 'column',
    marginBottom: 10,
    marginRight: 20,
  },
  cardImage: {
    width: 125,
    height: 125,
    borderRadius: 8,
    marginRight: 10,
    borderWidth: 7,
    borderColor: '#FFFFFF'
  },
  cardTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#36455A',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    fontWeight: '400',
    color: '#36455A',
    marginBottom: 2,
  },
  cardTags: {
    fontSize: 12,
    color: '#A1A8B9',
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  cardDescription: {
    fontSize: 12,
    color: '#36455A',
  },
  searchBarContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  }
});
