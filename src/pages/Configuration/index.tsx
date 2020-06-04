import React from 'react';

import {useAuth} from '../../hooks/auth';

import {Container, TouchableOpacity, Text, TextUser} from './styles';

const Configuration: React.FC = () => {
  const {signOut, user} = useAuth();
  return (
    <Container>
      <TextUser> {user.name}</TextUser>
      <TextUser> {user.email}</TextUser>
      <TouchableOpacity>
        <Text onPress={() => signOut()}>Logout</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default Configuration;
