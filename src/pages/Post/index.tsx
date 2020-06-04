import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {useAuth} from '../../hooks/auth';
import {DeletePost, UpdatePost} from '../../store/modules/posts/actions';

import {
  Container,
  Text,
  ViewDescrition,
  PostList,
  View,
  ViewUser,
} from './styles';

interface IUser {
  id: string;
  name: string;
  email: string;
}

interface IPost {
  id: string;
  text: string;
  created_at: string;
  formattedDate: string;
  user: IUser;
}

const Post: React.FC = ({navigation}) => {
  let listPost = useSelector((state) => state.post.lista);

  const [feeds, setFeeds] = useState([] as IPost[]);

  const {user} = useAuth();

  const dispatch = useDispatch();

  useEffect(() => {
    setFeeds(listPost);
  }, [listPost]);

  const updatePost = (id: string) => {
    const post = feeds.find((post) => post.id === id);
    navigation.navigate('CreatePost', {post});
  };

  const createAlert = (id: string) =>
    Alert.alert(
      'Post',
      '',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancelou'),
          style: 'cancel',
        },

        {
          text: 'Deletar',
          onPress: () => dispatch(DeletePost(id)),
        },
        {
          text: 'Editar',
          onPress: () => updatePost(id),
        },
      ],
      {cancelable: false},
    );

  renderItem = ({item}: {item: IPost}) => (
    <View>
      <ViewDescrition>
        <FontAwesome name="user-circle-o" color={'#6fa287'} size={40} />
        <ViewUser>
          <Text>{item.user.name}</Text>
          <Text textDate>{item.formattedDate}</Text>
        </ViewUser>
        {user.id === item.user.id ? (
          <Feather
            name="more-horizontal"
            color={'#6fa287'}
            size={30}
            onPress={() => createAlert(item.id)}></Feather>
        ) : null}
      </ViewDescrition>
      <Text numberOfLines={4}>{item.text}</Text>
    </View>
  );

  return (
    <Container>
      <PostList
        data={feeds}
        keyExtractor={(feed) => feed.id}
        renderItem={renderItem}
      />
    </Container>
  );
};

export default Post;
