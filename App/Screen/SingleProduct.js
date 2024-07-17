import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { Icon } from 'react-native-basic-elements';

const SingleProduct = () => {

    const [SingleData, setSingleData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const route = useRoute();
    const navigation = useNavigation();
    const [showPlusMinus, setShowPlusMinus] = useState(false);

    const productId = route.params?.productData?.id;

    fetchSingleData = async () => {
        try {
            const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
            // console.log('Single-----------', JSON.stringify(response))
            return response.data;

        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    useEffect(() => {
        const getSingleData = async () => {
            try {
                const result = await fetchSingleData();
                setSingleData(result);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        getSingleData();
    }, []);

    const createCart = async () => {
        try {
            const response = await axios.post('https://fakestoreapi.com/carts',
                {
                    userId: 2,
                    date: new Date().toISOString().split('T')[0],
                    products: [
                        {
                            productId: SingleData.id,
                            title: SingleData.title,
                            image: SingleData.image,
                            price: SingleData.price
                        }
                    ]
                },
            );

            // console.log("Cart created:===============", response.data);
        } catch (error) {
            console.error('There was a problem with the axios operation:', error);
        }
    };

    createCart();

    return (
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
                    <Image
                        source={require('../image/rttr.jpg')}
                        style={{ height: 200, width: '90%', marginTop: 20, alignSelf: 'center' }}
                        resizeMode='cover'
                    />
                    <Text numberOfLines={2} style={{
                        fontSize: 18,
                        color: '#000',
                        marginTop: 20,
                        marginHorizontal: 20,
                        maxWidth: '90%'

                    }}>
                        Product ID: {SingleData?.id}
                    </Text>
                    <Text numberOfLines={2} style={{
                        fontSize: 18,
                        color: '#000',
                        marginTop: 20,
                        marginHorizontal: 20,
                        maxWidth: '90%'

                    }}>
                        Product name: {SingleData?.title}
                    </Text>
                    <Text numberOfLines={2} style={{
                        fontSize: 18,
                        color: '#000',
                        marginTop: 10,
                        marginHorizontal: 20,
                        maxWidth: '90%'

                    }}>
                        Price:  {SingleData?.price}
                    </Text>
                    <Text numberOfLines={2} style={{
                        fontSize: 18,
                        color: '#000',
                        marginTop: 10,
                        marginHorizontal: 20,
                        maxWidth: '90%'

                    }}>
                        Details: {SingleData?.description}
                    </Text>


                    <TouchableOpacity onPress={createCart} style={{ ...styles.buttonStyle, backgroundColor: '#677D6A' }}>
                        <Icon name={showPlusMinus ? 'plus' : 'shoppingcart'} type='AntDesign' color={'#fff'} size={18} />
                        {showPlusMinus && <Icon name='minus' type='AntDesign' color={'#fff'} size={18} />}
                    </TouchableOpacity>
                    {showPlusMinus && (
                        <TouchableOpacity onPress={() => { }} style={{ ...styles.buttonStyle, backgroundColor: '#677D6A', marginTop: 20 }}>
                            <Text style={{ color: '#fff', fontSize: 18 }}>Next</Text>
                        </TouchableOpacity>
                    )}


                    <TouchableOpacity onPress={() => navigation.navigate('FetchAllProduct', { AllProduct: SingleData, })} style={{
                        backgroundColor: '#677D6A',
                        height: 40,
                        width: '30%',
                        borderRadius: 8,
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        marginTop: 20

                    }}>
                        <Text style={{ color: '#fff', fontSize: 20 }}> View cart list</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}

export default SingleProduct

const styles = StyleSheet.create({
    buttonStyle: {
        height: 40,
        width: '30%',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 20
    }
})