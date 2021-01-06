import React, {useState} from 'react';
import {View, Button, TextInput, ScrollView, StyleSheet} from 'react-native';
import firebase from '../database/firebase';
import Icon from 'react-native-vector-icons/MaterialIcons'

const CreateUserScreen = (props) => {
    
    const [state, setState] = useState ({
        name: '',
        email: '',
        phone: '',
    })

    const handleChangeText = (name, value) =>{
        setState({...state, [name]: value}) 
    }

    const saveNewUser = async () => {
        if (state.name === ''){
            alert('Please provide a name')
        } else {
        try {
            await firebase.db.collection('users').add({
                name: state.name,
                email: state.email,
                phone: state.phone,

            })
            props.navigation.navigate ('UsersList');
        } catch (error){
            console.log(error);
        }
       }
    }

    const handleFavorites = (name) => {
        const contactInFavorites = state.find ((state) => state === name)
        if (contactInFavorites) {
            setState(state.filter((state) => state !== name))
        } else {
            setState([...state, name])
        }
    }

    return (
      <ScrollView style= {styles.container}>
          <View style={styles.inputGroup}>
              <TextInput placeholder="User Name" 
              onChangeText={(value) => handleChangeText('name', value)}
              />
          </View>
          <View style={styles.inputGroup}>
              <TextInput placeholder="User Email"
                onChangeText={(value) => handleChangeText('email', value)}
              />
          </View>
          <View style={styles.inputGroup}>
              <TextInput placeholder="User Phone"
                onChangeText={(value) => handleChangeText('phone', value)}
              />
          </View>
          <View>
            {state.map((state) => {
                const isFavorited = state.find((state) => state === state.name)
                return (
                    <TouchableOpacity onPress={() => handleFavorites(state.name)}>
                        <Text>{state.name}</Text>
                        <Icon name={isFavorited ? 'favorite-border' : 'favorite'} size={30} color="#999" />
                    </TouchableOpacity>
                 )
             })}
          </View>
          <View>
              <Button title="Save User" onPress={() => saveNewUser()}/>
          </View>
      </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35
    },

    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    },
})

export default CreateUserScreen