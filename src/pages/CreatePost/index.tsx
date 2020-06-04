import React, {useEffect, useState, useCallback, useRef} from 'react';
import {Alert} from 'react-native';
import {useDispatch} from 'react-redux';

import {AddPost, UpdatePost} from '../../store/modules/posts/actions';
import {useAuth} from '../../hooks/auth';
import formatDate from '../../utils/formatDate';

import {Container, TouchableOpacity, TextInput, Text} from './styles';

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
let jsonPost: IPost = {} as IPost;
const CreatePost: React.FC = ({navigation, route}) => {
  const [text, setText] = useState('');
  const {user} = useAuth();
  const dispatch = useDispatch();
  let nameButton = route.params ? 'Atualizar' : 'Postar';

  useEffect(() => {
    if (route.params) {
      const {post} = route.params;
      setText(post.text);
      jsonPost = post;
    }
  }, []);

  const handleCreatePost = async () => {
    if (!text) return;
    if (route.params) {
      const post = {
        id: jsonPost.id,
        text: text,
        created_at: jsonPost.created_at,
        formattedDate: jsonPost.formattedDate,
        user: jsonPost.user,
      };

      dispatch(UpdatePost(post));
      navigation.goBack();
      return;
    }

    try {
      const usuario = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      const idGerado = new Date().getTime().toString();

      const date = new Date().toJSON();

      const date1 = new Date(date);

      const post = {
        id: idGerado,
        text,
        created_at: date,
        formattedDate: formatDate(Number(date1)),
        user: usuario,
      };
      dispatch(AddPost(post));

      navigation.goBack();
    } catch (err) {
      Alert.alert(
        'Erro no cadastro Post',
        'Ocorreu um erro ao fazer o cadastro. Tente novamente',
      );
    }
  };

  return (
    <Container>
      <TextInput
        placeholder="O que está pensando?"
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="send"
        onSubmitEditing={() => handleCreatePost()}
        value={text}
        onChangeText={setText}
        multiline={true}
        maxLength={288}
        autoFocus={true}
      />
      <TouchableOpacity onPress={() => handleCreatePost()}>
        <Text>{nameButton}</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default CreatePost;
