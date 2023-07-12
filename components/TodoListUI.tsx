import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {deleteTodoListById} from '../utils/api';
import {TodoList} from '../types/types';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export default function TodoListUI(props: {
  todoList: TodoList;
  handleRefresh: () => void;
}) {
  let {todoList, handleRefresh} = props;
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleDelete = async () => {
    const res = await deleteTodoListById(todoList.id);
    console.log(res);
    await handleRefresh();
  };

  const navigateToItems = () =>
    navigation.navigate('TodoItems', {
      id: todoList.id,
      name: todoList.name,
    });

  const navigateToListEdit = () =>
    navigation.navigate('TodoListEdit', {
      id: todoList.id,
      name: todoList.name,
    });

  return (
    <ComponentContainer>
      <ListContainer onPress={navigateToItems}>
        <CircleContainer>
          <AntDesign name="bars" size={20} color="#ff79c6" />
        </CircleContainer>
        <View>
          <TextItem>{todoList.name}</TextItem>
        </View>
        <IconContainer onPress={navigateToListEdit}>
          <AntDesign name="edit" size={24} color="#282a36" />
        </IconContainer>
        <IconContainer onPress={() => handleDelete()}>
          <AntDesign name="delete" size={24} color="#ff5555" />
        </IconContainer>
      </ListContainer>
    </ComponentContainer>
  );
}

const ComponentContainer = styled(View)`
  flex-direction: row;
  justify-content: center;
  height: auto;
  width: auto;
`;

const ListContainer = styled(TouchableOpacity)`
  background-color: #44475a;
  height: auto;
  width: 350px;
  margin-bottom: 30px;
  border-radius: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

const TextItem = styled(Text)`
  color: #f8f8f2;
  width: 260px;
  height: auto;
  font-size: 20px;
  margin-top: 10px;
  margin-right: 20px;
`;

const IconContainer = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  margin-top: 5px;
  height: 40px;
  left: -38px;
  border-radius: 10px;
`;

const CircleContainer = styled(View)`
  align-items: center;
  justify-content: center;
  padding-left: 10px;
  padding-right: 10px;
`;
