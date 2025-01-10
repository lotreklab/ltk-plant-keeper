import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function PlantLearningPage() {
  const renderCard = ({ item }: { item: { image: string; title: string; subtitle: string } }) => (
    <TouchableOpacity style={[styles.card, { width: 300, height: 160 }]}>
      <ImageBackground source={{ uri: item.image }} style={styles.cardBackground}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );

  const renderSmallCard = ({ item }: { item: { image: string; title: string } }) => (
    <TouchableOpacity style={[styles.card, { width: 125, height: 145 }]}>
      <ImageBackground source={{ uri: item.image }} style={styles.cardBackground}>
        <Text style={styles.cardTitle}>{item.title}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );

  const cardsData = [
    { image: 'https://via.placeholder.com/300x160', title: 'Card Title', subtitle: 'Card Subtitle' },
    { image: 'https://via.placeholder.com/300x160', title: 'Another Card', subtitle: 'Another Subtitle' },
  ];

  const smallCardsData = [
    { image: 'https://via.placeholder.com/125x145', title: 'Small Card' },
    { image: 'https://via.placeholder.com/125x145', title: 'Another Small Card' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <Image source={require('@/assets/images/home-header.png')} style={styles.imageHeader} />

      <View style={styles.header}>
        <Text style={styles.title}>Hello Taylor</Text>
        <Text style={styles.subtitle}>Let's learn more about plants</Text>
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

      <ScrollView style={styles.containerSafe}>

        <TouchableOpacity style={styles.button}>
          <Ionicons name="leaf" size={20} color="#2DDA93" style={styles.searchIcon} />
          <Text style={styles.buttonText}>Species</Text>
        </TouchableOpacity>

        <Text style={styles.sliderTitle}>Tipologia di piante</Text>
        {/* Large Carousel */}
        <FlatList
          data={cardsData}
          renderItem={renderCard}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.carousel}
        />

        <Text style={styles.sliderTitle}>Fotografie</Text>
        {/* Small Carousel */}
        <FlatList
          data={smallCardsData}
          renderItem={renderSmallCard}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.carousel}
        />

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFDFF',
    padding: 20,
  },
  containerSafe: {
      // justifyContent: 'center',
      // alignItems: 'stretch',
  },
  imageHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 265,
  },
  header: {
    marginBottom: 20,
    marginTop: 120,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  sliderTitle: {
    fontSize: 18,
    color: '#36455A',
    fontWeight: "700",
    marginBottom: 14,
  },
  searchContainer: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 3,
    alignItems: 'center',
    marginBottom: 32,
    elevation: 1,
  },
  buttonText: {
    color: '#6A6F7D',
    fontSize: 16,
    fontWeight: '400',
    marginTop: 6,
    textTransform: "uppercase",
  },
  carousel: {
    marginBottom: 20,
  },
  card: {
    marginRight: 15,
    borderRadius: 8,
    overflow: 'hidden',
  },
  cardBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 10,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    color: '#fff',
    fontSize: 14,
  },
  searchBarContainer: {
    marginTop: 0,
    paddingHorizontal: 20,
    marginBottom: 40,
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
