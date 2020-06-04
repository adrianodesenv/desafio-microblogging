import styled from 'styled-components/native';
import {FlatList} from 'react-native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background: #f4f4f4;
`;

export const PostList = styled(FlatList)`
  flex: 1;
  padding: 0 0;
  width: 100%;
`;

export const View = styled.View`
  width: 100%;
  flex-direction: column;
  margin: 10px 0;
  background: #fff;
  padding: 15px;
`;
export const ViewDescrition = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
`;

export const ViewUser = styled.View`
  flex: 1;
  flex-direction: column;
  margin-left: 10px;
`;

export const Text = styled.Text`
  font-size: ${(props) => (props.textDate ? '12px' : '18px')};
  font-family: 'RobotoSlab-Regular';
`;
