import React, { useEffect, useState } from 'react';
import { Button, ScrollView } from 'react-native';
import firebase from '../database/firebase';
import { ListItem, Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { color } from 'react-native-reanimated';
Icon.loadFont();

const UsersList = (props) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        firebase.db.collection("users").onSnapshot((querySnapshot) => {
            const users = [];

            querySnapshot.docs.forEach((doc) => {
                const {name, email, phone} = doc.data()
                users.push({
                    id: doc.id,
                    name,
                    email,
                    phone
                })
            });

            setUsers(users)
        });
    }, []);

    return (
      <ScrollView>
         

          {
              users.map(user => {
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
                            <Icon name={favorite? "favorite-border" : "favorite"}
                                size={20} 
                                color={ favorite? "#999" : "red"}
                                onPress={()=> this.setState({ favorite: !favorite })}/>
                            <Icon name="favorite-border" size={20} color="#999" onPress={() => reverseColor("red")}/>
                      </ListItem>
                  )
              })
          }
           <Button title="Create User" onPress={() => props.navigation.navigate('CreateUserScreen')} />
      </ScrollView>
    )
}



export default UsersList