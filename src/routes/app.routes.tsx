import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Post from '../pages/Post';
import CreatePost from '../pages/CreatePost';
import News from '../pages/News';
import Configuration from '../pages/Configuration';

const Tab = createBottomTabNavigator();
const MainStack = createStackNavigator();
const RootStack = createStackNavigator();
const NewsStack = createStackNavigator();

function NewStackScreen() {
  return (
    <NewsStack.Navigator>
      <NewsStack.Screen
        name="News"
        component={News}
        options={{
          headerTitle: 'Noticías',
        }}
      />
    </NewsStack.Navigator>
  );
}

function MainStackScreen({navigation}) {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Post"
        component={Post}
        options={{
          headerTitle: 'Post',
          headerRight: () => (
            <AntDesign
              onPress={() => navigation.navigate('CreatePost')}
              name="pluscircleo"
              color={'#6fa287'}
              size={24}
            />
          ),
          headerRightContainerStyle: {
            marginRight: 20,
          },
        }}
      />
    </MainStack.Navigator>
  );
}

function RootStackScreen() {
  return (
    <RootStack.Navigator mode="modal">
      <RootStack.Screen
        name="Main"
        component={MainStackScreen}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="CreatePost"
        component={CreatePost}
        options={{
          headerBackTitle: 'Cancelar',

          headerLeftContainerStyle: {
            marginLeft: 20,
          },
          title: 'Cadastrar Post',
          headerBackImage: () => (
            <MaterialCommunityIcons name="close" color={'#000'} size={24} />
          ),
        }}
      />
    </RootStack.Navigator>
  );
}

const AppRoutes: React.FC = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: '#6fa287',
      keyboardHidesTabBar: true,
    }}>
    <Tab.Screen
      name="Post"
      component={RootStackScreen}
      options={{
        tabBarLabel: 'Post',
        tabBarIcon: ({color, size}) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="News"
      component={NewStackScreen}
      options={{
        tabBarLabel: 'Notícias',
        tabBarIcon: ({color, size}) => (
          <MaterialCommunityIcons name="forum" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Configuration"
      component={Configuration}
      options={{
        tabBarLabel: 'Configuração',
        tabBarIcon: ({color, size}) => (
          <MaterialCommunityIcons name="logout" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default AppRoutes;
