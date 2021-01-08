import React from 'react';
import { StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator()

import UsersList from './screens/UsersList'
import CreateUserScreen from './screens/CreateUserScreen'
import UserDetailScreen from './screens/UserDetailScreen'
import FavoritesList from './screens/FavoritesList'


function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UsersList" 
        component={UsersList} 
        options={{title: 'Lista de Contatos'}}  />
      <Stack.Screen 
        name="CreateUserScreen" 
        component={CreateUserScreen} 
        options={{title: 'Criar Novo Contato'}} />
      <Stack.Screen 
        name="UserDetailScreen" 
        component={UserDetailScreen} 
        options={{title: 'Detalhe de Contato'}} />
      <Stack.Screen 
        name="FavoritesList" 
        component={FavoritesList} 
        options={{title: 'Contatos Favoritos'}} />
    </Stack.Navigator>
    
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
