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

import HeaderWithSearch from '../../components/ui/headerWithSearch';

const { width } = Dimensions.get('window');

export default function PlantLearningPage() {
  const renderCard = ({ item }: { item: { image: string; title: string; subtitle: string } }) => (
    <TouchableOpacity style={[styles.card, { width: 300, height: 160 }]}>
      <ImageBackground source={item.image} style={styles.cardBackground}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );

  const renderSmallCard = ({ item }: { item: { image: string; title: string } }) => (
    <TouchableOpacity style={[styles.card, { width: 125, height: 145 }]}>
      <ImageBackground source={item.image} style={styles.cardBackground}>
        <Text style={styles.cardTitleMini}>{item.title}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );

  const cardsData = [
    { image: require('@/assets/images/home-big-1.png'), title: 'Card Title', subtitle: 'Card Subtitle' },
    { image: require('@/assets/images/home-big-2.png'), title: 'Another Card', subtitle: 'Another Subtitle' },
  ];

  const smallCardsData = [
    { image: require('@/assets/images/home-mini-1.png'), title: '#Mini' },
    { image: require('@/assets/images/home-mini-2.png'), title: '#Homely' },
    { image: require('@/assets/images/home-mini-3.png'), title: '#Cute' },
  ];

  const handleSearch = (text) => {
    console.log('Search text:', text);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <HeaderWithSearch
        title="Hello Taylor"
        subtitle="Let's learn more about plants"
        onSearch={handleSearch}
        showBackButton = {false}
        fadedText = "Home"
      />

      <ScrollView style={[styles.containerSafe, { paddingLeft: 16 }]} showsVerticalScrollIndicator={false}>
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

        <View style={{ height: 32 }} />

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFDFF',
  },
  containerSafe: {
    // justifyContent: 'center',
    // alignItems: 'stretch',
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
    fontSize: 12,
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
  cardTitleMini: {
    color: '#2E382FCC',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    color: '#fff',
    fontSize: 14,
  },
  
});
