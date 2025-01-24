import React from 'react';
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

const categoryData: CardData[] = [
  {
    id: '1',
    image: require('@/assets/images/home-big-1.png'),
    title: 'Plant 1',
    subtitle: 'Subtitle 1',
    tags: 'Tag1, Tag2',
    description: 'A brief description of Plant 1.',
    kingdom: 'Plantae',
    family: 'Cactaceae',

  },
  {
    id: '2',
    image: require('@/assets/images/home-big-1.png'),
    title: 'Plant 2',
    subtitle: 'Subtitle 2',
    tags: 'Tag3, Tag4',
    description: 'A brief description of Plant 2.',
    kingdom: 'Plantae-2',
    family: 'Cactaceae-2',
  },
  {
    id: '3',
    image: require('@/assets/images/home-big-1.png'),
    title: 'Plant3',
    subtitle: 'Subtitle3',
    tags: 'Tag3, Tag4',
    description: 'A brief description of Plant3.',
    kingdom: 'Plantae-3',
    family: 'Cactaceae-3',
  },
  {
    id: '4',
    image: require('@/assets/images/home-big-1.png'),
    title: 'Plant4',
    subtitle: 'Subtitle4',
    tags: 'Tag3, Tag4',
    description: 'A brief description of Plant4.',
    kingdom: 'Plantae-4',
    family: 'Cactaceae-4',
  },
  // Add more cards as needed
];

export default function Category({ navigation }: { navigation: any }) {
  const route = useRoute();
  const { id } = route.params;

  const renderCard = ({ item }: { item: CardData }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.cardImage} />
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardTitle}>{item.title} - {id}</Text>

        <View style={styles.cardTextBoxWrapper}>
          <View style={styles.cardTextBox}>
            <Text style={styles.cardTags}>Kingdom</Text>
            <Text style={styles.cardSubtitle}>{item.kingdom}</Text>
          </View>

          <View style={styles.cardTextBox}>
            <Text style={styles.cardTags}>Family</Text>
            <Text style={styles.cardSubtitle}>{item.family}</Text>
          </View>
        </View>

        <View style={styles.cardTextBox}>
          <Text style={styles.cardTags}>Description</Text>
          <Text style={styles.cardDescription}>{item.description}</Text>
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
        data={categoryData}
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
