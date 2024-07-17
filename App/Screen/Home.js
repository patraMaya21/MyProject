import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Icon } from 'react-native-basic-elements'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'


const Home = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigation = useNavigation();

    fetchAllProduct = async () => {
        try {
            const response = await axios.get('https://fakestoreapi.com/products');
            // console.log('data-----------', JSON.stringify(response))
            return response.data;

        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await fetchAllProduct();
                setData(result);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, []);


    return (
        <View style={{
            flex: 1
        }}>
            <StatusBar
                barStyle="light-content"
            />

            {/* <TouchableOpacity onPress={() => navigation.navigate('FetchAllProduct', {cartId: data.id})} style={{
                backgroundColor: '#73BBA3',
                height: 40,
                width: '30%',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
                alignSelf: 'center',
                borderRadius: 10
            }}>
                <Text style={{fontSize: 18, color: '#000'}}>See all cart</Text>
            </TouchableOpacity> */}

            {loading ? (
                <View>
                    <Text style={{alignSelf: 'center', fontSize: 30}}>Loading...</Text>
                </View>
            ) : error ? (
                <View>
                    <Text>Something wrong {error.message}</Text>
                </View>
            ) : (
                <ScrollView showsVerticalScrollIndicator={false}>

                    {
                        data.map((item, index) => {
                            return (
                                <View key={index} style={{
                                    backgroundColor: '#EEEDEB',
                                    marginHorizontal: 15,
                                    height: 170,
                                    marginTop: 20,
                                    borderRadius: 10,
                                    justifyContent: 'center'
                                }}>
                                    <TouchableOpacity onPress={() => navigation.navigate('SingleProduct', { productData: item })} style={{
                                        paddingHorizontal: 10,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                        <Image
                                            source={require('../image/rttr.jpg')}
                                            style={{
                                                height: 90,
                                                width: 80,
                                                resizeMode: 'contain',
                                            }}
                                        />
                                        <View>

                                            <Text numberOfLines={2} style={{
                                                fontSize: 22,
                                                color: '#000',
                                                maxWidth: '90%',
                                                marginTop: 5

                                            }}>
                                                {item?.title}
                                            </Text>
                                            <Text style={{
                                                fontSize: 20,
                                                color: '#000',
                                                marginTop: 5
                                            }}>
                                                Price: {item?.price}
                                            </Text>
                                            <Text numberOfLines={2} style={{
                                                fontSize: 18,
                                                color: '#000',
                                                maxWidth: '90%',
                                                marginTop: 3
                                            }}>
                                                Details: {item?.description}
                                            </Text>
                                            <Text numberOfLines={2} style={{
                                                fontSize: 18,
                                                color: '#000',
                                                maxWidth: '90%',
                                                marginTop: 3
                                            }}>
                                                Category: {item.category}
                                            </Text>
                                            
                                        </View>


                                    </TouchableOpacity>

                                </View>
                            )
                        })
                    }

                </ScrollView>
            )}
        </View>
    )
}

export default Home

const styles = StyleSheet.create({})