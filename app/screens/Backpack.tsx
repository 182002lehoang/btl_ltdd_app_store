import React from 'react';
import {
    SafeAreaView,
    View,
    StyleSheet,
    FlatList,
    Image,
    Text,
    Pressable,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../components/types';
import Product2 from '../Data/Product2';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Backpack = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [products, setProducts] = React.useState<Product2[]>([]);

    // Lưu dữ liệu vào AsyncStorage (chỉ chạy 1 lần nếu chưa có dữ liệu)
    React.useEffect(() => {
        const saveDataToLocal = async () => {
            const existingData = await AsyncStorage.getItem('Product2');
            if (!existingData) {
                await AsyncStorage.setItem('Product2', JSON.stringify(Product2));
            }
        };
        saveDataToLocal();
    }, []);
    // const removeProduct1FromLocal = async () => {
    //     try {
    //         await AsyncStorage.removeItem('Product1');
    //         console.log('Dữ liệu Product1 đã bị xóa khỏi AsyncStorage');
    //     } catch (error) {
    //         console.error('Lỗi khi xóa dữ liệu Product1:', error);
    //     }
    // };

    // Đọc dữ liệu từ AsyncStorage
    React.useEffect(() => {
        const loadDataFromLocal = async () => {
            const storedData = await AsyncStorage.getItem('Product2');
            console.log(Product2);
            console.log('Dữ liệu trong AsyncStorage:', JSON.parse(storedData || '[]'));
            if (storedData) {
                setProducts(JSON.parse(storedData));
            }
        };
        loadDataFromLocal();
    }, []);

    // Render từng sản phẩm
    const renderProduct = ({ item }: { item: Product2 }) => (
        <Pressable
            style={styles.productItem}
            onPress={() => navigation.navigate('ProductDetailsScreen', { product: item })}
        >
            <View>
                <View style={{ alignItems: 'center' }}>
                    <Image source={{ uri: item.image }} style={styles.productImage} />
                </View>
                <Text style={styles.productName}>{item.product_name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.productPrice}>
                        {item.price.toLocaleString()} VND
                    </Text>
                    <Text style={styles.productSale}>-{item.sale}%</Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: 10,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <View style={{ flexDirection: 'row' }}>
                        <AntDesign name="star" size={20} color="#FFD700" />
                        <Text style={styles.productStar}>{item.star}</Text>
                    </View>
                    <Text>Đã bán: {item.sold}</Text>
                </View>
                
            </View>
        </Pressable>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Balo </Text>
            <FlatList
                data={products}
                renderItem={renderProduct}
                keyExtractor={(item) => item.product_id.toString()}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.body}
            />
        </SafeAreaView>
    );
};

export default Backpack;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        color: '#333',
    },
    productItem: {
        flex: 1,
        margin: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        backgroundColor: '#fff',
        padding: 10,
    },
    productImage: {
        width: '100%',
        height: 150,
        resizeMode: 'contain',
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#333',
    },
    productPrice: {
        fontSize: 14,
        color: '#006AF5',
    },
    productSale: {
        marginLeft: 10,
        marginTop: 5,
        fontSize: 14,
        color: 'red',
    },
    productStar: {
        fontSize: 14,
        color: '#FFD700',
        marginLeft: 5,
    },
    body: {
        paddingBottom: 200,
    },
});
