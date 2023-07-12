import React, {useEffect, useLayoutEffect, useState} from 'react';
import {SafeAreaView, View, FlatList} from 'react-native';
import {TodoList} from '../types/types';
import {getTodoLists} from '../utils/api';
import AddList from '../components/AddList';
import styled from 'styled-components';
import Header from '../components/Header';
import Empty from '../components/Empty';
import TodoListUI from '../components/TodoListUI';
import {useIsFocused} from '@react-navigation/native';

function TodoLists() {
  const [data, setData] = useState<TodoList[]>([]);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      updateData();
    }
  }, [isFocused]);

  const updateData = async () => {
    const res = await getTodoLists();
    if (typeof res === 'string') {
      console.error(res);
    } else {
      setData(res);
    }
  };

  return (
    <ComponentContainer>
      <View>
        <FlatList
          data={data}
          ListHeaderComponent={<Header text={'To-Do'} />}
          ListEmptyComponent={<Empty text={'To-Do List'} />}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TodoListUI todoList={item} handleRefresh={() => updateData()} />
          )}
        />
        <View>
          <AddList handleRefresh={updateData} />
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

export default TodoLists;
