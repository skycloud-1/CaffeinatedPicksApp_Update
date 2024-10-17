import { View, StyleSheet } from 'react-native';
import React from 'react';
import TabBarButton from './TabBarButton';

const TabBar = ({ navigation }) => {
    const khakiColor = '#242220';

    return (
        <View style={[styles.tabbar, { backgroundColor: khakiColor }]}>
            <TabBarButton navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    tabbar: {
        position: 'absolute',
        bottom: 25,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 2,
        borderRadius: 25,
    },
});

export default TabBar;
