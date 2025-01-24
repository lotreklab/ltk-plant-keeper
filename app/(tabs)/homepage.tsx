import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, ImageBackground, StyleSheet, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation} from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { daysentence } from "@/store/reducers/motivational";

import HeaderWithSearch from '../../components/ui/headerWithSearch';

const GoToSpecies = ({ navigation }: { navigation: any }) => {
  return(
    <>
      {/* <TouchableOpacity style={styles.Btn_species} onPress={()=>{navigation.navigate("species")}}>
        <Ionicons name="leaf" size={20} color="#2DDA93" style={{ marginRight: 8 }} />
        <Text style={styles.buttonText}>Species</Text>
      </TouchableOpacity> */}
      <Pressable
        onPress={()=>{navigation.navigate("species")}}
        style={({pressed}) => [
          { backgroundColor: pressed ? '#FBFDFF' : '#fff' }, styles.Btn_species,
        ]}
      >
        <Ionicons name="leaf" size={20} color="#2DDA93" style={{ marginRight: 8 }} />
        <Text style={styles.buttonText}>Species</Text>
      </Pressable>
    </>
  )
}

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

const HorizontalSlider = ({ title, data, render } : { title: string; data: Array<{ image: string; title: string; subtitle: string }>; render: Array<any>}) => (
  <View style={{ marginLeft: 24 }}>
    <Text style={styles.Text_slider}>{title}</Text>
    <FlatList
      data={data}
      renderItem={render}
      keyExtractor={(item, index) => index.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.carousel}
      ListFooterComponent={() => <View style={{ width: 12 }} />}
    />
  </View>
);

const cardsData = [
  { image: require('@/assets/images/home-big-1.png'), title: 'Card Title', subtitle: 'Card Subtitle' },
  { image: require('@/assets/images/home-big-2.png'), title: 'Another Card', subtitle: 'Another Subtitle' },
];

const smallCardsData = [
  { image: require('@/assets/images/home-mini-1.png'), title: '#Mini', subtitle: '' },
  { image: require('@/assets/images/home-mini-2.png'), title: '#Homely', subtitle: '' },
  { image: require('@/assets/images/home-mini-3.png'), title: '#Cute', subtitle: '' },
];

export default function PlantLearningPage() {
  const navigation=useNavigation();
  const greenDay = useSelector(state => state.wordgarden.value)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(daysentence());
  }, [dispatch]);

  const handleSearch = (text: string) => {
    console.log('Search text:', text);
  };


  const dataHomepage = ({ item } : { item: string }) => {
    switch (item) {
      case 'btnSpecies':
        return (
          <View style={{ marginTop: 48, paddingHorizontal: 24 }}>
            <GoToSpecies navigation={navigation} />
          </View>
        );
      case 'typePlants':
        return <HorizontalSlider title="Tipologia di piante" data={cardsData} render={renderCard} />;
      case 'lastPhotos':
        return <HorizontalSlider title="Fotografie" data={smallCardsData} render={renderSmallCard}/>;
      default: return null;
    }
  }

  return (
    <FlatList
      ListHeaderComponent={() => {
        return (
          <HeaderWithSearch
            title="Benvenuto su Plant Keeper"
            subtitle={greenDay}
            onSearch={handleSearch}
            showBackButton = {false}
            fadedText = "Home"
          />
        );
      }}
      data={['btnSpecies', 'typePlants', 'lastPhotos']}
      renderItem={({ item }) => dataHomepage({ item })}
      ListFooterComponent={() => <View style={{ height: 48 }} />}
    />
  );
}

const styles = StyleSheet.create({
  Btn_species: {
    width: '100%',
    paddingVertical: 24,
    boxShadow: '0px 0px 8px rgba(50, 50, 50, 0.1)',
    marginBottom: 32,
    borderRadius: 3,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#6A6F7D',
    fontSize: 14,
    fontWeight: '400',
    textTransform: "uppercase",
  },
  Text_slider: {
    fontFamily: 'SFProDisplayBold',
    fontWeight: 'bold',
    fontSize: 17,
    lineHeight: 21,
    marginBottom: 16,
    color: '#36455A'
  },
  carousel: {
    marginBottom: 24
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
  }
});
