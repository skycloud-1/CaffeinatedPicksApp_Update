import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, RefreshControl, FlatList, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av';

const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [selectedTemperature, setSelectedTemperature] = useState('');
    const [modalVisible, setModalVisible] = useState(false); 

    const items = [
      { id: 1, title: 'Espresso', category: 'Coffees', image: require('../assets/images/Espresso1.png'), description: 'A strong, concentrated coffee brewed by forcing hot water through finely ground coffee beans.', sweetnessLevel: 'Low', hotPrice: '₱150', icedPrice: '₱200', preparationTime: '5 mins' },
      { id: 2, title: 'Latte', category: 'Coffees', image: require('../assets/images/latte.png'), description: 'A coffee drink made with espresso and steamed milk.', sweetnessLevel: 'Medium', hotPrice: '₱200', icedPrice: '₱250', preparationTime: '7 mins' },
      { id: 3, title: 'Mocha', category: 'Coffees', image: require('../assets/images/mocha.png'), description: 'A chocolate-flavored variant of a latte.', sweetnessLevel: 'High', hotPrice: '₱250', icedPrice: '₱300', preparationTime: '8 mins' },
      { id: 13, title: 'Americano', category: 'Coffees', image: require('../assets/images/americano.png'), description: 'A coffee drink made by diluting an espresso with hot water.', sweetnessLevel: 'Low', hotPrice: '₱180', icedPrice: '₱220', preparationTime: '5 mins' },
      { id: 14, title: 'Macchiato', category: 'Coffees', image: require('../assets/images/macchiato.png'), description: 'An espresso coffee drink with a small amount of milk, usually foamed.', sweetnessLevel: 'Medium', hotPrice: '₱200', icedPrice: '₱250', preparationTime: '6 mins' },
      { id: 19, title: 'Flat White', category: 'Coffees', image: require('../assets/images/Flatwhite.png'), description: 'A coffee drink consisting of espresso with microfoam.', sweetnessLevel: 'Medium', hotPrice: '₱220', icedPrice: '₱270', preparationTime: '7 mins' },
      { id: 4, title: 'Chocolate Chip', category: 'Pastries', image: require('../assets/images/chocolatechip.png'), description: 'A sweet baked dessert with chocolate chips.', sweetnessLevel: 'High', price: '₱100', preparationTime: '10 mins' },
      { id: 5, title: 'Croissant', category: 'Pastries', image: require('../assets/images/croissant.png'), description: 'A buttery, flaky, and soft pastry of French origin.', sweetnessLevel: 'Low', price: '₱150', preparationTime: '12 mins' },
      { id: 8, title: 'Bagel', category: 'Pastries', image: require('../assets/images/bagel.png'), description: 'A round bread roll with a dense, chewy texture.', sweetnessLevel: 'Low', price: '₱100', preparationTime: '8 mins' },
      { id: 9, title: 'Blueberry Muffin', category: 'Pastries', image: require('../assets/images/blueberrymuffin.png'), description: 'A soft and fluffy muffin filled with fresh blueberries, perfect for a sweet snack or breakfast.', sweetnessLevel: 'High', price: '₱120', preparationTime: '10 mins' },
      { id: 15, title: 'Cinnamon Roll', category: 'Pastries', image: require('../assets/images/cinnamonroll.png'), description: 'A sweet roll with a cinnamon-sugar filling.', sweetnessLevel: 'High', price: '₱120', preparationTime: '15 mins' },
      { id: 16, title: 'Danish Pastry', category: 'Pastries', image: require('../assets/images/danish.png'), description: 'A multi-layered, laminated sweet pastry.', sweetnessLevel: 'Medium', price: '₱150', preparationTime: '12 mins' },
      { id: 6, title: 'Ham Sandwich', category: 'Sandwiches', image: require('../assets/images/hamsandwich.png'), description: 'A sandwich made with ham and various toppings.', sweetnessLevel: 'None', price: '₱450', preparationTime: '10 mins' },
      { id: 7, title: 'Turkey Sandwich', category: 'Sandwiches', image: require('../assets/images/turkeysandwich.png'), description: 'A sandwich made with turkey and various toppings.', sweetnessLevel: 'None', price: '₱450', preparationTime: '10 mins' },
      { id: 11, title: 'Grilled Cheese Sandwich', category: 'Sandwiches', image: require('../assets/images/grilledcheese.png'), description: 'A classic sandwich made with melted cheese between two slices of perfectly toasted bread.', sweetnessLevel: 'None', price: '₱250', preparationTime: '8 mins' },
      { id: 12, title: 'Club Sandwich', category: 'Sandwiches', image: require('../assets/images/clubsandwich.png'), description: 'A multi-layered sandwich with turkey, bacon, lettuce, tomato, and mayonnaise, served on toasted bread.', sweetnessLevel: 'None', price: '₱500', preparationTime: '12 mins' },
      { id: 17, title: 'BLT Sandwich', category: 'Sandwiches', image: require('../assets/images/bltsandwhich.png'), description: 'A sandwich made with bacon, lettuce, and tomato.', sweetnessLevel: 'None', price: '₱400', preparationTime: '10 mins' },
      { id: 18, title: 'Veggie Sandwich', category: 'Sandwiches', image: require('../assets/images/veggiesandwhich.png'), description: 'A sandwich made with various vegetables and toppings.', sweetnessLevel: 'None', price: '₱350', preparationTime: '10 mins' },
    ];

    const filteredItems = items.filter(item => {
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        const matchesSearchQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearchQuery;
    });

    const handleSearchIconPress = () => {
        setIsSearchActive(!isSearchActive);
    };

    const handleItemPress = (item) => {
        if (selectedItem && selectedItem.id === item.id) {
            setSelectedItem(null);
            setModalVisible(false); 
        } else {
            setSelectedItem(item);
            setModalVisible(true); 
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    };

    const handleTemperatureSelect = (type) => {
        setSelectedTemperature(type === selectedTemperature ? '' : type); 
    };
    const categories = ['Coffees', 'Pastries', 'Sandwiches'];
    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/bghome.png')} style={styles.backgroundImage} />

            <View style={styles.header}>
                <Image source={require('../assets/images/logo1.png')} style={styles.logo} />
                <View style={styles.searchContainer}>
                    <TouchableOpacity onPress={handleSearchIconPress} style={styles.searchIcon}>
                        <Ionicons name="search" size={24} color="#fff" />
                    </TouchableOpacity>
                    {isSearchActive && (
                        <TextInput
                            style={styles.searchBar}
                            placeholder="Search..."
                            placeholderTextColor="#999"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    )}
                </View>
            </View>

            <View style={styles.introSection}>
                <Text style={styles.headerText}>Let's Brew</Text>
                <Text style={styles.subHeaderText}>Your Insta-worthy coffee spot with the best vibes.</Text>
            </View>

            <View style={styles.tabContainer}>
                {['All', 'Coffees', 'Pastries', 'Sandwiches'].map(category => (
                    <TouchableOpacity
                        key={category}
                        style={[styles.tabButton, selectedCategory === category && styles.activeTabButton]}
                        onPress={() => setSelectedCategory(category)}
                    >
                        <Text style={selectedCategory === category ? styles.activeTabText : styles.tabButtonText}>{category}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.mediaContainer}>
                    <View style={styles.mediaWrapper}>
                        <Video
                            source={require('../assets/videos/video.mp4')}
                            style={styles.video}
                            shouldPlay
                            isLooping
                            resizeMode="cover"
                        />
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {items.slice(0, 3).map(item => (
                                <Image key={item.id} source={item.image} style={styles.swipeableImage} />
                            ))}
                        </ScrollView>
                    </View>
                </ScrollView>

                  {/* Render categorized items */}
                  {categories.map((category) => (
                    <View key={category}>
                        <Text style={styles.itemsText}>{category}</Text>
                        <FlatList
                            data={filteredItems.filter(item => item.category === category)}
                            keyExtractor={(item) => item.id.toString()}
                            numColumns={2}
                            columnWrapperStyle={{ justifyContent: 'space-between' }}
                            renderItem={({ item }) => (
                                <View style={styles.itemCard}>
                                    <TouchableOpacity onPress={() => handleItemPress(item)}>
                                        <Image source={item.image} style={styles.cardImage} />
                                        <View style={styles.cardContent}>
                                            <Text style={styles.cardCategory}>{item.category.toUpperCase()}</Text>
                                            <Text style={styles.cardTitle}>{item.title}</Text>
                                            <View style={styles.cardTime}>
                                                <Ionicons name="time-outline" size={14} color="#888" />
                                                <Text style={styles.cardTimeText}>{item.preparationTime}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )}
                            ListEmptyComponent={<Text style={styles.noResultsText}>No item found</Text>}
                            contentContainerStyle={styles.itemList}
                        />
                    </View>
                ))}

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            {selectedItem && (
                                <>
                                     <Image source={selectedItem.image} style={styles.modalImage} />
                                    <Text style={styles.modalTitle}>{selectedItem.title}</Text>
                                    
                                    <Text style={styles.modalDescription}>{selectedItem.description}</Text>
                                    <Text style={styles.modalSweetness}>Sweetness Level: {selectedItem.sweetnessLevel}</Text>
                                    {selectedItem.price ? (
                                        <Text style={styles.modalPrice}>Price: {selectedItem.price}</Text>
                                    ) : (
                                        <>
                                            <Text style={styles.modalPrice}>Hot Price: {selectedItem.hotPrice}</Text>
                                            <Text style={styles.modalPrice}>Iced Price: {selectedItem.icedPrice}</Text>
                                        </>
                                    )}
                                    <TouchableOpacity
                                        style={styles.closeButton}
                                        onPress={() => setModalVisible(false)}
                                    >
                                        <Text style={styles.closeButtonText}>Close</Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: 50,
        height: 50,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchIcon: {
        marginRight: 10,
    },
    searchBar: {
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 15,
        width: 200,
        color: '#000',
    },
    introSection: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 10,
        textAlign: 'left',
    },
    subHeaderText: {
        fontSize: 14,
        color: '#ffffff',
        marginBottom: 20,
        textAlign: 'left',
    },
    tabContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    tabButton: {
        backgroundColor: 'transparent',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginHorizontal: 5,
    },
    tabButtonText: {
        fontSize: 14,
        color: '#ffffff',
    },
    activeTabButton: {
        backgroundColor: '#e0a15e',
    },
    activeTabText: {
        fontSize: 14,
        color: '#000',
        fontWeight: 'bold',
    },
    mediaContainer: {
        flexDirection: 'row',
    },
    mediaWrapper: {
        flexDirection: 'row',
        borderRadius: 10,
        overflow: 'hidden',
    },
    video: {
        width: 318,
        height: 200,
        borderRadius: 10,
    },
    swipeableImage: {
        width: 318,
        height: 200,
        borderRadius: 10,
        marginLeft: 20,
    },
    itemsText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#fff',
        marginTop: 10,
        
    },
    scrollContainer: {
        paddingHorizontal: 20,
       
    },
    itemList: {
        marginBottom: 100,
    },
    itemCard: {
      width: '45%',
      marginBottom: 20,
      borderRadius: 10,
      overflow: 'hidden',
      backgroundColor: '#fff',
      elevation: 2,
    },
    cardImage: {
      width: '100%',
      height: 100,
    },
    cardContent: {
        padding: 10,
    },
    cardCategory: {
      fontSize: 12,
      color: '#888',
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    cardFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    cardTime: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    cardTimeText: {
        marginLeft: 5,
        fontSize: 12,
        color: '#888',
    },
    noResultsText: {
      textAlign: 'center',
      marginVertical: 20,
      color: '#888',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'rgba(0, 0, 0, 0.5)',
     

    },
    modalContent: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      width: '80%',
      borderStyle: 'solid',
      borderColor: '#000000',
      borderRadius: 10,
      borderWidth: 2,
      
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    modalDescription: {
        fontSize: 14,
        marginBottom: 10,
    },
    modalSweetness: {
      fontSize: 16,
      marginBottom: 5,
    },
    closeButton: {
      backgroundColor: '#e0a15e',
      borderRadius: 5,
      padding: 10,
      marginTop: 10,
      borderStyle: 'solid',
      borderColor: '#000000',
      borderRadius: 10,
      borderWidth: 1,
    },
    closeButtonText: {
      color: '#fff',
      textAlign: 'center',


    },
    modalImage: {
        width: '100%',
        height: 150,
        marginBottom: 10,
        borderRadius: 10,
        resizeMode: 'cover',
    },
    
});

export default Home;