import React, { useState, useEffect }  from 'react';
import {SectionList, StyleSheet, Text, TextInput, View} from 'react-native';



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    width: '100%',
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
});

export function SectionListBasics() {
  const [search, setSearch] = useState('');
  interface Item {
    title: string;
    data: string[];
  }

  const [filteredDataSource, setFilteredDataSource] = useState<Item[]>([]);
  const [masterDataSource, setMasterDataSource] = useState<Item[]>([]);

  useEffect(() => {
    const staticResponseSections: Item[] = [
        {title: 'D', data: ['Devin', 'Dan', 'Dominic']},
        {
          title: 'J',
          data: [
            'Jackson',
            'James',
            'Jillian',
            'Jimmy',
            'Joel',
            'John',
            'Julie',
          ],
        },
        {
          title: 'K',
          data: [
            'Kackson',
            'Kames',
            'Killian',
            'Kimmy',
            'Koel',
            'Kohn',
            'Kulie',
          ],
        },
        {
          title: 'M',
          data: [
            'Mackson',
            'Mames',
            'Millian',
            'Mimmy',
            'Moel',
            'Mohn',
            'Mulie',
          ],
        },
    ];
    setFilteredDataSource(staticResponseSections);
    setMasterDataSource(staticResponseSections);
    /* fetch('')
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
      })
      .catch((error) => {
        console.error(error);
      }); */
  }, []);

  const searchFilterFunction = (text: string) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.map(function (item) {
        // Applying filter for the inserted text in search bar
        const textData = text.toUpperCase();
        // Search inside the data array
        const dataMatch = item.data.filter(dataItem => dataItem.toUpperCase().indexOf(textData) > -1);
        // Return only the items that have a match in the data array
        if (dataMatch.length > 0) {
          return { ...item, data: dataMatch };
        }
        return null;
      }).filter(item => item !== null) as Item[];
        /* return itemData.indexOf(textData) > -1; */
      /* }); */
      console.log('newData',newData);
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };
  return (
    <View style={styles.container}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />
      <SectionList
        /* sections={[
          {title: 'D', data: ['Devin', 'Dan', 'Dominic']},
          {
            title: 'J',
            data: [
              'Jackson',
              'James',
              'Jillian',
              'Jimmy',
              'Joel',
              'John',
              'Julie',
            ],
          },
          {
            title: 'K',
            data: [
              'Kackson',
              'Kames',
              'Killian',
              'Kimmy',
              'Koel',
              'Kohn',
              'Kulie',
            ],
          },
          {
            title: 'M',
            data: [
              'Mackson',
              'Mames',
              'Millian',
              'Mimmy',
              'Moel',
              'Mohn',
              'Mulie',
            ],
          },
        ]} */
        sections={filteredDataSource}
        renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
        renderSectionHeader={({section}) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        keyExtractor={item => `basicListEntry-${item}`}
      />
    </View>
  );
};
