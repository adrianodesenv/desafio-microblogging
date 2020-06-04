import 'react-native-gesture-handler';
import React from 'react';
import {View, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import './config/ReactotronConfig';

import AppProvider from './hooks';

import Routes from './routes';

import {Provider} from 'react-redux';
import {store} from './store';

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar barStyle="dark-content" backgroundColor="#312e38" />
    <AppProvider>
      <Provider store={store}>
        <View style={{backgroundColor: '#312e38', flex: 1}}>
          <Routes />
        </View>
      </Provider>
    </AppProvider>
  </NavigationContainer>
);

export default App;
