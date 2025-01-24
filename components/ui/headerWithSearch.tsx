import React from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity  } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const HeaderWithSearch = ({
  title,
  subtitle = null,
  image = require('@/assets/images/headerBg.png'),
  onSearch,
  showBackButton = true,
  fadedText = null
}) => {

  const navigation = useNavigation();

  return (
    <View style={styles.View_wrapper}>
      <Image
        source={image}
        style={styles.Image_bg}
        resizeMode='cover'
      />
      <View style={[styles.View_wrapperContent, { paddingTop: showBackButton ? 32 : 72 }]}>
        <View style={[styles.View_header]} >
          {showBackButton && (
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
          )}
          <Text style={[!subtitle ? styles.titleWithoutSubtitle : styles.Text_title]}>{title}</Text>
          {subtitle && <Text style={styles.subtitle} numberOfLines={3}>{subtitle}</Text>}
          {fadedText && <Text style={styles.fadedText}>{fadedText}</Text>}
        </View>

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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  View_wrapper: {
    width: '100%'
  },
  Image_bg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '100%',
    resizeMode: "cover",
    zIndex: 0
  },
  View_wrapperContent: {
    width: '100%',
    paddingBottom: 42,
    overflow: 'visible'
  },
  View_header: {
    paddingHorizontal: 24,
  },
  Text_title: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10
  },
  backButton: {
    position: 'relative',
    paddingVertical: 24,
    paddingRight: 24,
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

  titleWithoutSubtitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    minHeight: 60
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
    shadowColor: '#B6B6B6',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.14,
    shadowRadius: 20,
    position: 'absolute',
    width: '100%',
    bottom: 0,
    height: 50,
    marginBottom: -25
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    paddingHorizontal: 10,
    elevation: 1,
    height: 50,
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
