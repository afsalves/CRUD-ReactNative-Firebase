import React, { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet } from 'react-native';
import firebase from '../database/firebase';
import { ListItem, Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';

const UsersList = (props) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        firebase.db.collection("users").onSnapshot((querySnapshot) => {
            const users = [];

            querySnapshot.docs.forEach((doc) => {
                const {name, email, phone, favorited} = doc.data()
                users.push({
                    id: doc.id,
                    name,
                    email,
                    phone,
                    favorited
                })
            });

            setUsers(users)
        });
    }, []);
    
    async function handleFavorites(user) {
        const dbRef = firebase.db.collection('users').doc(user.id)

        await dbRef.set({
            ...user,
            favorited: !user.favorited,
        })

        setUsers(users.map((userElement) => {
            if (userElement.id !== user.id) return userElement
            return {
                ...user,
                favorited: !user.favorited,
            }
        }))
    }

 
    return (
      <ScrollView>
          { users.map ((user) => {
                const isFavorited = user.favorited
                  return (
                      <ListItem key={user.id} bottomDivider onPress={() => {
                          props.navigation.navigate('UserDetailScreen', {
                              userId: user.id
                          })
                      }}>
                            <ListItem.Chevron/>
                            <Avatar 
                                source={{
                                 uri:
                                    'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                                }} 
                                rounded
                                />
                            <ListItem.Content>
                                <ListItem.Title>{user.name}</ListItem.Title>
                                <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                                <ListItem.Subtitle>{user.phone}</ListItem.Subtitle>
                            </ListItem.Content>
                            <TouchableOpacity hitSlop={{top: 20, bottom: 20, left: 50, right: 50}} 
                            styles={StyleSheet.favorite} 
                            onPress={() =>  handleFavorites(user)}>
                                <Icon name={isFavorited ? 'favorite' : 'favorite-border'} size={25} color='red'/>
                            </TouchableOpacity>
                      </ListItem>
                  )
              })}
           <Button title="Create User" onPress={() => props.navigation.navigate('CreateUserScreen')} />
      </ScrollView>
    )
}


export default UsersList