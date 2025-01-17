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
  const renderCard = ({ item }: { item: CardData }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.cardImage} />
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardTitle}>{item.title}</Text>

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

  return (
    <View style={styles.container}>

      {/* Header */}
      <Image source={require('@/assets/images/category-bg.png')} style={styles.imageHeader} />


      <View style={[styles.header, { paddingLeft: 24 }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Category</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#D2D2D2" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search plants..."
            placeholderTextColor="#D2D2D2"
          />
        </View>
      </View>

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
  backButton: {
    width: 32,
    height: 32,
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 16,
    marginLeft: 5,
    color: '#333',
  },
  imageHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: 181,
    resizeMode: "cover"
  },
  header: {
    marginBottom: 0,
    marginTop: 70,
  },
  title: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  listContainer: {
    paddingTop: 0,
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
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    paddingHorizontal: 10,
    elevation: 1,
    height: 40,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});
