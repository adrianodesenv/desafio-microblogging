import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import axios from 'axios';

import formatDate from '../../utils/formatDate';

import {
  NewsContainer,
  NewsList,
  BoxNews,
  UserImage,
  Text,
  ViewUser,
  TextUser,
} from './styles';

import logo from '../../assets/logo.jpeg';

interface User {
  name: string;
  profile_picture: string;
}
interface Message {
  content: string;
  created_at: string;
  formattedDate: string;
}

interface INews {
  id: String;
  user: User;
  message: Message;
}
const News: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const [noticias, setNoticias] = useState<INews[]>([]);

  useEffect(() => {
    async function loadNews(): Promise<void> {
      setLoading(true);
      try {
        const response = await axios.get(
          'https://gb-mobile-app-teste.s3.amazonaws.com/data.json',
        );

        const n = response.data.news.map((elem: INews, index: Number) => {
          elem.id = index.toString();

          const date = new Date(elem.message.created_at);
          elem.message.formattedDate = formatDate(Number(date));
          return elem;
        });
        setNoticias(n);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
    loadNews();
  }, []);

  return (
    <NewsContainer>
      {loading ? <ActivityIndicator size="small" /> : null}
      <NewsList
        data={noticias}
        keyExtractor={(item) => item.id}
        ListFooterComponent={<View />}
        ListFooterComponentStyle={{
          height: 80,
        }}
        renderItem={({item}: {item: INews}) => (
          <BoxNews>
            <ViewUser>
              <UserImage source={logo} />
              <TextUser>{item.user.name}</TextUser>
              <Text textDate>{item.message.formattedDate}</Text>
            </ViewUser>
            {/* <ProductImage source={{uri: item.user.profile_picture}} /> */}

            <Text>{item.message.content}</Text>
          </BoxNews>
        )}
      />
    </NewsContainer>
  );
};

export default News;
