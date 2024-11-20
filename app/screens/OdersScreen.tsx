import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../components/types';

type OrdersScreenRouteProp = RouteProp<RootStackParamList, 'OdersScreen'>;

const OrdersScreen = () => {
    const route = useRoute<OrdersScreenRouteProp>();
    const { orderDetails } = route.params;

    const { products, address, shippingOption, totalAmount } = orderDetails;

    

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Thông tin Đơn Hàng</Text>

            {/* Hiển thị Địa chỉ */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Địa chỉ giao hàng</Text>
                <Text style={styles.text}>{address.name}</Text>
                <Text style={styles.text}>{address.phone}</Text>
                <Text style={styles.text}>{address.address}</Text>
            </View>

            {/* Hiển thị Sản phẩm */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Sản phẩm</Text>
                {products.map((product) => (
                    <View key={product.product_id} style={styles.productContainer}>
                        <Image source={{ uri: product.image }} style={styles.productImage} />
                        <View>
                            <Text style={styles.productName}>{product.product_name}</Text>
                            <Text style={styles.productQuantity}>x{product.quantity_pur}</Text>
                            <Text style={styles.productPrice}>
                                {(product.price * product.quantity_pur).toLocaleString()} VND
                            </Text>
                        </View>
                    </View>
                ))}
            </View>

            {/* Hiển thị Tùy chọn Giao hàng */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Tùy chọn giao hàng</Text>
                <Text style={styles.text}>{shippingOption}</Text>
            </View>

            {/* Hiển thị Tổng tiền */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Tổng tiền</Text>
                <Text style={styles.totalAmount}>{totalAmount.toLocaleString()} VND</Text>
            </View>
            
        </ScrollView>
    );
};

export default OrdersScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    section: {
        marginBottom: 20,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontSize: 14,
        marginBottom: 5,
    },
    productContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    productImage: {
        width: 80,
        height: 80,
        marginRight: 10,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    productQuantity: {
        fontSize: 14,
    },
    productPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    totalAmount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
});
