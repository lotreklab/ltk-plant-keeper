import React, { useState, useEffect }  from 'react';
import {SectionList, StyleSheet, Text, TextInput, View} from 'react-native';



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
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
  }
});

export function SectionListBasics() {
  const [search, setSearch] = useState('');
  // Item type for the SectionList
  interface Item {
    title: string; // Section title (e.g. 'D', 'J', 'K', 'M')
    data: string[]; // Data for the section (e.g. ['Devin', 'Dan', 'Dominic'])
  }
  // Data for the SectionList: https://reactnative.dev/docs/sectionlist
  const [filteredDataSource, setFilteredDataSource] = useState<Item[]>([]);
  const [masterDataSource, setMasterDataSource] = useState<Item[]>([]);

  useEffect(() => {
    // For the purpose of this example, we will start with static data
    const staticResponseDataSections: Item[] = [
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
    // Fetch data from an API here
    // TODO: Add API fetch here

    /* fetch('')
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
      })
      .catch((error) => {
        console.error(error);
      }); */
      setFilteredDataSource(staticResponseDataSections);
      setMasterDataSource(staticResponseDataSections);
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
      // Update FilteredDataSource with the newData
      setFilteredDataSource(newData);
      // Update Search Query
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      // Update Search Query
      setSearch(text);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.ListHeader}>List Title</Text>

      <TextInput
      style={search ? styles.textInputActive : styles.textInputStyle}
      onChangeText={(text) => searchFilterFunction(text)}
      value={search}
      underlineColorAndroid="transparent"
      placeholder="Search Here"
      />
      <SectionList
      sections={filteredDataSource}
      renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
      renderSectionHeader={({section}) => (
        <Text style={styles.sectionHeader}>{section.title}</Text>
      )}
      keyExtractor={item => `basicListEntry-${item}`}
      renderSectionFooter={() => <View style={{height: 20}} />}
      />
    </View>
  );
};
