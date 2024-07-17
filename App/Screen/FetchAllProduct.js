import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import axios from 'axios';
import { Icon } from 'react-native-basic-elements';

const FetchAllProduct = () => {

    const [CartList, setCartList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigation = useNavigation()
    console.log('faaaaaaaaaaaaa', CartList.data?.products[0])

    cartDetails = async () => {
        try {
            const response = await axios.get('https://fakestoreapi.com/carts/2');
            console.log('Single-----------', JSON.stringify(response.data))
            return response;

        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    useEffect(() => {
        const cartData = async () => {
            try {
                const result = await cartDetails();
                console.log('details==============', result)
                setCartList(result);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        cartData();
    }, []);

    return (
        <View>
            <View>
                {loading ? (
                    <View >
                        <Text style={{ alignSelf: 'center', fontSize: 30 }}>Loading...</Text>
                    </View>
                ) : error ? (
                    <View >
                        <Text>Something wrong {error.message}</Text>
                    </View>
                ) : (

                    <View>
                        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                            {CartList && CartList.data && CartList.data.products ? (
                                <View style={styles.container}>
                                    {CartList.data.products.map((item, index) => (
                                        <View key={index} >
                                            <Image
                                                source={require('../image/rttr.jpg')}
                                                style={{ height: 150, width: '90%', alignSelf: 'center', marginTop: 10, marginBottom: 20 }}
                                                resizeMode='cover'
                                            />
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{
                                                    fontSize: 18,
                                                    color: '#000',
                                                    marginTop: 5,
                                                    marginHorizontal: 20,
                                                    maxWidth: '90%'
                                                }}>
                                                    Product ID: {item.productId}
                                                </Text>
                                                <TouchableOpacity style={{
                                                    backgroundColor: '#677D6A',
                                                    height: 40,
                                                    width: '30%',
                                                    borderRadius: 8,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    alignSelf: 'center',
                                                }}>

                                                    <View style={{flexDirection: 'row',}}>
                                                        <View style={{ paddingLeft: 20}}>
                                                        <Icon name='plus' type='AntDesign' color={'#fff'} size={18} />
                                                        </View>
                                                    
                                                        <View style={{ paddingLeft: 30}}>
                                                        <Icon name='plus' type='AntDesign' color={'#fff'} size={18} />
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>

                                        </View>
                                    ))}
                                </View>
                            ) : (
                                <Text style={styles.noDataText}>
                                    No data available.
                                </Text>
                            )}
                        </ScrollView>

                        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{
                            backgroundColor: '#677D6A',
                            height: 40,
                            width: '30%',
                            borderRadius: 8,
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignSelf: 'center',
                            marginTop: 20

                        }}>
                            <Text style={{ color: '#fff', fontSize: 20 }}>Back to Home</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    )
}

export default FetchAllProduct

const styles = StyleSheet.create({})