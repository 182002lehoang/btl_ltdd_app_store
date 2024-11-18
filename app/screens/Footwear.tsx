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
import Product from '../Data/Product';

const Footwear = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    
    // Lọc sản phẩm chỉ thuộc danh mục "Clothes"
    // const clothesProducts = Product.filter((item) =>
    //     item.category.includes('Clothes')
    // );
    
    const [products, setProducts] = React.useState<{ product_name: string; price: number; image: string; sale: number; quantity: number; sold: number; star: number; category: string[]; type: string[]; product_id: string; }[]>([]);

    React.useEffect(() => {
        setProducts(Product);
    }, []);
    const renderProduct = ({ item }: { item: typeof Product[0] }) => (
        <Pressable style={styles.productItem} onPress={() => navigation.navigate('ProductDetailsScreen', { product: item })}>
            <View>
                <View style={{ alignItems: 'center' }}>
                    <Image source={{ uri: item.image }} style={styles.productImage} />
                </View>
                <Text style={styles.productName}>{item.product_name}</Text>
                <View style={{ flexDirection: "row", alignItems: 'center' }}>
                    <Text style={styles.productPrice}>{item.price.toLocaleString()} VND</Text>
                    <Text style={{ marginLeft: 20, marginTop: 5, color: "red" }}>-{item.sale}%</Text>
                </View>
                <View style={{ flexDirection: "row", marginTop: 10, justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <AntDesign name="star" size={20} color="#FFD700" />
                        <Text style={styles.productStar}>{item.star}</Text>
                    </View>
                    <Text style={{}}>Đã bán: {item.sold}</Text>
                </View>
            </View>
        </Pressable>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Footwear</Text>
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

export default Footwear;

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
    listContainer: {
        paddingBottom: 20,
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
    priceWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
    },
    productPrice: {
        fontSize: 14,
        color: '#006AF5',
    },
    productSale: {
        fontSize: 14,
        color: 'red',
    },
    ratingWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    starWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    productStar: {
        fontSize: 14,
        color: '#FFD700',
        marginLeft: 5,
    },
    soldText: {
        fontSize: 12,
        color: '#666',
    },
    body: {
        paddingBottom: 200,
    },
});