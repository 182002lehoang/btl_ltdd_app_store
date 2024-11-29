import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OdersScreen = () => {
    interface Order {
        address: {
            address: string;
        };
        shippingOption: string;
        totalAmount: number;
    }

    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const storedOrders = JSON.parse(await AsyncStorage.getItem('orders') || '[]');
                setOrders(storedOrders);
                console.log('Dữ liệu đơn hàng từ AsyncStorage:', storedOrders);
            } catch (error) {
                console.error('Lỗi khi tải dữ liệu đơn hàng:', error);
            }
        };

        loadOrders();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Danh sách đơn hàng</Text>
            <FlatList
                data={orders}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.orderItem}>
                        <Text style={styles.orderTitle}>Địa chỉ: {item.address.address}</Text>
                        <Text style={styles.orderDetail}>Phí giao hàng: {item.shippingOption}</Text>
                        <Text style={styles.orderDetail}>Tổng cộng: {item.totalAmount.toLocaleString()} VND</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    orderItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    orderTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    orderDetail: {
        fontSize: 16,
        color: '#555',
    },
});

export default OdersScreen;