import styled from 'styled-components/native';
import {FlatList} from 'react-native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
export const NewsContainer = styled.View`
  border-radius: 5px;
  margin-top: 10px;
  flex: 1;
`;

export const NewsList = styled(FlatList)`
  flex: 1;
  padding: 0 0;
  width: 100%;
`;

export const BoxNews = styled.View`
  background: #fff;
  padding: 15px 10px;
  border-radius: 5px;
  margin: 10px 20px;
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  width: 90%;
`;

export const UserImage = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: 64px;
  height: 64px;
  border-radius: 32px;
`;

export const Text = styled.Text`
  color: #000;
  font-size: ${(props) => (props.textDate ? '12px' : '16px')};
  margin: 5px 0;
  font-family: 'RobotoSlab-Regular';
`;

export const ViewUser = styled.View`
  width: 100%;
  align-items: center;
  flex-direction: row;
  margin-bottom: 20px;
`;
export const TextUser = styled.Text`
  color: #000;
  font-size: 18px;
  margin: 0 10px;
  flex: 1;
  font-family: 'RobotoSlab-Regular';
`;
