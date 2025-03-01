import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

type PlaceProps = {
  setSelectedLocation: (location: { name: string, description: string,  address: string,latitude: number; longitude: number }) => void;
};

const Places: React.FC<PlaceProps> = ({ setSelectedLocation }) => {
  const places = useSelector((state: RootState) => state.places.places);

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.place_id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            setSelectedLocation({
              name: item.name,
              description: item.description,
              address: item.address,
              latitude: item.latitude,
              longitude: item.longitude
            });
          }}
        >
          <View style={styles.row}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description}>{item.address}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 12,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    backgroundColor: '#f9f9f9',
  },
  row: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 13,
    fontWeight: 'normal',
  },
});

export default Places;
