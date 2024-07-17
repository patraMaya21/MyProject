
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Home from './App/Screen/Home';
import { NavigationContainer } from '@react-navigation/native';
import SingleProduct from './App/Screen/SingleProduct';
import FetchAllProduct from './App/Screen/FetchAllProduct';

// export type RootStackParamList = {
//   Home: undefined
// };

export const App = () => {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
        <Stack.Screen name='SingleProduct' component={SingleProduct} options={{ headerShown: false }} />
        <Stack.Screen name='FetchAllProduct' component={FetchAllProduct} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;