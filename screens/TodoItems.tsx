import React, {useEffect, useLayoutEffect, useState} from 'react';
import {FlatList, SafeAreaView, View} from 'react-native';
import {getTodoListById} from '../utils/api';
import {TodoItem} from '../types/types';
import styled from 'styled-components';
import AddItem from '../components/AddItem';
import TodoItemUI from '../components/TodoItemUI';
import Empty from '../components/Empty';
import Header from '../components/Header';
import {useIsFocused} from '@react-navigation/native';

export default function TodoItems(props: {navigation: any; route: any}) {
  let {navigation, route} = props;
  const [todoItemList, setTodoItemList] = useState<TodoItem[]>([]);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      getTodoListById(route.params.id).then(res => {
        if (typeof res === 'string') {
          console.error(res);
        } else {
          setTodoItemList(res.todos);
        }
      });
    }
  }, [isFocused, route.params.id]);

  const updateData = async () => {
    const resGet = await getTodoListById(route.params.id);
    if (typeof resGet === 'string') {
      console.error(resGet);
    } else {
      setTodoItemList(resGet.todos);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'List: ' + route.params.name,
    });
  }, [navigation, route.params.id, route.params.name]);

  return (
    <ComponentContainer>
      <View>
        <FlatList
          data={todoItemList}
          ListHeaderComponent={<Header text={'Tasks'} />}
          ListEmptyComponent={<Empty text={'To-Do Item'} />}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TodoItemUI
              item={item}
              listName={route.params.name}
              handleRefresh={() => updateData()}
            />
          )}
        />
        <View>
          <AddItem id={route.params.id} handleRefresh={updateData} />
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
