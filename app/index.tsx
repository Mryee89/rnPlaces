import { View, StyleSheet, TextInput } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import SearchBar from '@/components/SearchBar';
import Places from '@/components/Places';
import { store } from '@/redux/store';
import { Provider } from 'react-redux';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Card } from '@ant-design/react-native';

export default function HomeScreen() {
  const gMapRef = useRef<MapView>(null);
  const searchBarRef = useRef<TextInput>(null);

  const [showPlaceListing, setShowPlaceListing] = useState(true);
  const [searchPlace, setSearchPlace] = useState('');
  const [selectedPlace, setSelectedPlace] = useState<{
    name: string; //place name 
    description: string; //place description 
    address: string; //place address 
    latitude: number; //place latitude
    longitude: number; // place longitude
  } | null>(null);

  useEffect(() => {
    if (selectedPlace && gMapRef.current) {
      gMapRef.current.animateToRegion(
        {
          latitude: selectedPlace.latitude,
          longitude: selectedPlace.longitude,
          latitudeDelta: 0.02, // zoom level
          longitudeDelta: 0.02, // zoom level
        },
        1000 // animation duration (miliseconds unit)
      );

      setSearchPlace(selectedPlace.name);
      setShowPlaceListing(false);
      searchBarRef.current?.blur();
    }
  }, [selectedPlace]);

  const handleClearGMap = () => {
    setSearchPlace('');
    setSelectedPlace(null);
  };

  const handleShowSelectedLocation = (location: { name: string; description: string; address: string; latitude: number; longitude: number; }) => {
    setShowPlaceListing(false);
    setSelectedPlace(location);
    setSearchPlace(location?.name);
  }

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <MapView
          ref={gMapRef}
          provider={PROVIDER_GOOGLE}
          style={StyleSheet.absoluteFillObject}
          initialRegion={{
            latitude: 3.139,
            longitude: 101.6869,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          {selectedPlace && (
            <Marker
              coordinate={{
                latitude: selectedPlace.latitude,
                longitude: selectedPlace.longitude,
              }}
              title={selectedPlace.name}
              description={selectedPlace.address}
            />
          )}
        </MapView>

        <Card style={styles.cardStick}>
          <SearchBar
            ref={searchBarRef}
            value={searchPlace}
            onChangeText={(text) => setSearchPlace(text)} 
            onFocus={() => setShowPlaceListing(true)}
            onClear={() => handleClearGMap()}
          />
          <View style={showPlaceListing ? {} : { display: 'none' }}>
            <Places
              setSelectedPlace={(location) => {
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
    elevation: 5,
    paddingTop: 5,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
});