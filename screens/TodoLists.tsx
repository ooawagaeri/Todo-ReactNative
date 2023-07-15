import React, {useEffect} from 'react';
import {SafeAreaView, View, FlatList} from 'react-native';
import AddList from '../components/AddList';
import styled from 'styled-components';
import Header from '../components/Header';
import Empty from '../components/Empty';
import TodoListUI from '../components/TodoListUI';
import {displayListsAPI} from '../redux/thunks/listsThunks';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {useIsFocused} from '@react-navigation/native';

function TodoLists() {
  const dispatch = useAppDispatch();
  const lists = useAppSelector(state => state.lists.lists);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      dispatch(displayListsAPI());
    }
  }, [dispatch, isFocused]);

  return (
    <ComponentContainer>
      <View>
        <FlatList
          data={lists}
          ListHeaderComponent={<Header text={'To-Do'} />}
          ListEmptyComponent={<Empty text={'To-Do List'} />}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TodoListUI
              todoList={item}
              handleRefresh={() => dispatch(displayListsAPI())}
            />
          )}
        />
        <View>
          <AddList handleRefresh={() => dispatch(displayListsAPI())} />
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
