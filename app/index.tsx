import { View, StyleSheet, TextInput } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import SearchBar from '@/components/SearchBar';
import Places from '@/components/Places';
import { store } from '@/redux/store';
import { Provider } from 'react-redux';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Card } from '@ant-design/react-native';

export default function HomeScreen() {
  const mapRef = useRef<MapView>(null);
  const searchBarRef = useRef<TextInput>(null);

  const [showPlaceList, setShowPlaceList] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<{
    name: string; //place name 
    description: string; //place description 
    address: string; //place address 
    latitude: number; //place latitude
    longitude: number; // place longitude
  } | null>(null);

  useEffect(() => {
    if (selectedLocation && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: selectedLocation.latitude,
          longitude: selectedLocation.longitude,
          latitudeDelta: 0.02, // zoom level
          longitudeDelta: 0.02, // zoom level
        },
        1000 // animation duration (miliseconds unit)
      );

      setSearchText(selectedLocation.name);
      setShowPlaceList(false);
      searchBarRef.current?.blur();
    }
  }, [selectedLocation]);

  const handleClearMap = () => {
    setSearchText('');
    setSelectedLocation(null);
  };

  const handleShowSelectedLocation = (location: { name: string; description: string; address: string; latitude: number; longitude: number; }) => {
    setShowPlaceList(false);
    setSelectedLocation(location);
    setSearchText(location?.name);
  }

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={StyleSheet.absoluteFillObject}
          initialRegion={{
            latitude: 3.139,
            longitude: 101.6869,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          {selectedLocation && (
            <Marker
              coordinate={{
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude,
              }}
              title={selectedLocation.name}
              description={selectedLocation.address}
            />
          )}
        </MapView>

        <Card style={styles.cardStick}>
          <SearchBar
            ref={searchBarRef}
            value={searchText}
            onChangeText={(text) => setSearchText(text)} 
            onFocus={() => setShowPlaceList(true)}
            onClear={() => handleClearMap()}
          />
          <View style={showPlaceList ? {} : { display: 'none' }}>
            <Places
              setSelectedLocation={(location) => {
                handleShowSelectedLocation(location);
              }}
            />
          </View>
        </Card>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardStick: {
    paddingTop: 5,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    elevation: 5,
  },
});