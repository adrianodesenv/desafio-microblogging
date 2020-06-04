import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

interface AuthState {
  token: string;
  user: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({children}) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [[, token], [, user]] = await AsyncStorage.multiGet([
        '@microblogging:token',
        '@microblogging:user',
      ]);

      if (token && user) {
        setData({token, user: JSON.parse(user)});
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(async ({email, password}) => {
    const token = 'boticarioAABBCDDFDFDF';
    const user = {
      id: new Date().getTime().toString(),
      name: email.split('@')[0].replace('.', ' ').replace('_', ' '),
      email,
    };

    await AsyncStorage.multiSet([
      ['@microblogging:token', token],
      ['@microblogging:user', JSON.stringify(user)],
    ]);

    setData({token, user});
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove([
      '@microblogging:token',
      '@microblogging:user',
    ]);

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{user: data.user, loading, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be use within an AuthProvider');
  }

  return context;
}

export {AuthProvider, useAuth};
