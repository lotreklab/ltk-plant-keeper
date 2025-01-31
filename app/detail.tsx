import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Animated,
  ImageBackground,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { FetchPlant, PlantState } from '@/store/reducers/plants';

export default function Detail({ navigation }: { navigation: any }) {
  const tags = ['Danger', 'Decoration'];
  const route = useRoute();
  const { id } = route.params;

  const dispatch = useDispatch();
  const { plant, error, loading } = useSelector((state: PlantState) => state.plants);

  useEffect(() => {
    dispatch(FetchPlant(id));
  }, []);

  // Scroll Animation
  const scrollY = useRef(new Animated.Value(0)).current;

  const imageScale = scrollY.interpolate({
    inputRange: [-300, 0, 0], // Scroll up expands, scroll down shrinks
    outputRange: [2.5, 1, 1], // Max zoom at scroll
    extrapolate: 'clamp',
  });

  const imageTranslateY = scrollY.interpolate({
    inputRange: [-300, 0, 0],
    outputRange: [-100, 0, 0], // Moves up when pulling down
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        {/* Zooming Background Image */}
        <Animated.View style={[styles.imageBox, { transform: [{ scale: imageScale }, { translateY: imageTranslateY }] }]}>
          <ImageBackground source={{ uri: plant?.image_url }} style={styles.image}>
            
          </ImageBackground>
        </Animated.View>

        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.absoluteButton}>
            <Ionicons name="heart-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Core Content */}
        <View style={styles.coreContainer}>
          {/* Tags List */}
          <View style={styles.tagContainer}>
            <FlatList
              data={tags}
              horizontal
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.tag}>
                  <Text style={styles.tagText}>{item}</Text>
                </View>
              )}
              contentContainerStyle={styles.tagList}
            />
          </View>

          {/* Title */}
          <Text style={styles.title}>{plant?.common_name}</Text>

          {/* Genus and Family */}
          <View style={styles.cardTextBoxWrapper}>
            <View style={styles.cardTextBox}>
              <Text style={styles.cardTags}>Genus</Text>
              <Text style={styles.cardSubtitle}>{plant?.main_species?.genus}</Text>
            </View>

            <View style={styles.cardTextBox}>
              <Text style={styles.cardTags}>Family</Text>
              <Text style={styles.cardSubtitle}>{plant?.main_species?.family}</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.cardTextBox}>
            <Text style={styles.cardTags}>Description</Text>
            <Text style={styles.description}>{plant?.description}</Text>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageBox: {
    width: '100%',
    height: 240,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
  },
  coreContainer: {
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 80,
  },
  tagList: {
    marginVertical: 16,
    flexWrap: 'wrap',
  },
  tagContainer: {
    flexGrow: 0,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: '#E7F2FD',
    marginRight: 10,
    marginBottom: 2,
  },
  tagText: {
    color: '#2F91EB',
    fontSize: 12,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 8,
  },
  description: {
    fontSize: 14,
    color: '#6A6F7D',
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
  cardTextBoxWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  cardTextBox: {
    flexDirection: 'column',
    marginBottom: 10,
    marginRight: 20,
    marginTop: 18,
  },
  buttonWrapper: {
    position: 'absolute',
    top: 215,
    right: 16,
  },
  absoluteButton: {
    width: 50,
    height: 50,
    backgroundColor: '#FF6262',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

