import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Detail({ navigation }: { navigation: any }) {
  const tags = ['Danger', 'Decoration'];

  return (
    <ScrollView style={styles.container}>
      {/* Background Image Box */}
      <ImageBackground
        source={require('@/assets/images/home-big-2.png')} // Replace with your image
        style={styles.imageBox}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.absoluteButton}>
            <Ionicons name="heart-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

      </ImageBackground>

      <View style={styles.coreContainer}>
        {/* Horizontal List of Tags */}
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

        {/* Detail Title */}
        <Text style={styles.title}>Circle Cactus</Text>

        <View style={styles.cardTextBoxWrapper}>
          <View style={styles.cardTextBox}>
            <Text style={styles.cardTags}>Kingdom</Text>
            <Text style={styles.cardSubtitle}>Plantae</Text>
          </View>

          <View style={styles.cardTextBox}>
            <Text style={styles.cardTags}>Family</Text>
            <Text style={styles.cardSubtitle}>Cactaeae</Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.cardTextBox}>
          <Text style={styles.cardTags}>Description</Text>
          <Text style={styles.description}>
            This cactus is a perfect choice for indoor spaces. It requires minimal water and adds a
            touch of greenery to any room.
            This cactus is a perfect choice for indoor spaces. It requires minimal water and adds a
            touch of greenery to any room.
            This cactus is a perfect choice for indoor spaces. It requires minimal water and adds a
            touch of greenery to any room.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageBox: {
    height: 240,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    padding: 16,
    position: 'relative',
  },
  backButton: {
    width: 32,
    height: 32,
    marginBottom: 16,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
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
    bottom: -25, // Half of the button's size (50px height / 2)
    right: 16, // Position the button on the right
  },
  absoluteButton: {
    width: 50,
    height: 50,
    backgroundColor: '#FF6262',
    borderRadius: 25, // 50% of the width/height for a perfect circle
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Add shadow for Android
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  
});
