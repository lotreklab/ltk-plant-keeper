import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { SectionList, Text, View, StyleSheet } from 'react-native';

interface SectionListBasicsProps {
  data: Array<Object>;
}

export const SectionListBasics = forwardRef(({ data }: SectionListBasicsProps, ref) => {
  const [filteredDataSource, setFilteredDataSource] = useState(data);



  const sectionListRef = React.useRef(null);

  useEffect(() => {
    setFilteredDataSource(data);
  }, [data]);

  return (
    <View style={styles.container}>
      <SectionList
        sections={filteredDataSource}
        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
        stickySectionHeadersEnabled={true}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        keyExtractor={item => `basicListEntry-${item}`}
        renderSectionFooter={() => <View style={{ height: 24 }} />}
        style={{ paddingTop: 32 }}
      />
    </View>
  );
});


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
  }
});