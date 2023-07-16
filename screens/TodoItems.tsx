import React, {useEffect, useLayoutEffect} from 'react';
import {FlatList, SafeAreaView, View} from 'react-native';
import styled from 'styled-components';
import AddItem from '../components/AddItem';
import TodoItemUI from '../components/TodoItemUI';
import Empty from '../components/Empty';
import Header from '../components/Header';
import {useIsFocused} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {displayListByIdOfflineAPI} from '../redux/network/listsOffline';

export default function TodoItems(props: {navigation: any; route: any}) {
  let {navigation, route} = props;
  let listId: number = route.params.id;
  const dispatch = useAppDispatch();
  const lists = useAppSelector(state => state.lists.lists);
  const items = lists.filter(list => list.id === listId)[0].todos;

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      dispatch(displayListByIdOfflineAPI(listId));
    }
  }, [dispatch, isFocused, listId]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'List: ' + route.params.name,
    });
  }, [navigation, route.params.name]);

  return (
    <ComponentContainer>
      <View>
        <FlatList
          data={items}
          ListHeaderComponent={<Header text={'Tasks'} />}
          ListEmptyComponent={<Empty text={'To-Do Item'} />}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TodoItemUI
              item={item}
              listName={route.params.name}
              listId={listId}
            />
          )}
        />
        <View>
          <AddItem id={listId} />
        </View>
      </View>
    </ComponentContainer>
  );
}

const ComponentContainer = styled(SafeAreaView)`
  background-color: #282a36;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
