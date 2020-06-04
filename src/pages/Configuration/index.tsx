import React from 'react';

import {useAuth} from '../../hooks/auth';

import {Container, TouchableOpacity, Text} from './styles';

const Configuration: React.FC = () => {
  const {signOut} = useAuth();
  return (
    <Container>
      <TouchableOpacity>
        <Text onPress={() => signOut()}>Logout</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default Configuration;
