import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, FlatList, ScrollView, RefreshControl, Animated } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';

import image1 from '../assets/images/image2.png';
import image2 from '../assets/images/image4.png';
import image3 from '../assets/images/image5.png';
import image4 from '../assets/images/image8.png';

const Explore = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [isMapExpanded, setIsMapExpanded] = useState(false); 

  const images = [image1, image2, image3, image4];

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const mapHeight = useRef(new Animated.Value(200)).current; 

  
  const toggleMapSize = () => {
    if (isMapExpanded) {
      
      Animated.timing(mapHeight, {
        toValue: 200, 
        duration: 300,
        useNativeDriver: false,
      }).start(() => setIsMapExpanded(false));
    } else {
      
      Animated.timing(mapHeight, {
        toValue: 600, 
        duration: 300,
        useNativeDriver: false,
      }).start(() => setIsMapExpanded(true));
    }
  };

  const renderImageItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <Image source={item} style={styles.cardImage} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/bglocation.png')} style={styles.backgroundImage} />

      <Animated.View style={[styles.mapContainer, { height: mapHeight }]}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 14.551992,
            longitude: 121.024445,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{ latitude: 14.551992, longitude: 121.024445 }}
            title="BGC Cafe"
            description="A cozy spot in BGC, Manila"
          />
        </MapView>

        <TouchableOpacity style={styles.swipeIndicator} onPress={toggleMapSize}>
          <Icon
            name={isMapExpanded ? "chevron-down-outline" : "chevron-up-outline"}
            size={30}
            color="#888"
          />
        </TouchableOpacity>
      </Animated.View>

      <ScrollView
        contentContainerStyle={styles.scrollableContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.openingSection}>
          <View style={styles.headerContainerRow}>
            <Text style={styles.headerText}>When We're Open</Text>
            <View style={styles.socialContainer}>
              <TouchableOpacity onPress={() => Linking.openURL('https://facebook.com')}>
                <View style={styles.socialIconContainer}>
                  <Image source={require('../assets/images/facebook.png')} style={styles.socialIcon} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL('https://tiktok.com')}>
                <View style={styles.socialIconContainer}>
                  <Image source={require('../assets/images/tiktok.png')} style={styles.socialIcon} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL('https://twitter.com')}>
                <View style={styles.socialIconContainer}>
                  <Image source={require('../assets/images/x.png')} style={styles.socialIcon} />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.hoursContainer}>
            <View style={styles.hoursSection}>
              <Text style={styles.hoursTitle}>Opening Hours</Text>
              <Text style={styles.hoursTime}>Time</Text>
            </View>
            <View style={styles.hoursDetailContainer}>
              <View style={styles.hoursRow}>
                <Text style={styles.hoursText}>Monday - Friday</Text>
                <Text style={styles.hoursTimeText}>7:30 AM - 6:00 PM</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.hoursRow}>
                <Text style={styles.hoursText}>Saturday - Sunday</Text>
                <Text style={styles.hoursTimeText}>7:30 AM - 12:30 PM</Text>
              </View>
            </View>
          </View>

          <View style={styles.cozyChillContainer}>
            <Text style={styles.cozyChillTitle}>Cozy & Chill</Text>
            <Text style={styles.cozyChillDescription}>The perfect spot to unwind, connect and escape</Text>
          </View>

          <View style={styles.imageListContainer}>
            <FlatList
              data={images}
              renderItem={renderImageItem}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.imageList}
            />
          </View>
        </View>
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  mapContainer: {
    position: 'relative',
    width: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  swipeIndicator: {
    position: 'absolute',
    bottom: 10, 
    alignSelf: 'center', 
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    borderRadius: 20,
    padding: 5,
  },
  scrollableContent: {
    paddingHorizontal: 25,
    paddingTop: 20,
  },
  openingSection: {
    marginBottom: 20,
  },
  headerContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#e0a15e',
  },
  socialContainer: {
    flexDirection: 'row',
  },
  socialIconContainer: {
    backgroundColor: '#fff',
    borderRadius: 30, 
    padding: 10,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  socialIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  hoursContainer: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },
  hoursSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: -5,
  },
  hoursTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#242220',
  },
  hoursTime: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#e0a15e',
  },
  hoursDetailContainer: {
    padding: 15,
    borderRadius: 10,
  },
  hoursRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  hoursText: {
    fontSize: 14,
    color: '#888888',
  },
  hoursTimeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#242220',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 8,
  },
  cozyChillContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  cozyChillTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#e0a15e',
  },
  cozyChillDescription: {
    fontSize: 13,
    color: '#fff',
  },
  imageListContainer: {
    marginTop: 20,
  },
  imageList: {
    paddingHorizontal: 5,
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    marginHorizontal: 10,
    marginBottom: 100
  },
  cardImage: {
    width: 200,
    height: 200,
  },
});

export default Explore;
