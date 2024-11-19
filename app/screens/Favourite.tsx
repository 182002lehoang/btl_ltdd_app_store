import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Animated } from 'react-native';

const Favourite = () => {
    // Favourite Animation và State
    const favAnimationValue = useRef(new Animated.Value(0)).current;
    const [favCurrentImage, setFavCurrentImage] = useState(require('../assets/images/vn2.jpg'));

    const favImages = [
        require('../assets/images/vn2.jpg'),
        require('../assets/images/51.png'),
    ];

    // Top Sales Animation và State
    const salesAnimationValue = useRef(new Animated.Value(0)).current;
    const [salesCurrentImage, setSalesCurrentImage] = useState(require('../assets/images/sale1.jpg'));

    const salesImages = [
        require('../assets/images/sale1.jpg'),
        require('../assets/images/sale2.jpg'),
    ];

    useEffect(() => {
        // Animation cho Favourite
        const favAnimationLoop = Animated.loop(
            Animated.sequence([
                Animated.timing(favAnimationValue, {
                    toValue: 10,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(favAnimationValue, {
                    toValue: -10,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        );
        favAnimationLoop.start();

        const favInterval = setInterval(() => {
            setFavCurrentImage((prevImage) =>
                prevImage === favImages[0] ? favImages[1] : favImages[0]
            );
        }, 2000);

        // Animation cho Top Sales
        const salesAnimationLoop = Animated.loop(
            Animated.sequence([
                Animated.timing(salesAnimationValue, {
                    toValue: 20,
                    duration: 1500,
                    useNativeDriver: true,
                }),
                Animated.timing(salesAnimationValue, {
                    toValue: -20,
                    duration: 1500,
                    useNativeDriver: true,
                }),
            ])
        );
        salesAnimationLoop.start();

        const salesInterval = setInterval(() => {
            setSalesCurrentImage((prevImage) =>
                prevImage === salesImages[0] ? salesImages[1] : salesImages[0]
            );
        }, 2500);

        return () => {
            favAnimationLoop.stop();
            clearInterval(favInterval);
            salesAnimationLoop.stop();
            clearInterval(salesInterval);
        };
    }, []);

    const favAnimatedStyle = {
        transform: [{ translateX: favAnimationValue }],
    };

    const salesAnimatedStyle = {
        transform: [{ translateY: salesAnimationValue }],
    };

    return (
        <View style={styles.container}>
            {/* Favourite Section */}
            <Text style={styles.title}>Favourite</Text>
            <View style={styles.imageContainer}>
                <Animated.Image
                    style={[styles.imageFull, favAnimatedStyle]}
                    source={favCurrentImage}
                    resizeMode="cover" // Tùy chỉnh ảnh đầy màn hình
                />
            </View>

            {/* Top Sales Section */}
            <Text style={styles.title}>Top Sales</Text>
            <View style={styles.imageContainer}>
                <Animated.Image
                    style={[styles.imageFull, salesAnimatedStyle]}
                    source={salesCurrentImage}
                    resizeMode="cover" // Tùy chỉnh ảnh đầy màn hình
                />
            </View>
        </View>
    );
};

export default Favourite;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    imageContainer: {
        width: '100%', // Chiếm toàn bộ chiều ngang
        marginBottom: 30,
       
    },
    imageFull: {
        width: '100%', // Full chiều ngang
        height: 300, // Chiều cao cố định
        borderRadius: 12, // Bo góc
        overflow: 'hidden',
        backgroundColor: '#e0e0e0',
        resizeMode:'contain'
    },
});
