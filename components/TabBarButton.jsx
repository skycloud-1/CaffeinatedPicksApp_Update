import { View, Pressable, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';

const TabBarButton = ({ navigation }) => {
    const [showButtons, setShowButtons] = useState(false);

    const toggleButtons = () => {
        setShowButtons(!showButtons);
    };

    const buttonStyle = useAnimatedStyle(() => {
        return {
            opacity: withSpring(showButtons ? 1 : 0),
            transform: [{ translateX: withSpring(showButtons ? 0 : -40) }],
        };
    });

    const handleNavigation = (screenName) => {
        navigation.navigate(screenName);
        setShowButtons(false); 
    };

    return (
        <View style={styles.container}>
            {showButtons && (
                <View style={styles.additionalButtons}>
                    <Animated.View style={[styles.extraButton, buttonStyle]}>
                        <Pressable onPress={() => handleNavigation('index')}>
                            <Feather name="home" size={24} color="white" />
                        </Pressable>
                    </Animated.View>
                    <Animated.View style={[styles.extraButton, buttonStyle]}>
                        <Pressable onPress={() => handleNavigation('explore')}>
                            <Feather name="map-pin" size={24} color="white" />
                        </Pressable>
                    </Animated.View>
                    <Animated.View style={[styles.extraButton, buttonStyle]}>
                        <Pressable onPress={() => handleNavigation('create')}>
                            <Feather name="message-circle" size={24} color="white" />
                        </Pressable>
                    </Animated.View>
                </View>
            )}

            <Pressable onPress={toggleButtons} style={styles.floatingButton}>
                <Feather name="plus" size={24} color="white" />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    floatingButton: {
        backgroundColor: '#e0a15e',
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        marginLeft: 580,
        marginBottom: -35,
    },
    additionalButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        right: 80, 
    },
    extraButton: {
        backgroundColor: '#737373',
        marginHorizontal: 10,
        borderRadius: 30,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:48,
    },
});

export default TabBarButton;
