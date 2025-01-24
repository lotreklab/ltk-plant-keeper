import React, { useState, useEffect }  from 'react';
import {SectionList, StyleSheet, Text, TextInput, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    width: '100%',
  },
  ListHeader: {
    paddingTop: 25,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 50,
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#2DDA93',
    color: '#FFFFFF',
    marginBottom: -25,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2DDA93',
  },
  item: {
    padding: 10,
    fontSize: 15,
    height: 44,
    color: '#6A6F7D',
    textTransform: 'uppercase',
  },
  textInputStyle: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: 50,
    minWidth: 200,
    width: '90%',
    /* borderWidth: 2,
    borderColor: '#009688', */
    backgroundColor: '#FFFFFF',
    borderRadius: 90,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 24,
    paddingRight: 24,
    color: '#D2D2D2',
    filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
  },
  textInputActive: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: 50,
    minWidth: 200,
    width: '90%',
    /* borderWidth: 2,
    borderColor: '#009688', */
    backgroundColor: '#FFFFFF',
    borderRadius: 90,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 24,
    paddingRight: 24,
    color: '#000000', // Change text color when typing
    filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
  },
  alphabetBar: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  alphabetLetter: {
    fontSize: 14,
    color: '#A1A8B9',
    marginVertical: 4,
  },
  activeLetter: {
    color: '#2DDA93',
    fontWeight: 'bold',
  },
});

interface SectionListBasicsProps {
  data: Array<Object>;
}

export function SectionListBasics({ data }: SectionListBasicsProps) {
  const navigation = useNavigation(); // Hook for navigation

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const [activeLetter, setActiveLetter] = useState('');

  const onViewableItemsChanged = ({ viewableItems }) => {
    const currentSection = viewableItems.find(item => item.section);
    if (currentSection) {
      setActiveLetter(currentSection.section.title);
    }
  };

  return (
    <View style={styles.container}>
      <SectionList
        sections={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={()=>{navigation.navigate("category",{ id: item })}}
          >
            <Text style={styles.item}>{item}</Text>
          </TouchableOpacity>
        )}
        stickySectionHeadersEnabled={true}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        keyExtractor={item => `basicListEntry-${item}`}
        renderSectionFooter={() => <View style={{height: 24 }} />}
        style={{ flex: 1 }}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
      />
      <View style={styles.alphabetBar}>
        {alphabet.map(letter => (
          <Text
            style={[
              styles.alphabetLetter,
              activeLetter === letter && styles.activeLetter,
            ]}
          >
            {letter}
          </Text>
        ))}
      </View>
    </View>
  );
};
