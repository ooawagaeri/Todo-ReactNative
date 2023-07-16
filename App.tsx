import React from 'react';
import TodoLists from './screens/TodoLists';
import TodoItems from './screens/TodoItems';
import EditItem from './screens/EditItem';
import EditList from './screens/EditList';
import {StatusBar, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import store from './redux/configureStore';
import LoadingSpinner from './components/LoadingSpinner';
// import Syncer from './components/Syncer';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <View>
          <StatusBar barStyle="light-content" backgroundColor="#282a36" />
        </View>
        {/*<Syncer />*/}
        <LoadingSpinner />
        <Stack.Navigator
          screenOptions={{
            headerShadowVisible: false,
          }}>
          <Stack.Screen
            name="TodoLists"
            component={TodoLists}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="TodoItems"
            component={TodoItems}
            options={screenHeader}
          />
          <Stack.Screen
            name="TodoItemEdit"
            component={EditItem}
            options={screenHeader}
          />
          <Stack.Screen
            name="TodoListEdit"
            component={EditList}
            options={screenHeader}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const screenHeader = {
  headerStyle: {
    backgroundColor: '#282a36',
    shadowOpacity: 0,
  },
  headerTitleStyle: {
    color: '#f8f8f2',
    fontSize: 25,
  },
  headerTintColor: '#ff79c6',
};
