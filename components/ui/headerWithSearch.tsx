import React from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity  } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const HeaderWithSearch = ({ 
  title, 
  subtitle = '', 
  image = require('@/assets/images/headerBg.png'), 
  onSearch, 
  showBackButton = true, 
  fadedText = ''
}) => {

  const navigation = useNavigation();

  return (
    <>
      <Image source={image} style={styles.imageHeader} />
      <View 
        style={[
          styles.header,
          !subtitle && styles.headerWithoutSubtitle
        ]}
      >
        {showBackButton && (
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        )}
          <Text
            style={[
              styles.title,
              !subtitle && styles.titleWithoutSubtitle
            ]}
          >
            {title}
          </Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}

          {fadedText ? <Text style={styles.fadedText}>{fadedText}</Text> : null}
        </View>

        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#D2D2D2" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search plants..."
              placeholderTextColor="#D2D2D2"
              onChangeText={(text) => onSearch(text)}
            />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  imageHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: 205,
    resizeMode: "cover"
  },
  header: {
    marginBottom: 20,
    marginTop: 120,
    paddingLeft: 24,
  },
  headerWithoutSubtitle: {
    marginBottom: 20,
    marginTop: 105,
    paddingLeft: 24,
  },
  backButton: {
    position: 'absolute',
    top: -80,
    left: 0,
    padding: 20,
  },
  fadedText: {
    position: 'absolute',
    bottom: -40,
    right: -16,
    color: '#fff',
    opacity: 0.15,
    fontSize: 67,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  titleWithoutSubtitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    color: '#FFFFFF',
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
  searchBarContainer: {
    marginTop: 0,
    paddingHorizontal: 20,
    marginBottom: 40,
    shadowColor: '#B6B6B6',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.14,
    shadowRadius: 20,
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

export default HeaderWithSearch;
