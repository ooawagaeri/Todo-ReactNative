import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import styled from 'styled-components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TodoItem} from '../types/types';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAppDispatch} from '../redux/hooks';
import {editItemAPI, removeItemAPI} from '../redux/thunks/itemsThunks';

export default function TodoItemUI(props: {
  item: TodoItem;
  listName: string;
  listId: number;
}) {
  let {item, listName, listId} = props;
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleDelete = async () => {
    dispatch(removeItemAPI(listId, item.id));
  };

  const handleCheck = async (check: boolean) => {
    dispatch(
      editItemAPI(listId, item.id, {
        description: undefined,
        is_done: check,
      }),
    );
  };

  const navigateToItemEdit = () =>
    navigation.navigate('TodoItemEdit', {
      id: item.id,
      description: item.description,
      listId: item.todo_list_id,
      listName: listName,
    });

  return (
    <ComponentContainer>
      <ListContainer>
        <CheckboxContainer>
          <BouncyCheckbox
            text={item.description}
            isChecked={item.is_done}
            onPress={(isChecked: boolean) => {
              handleCheck(isChecked);
            }}
            fillColor={'#ff79c6'}
            textStyle={{
              color: '#f8f8f2',
              fontSize: 20,
            }}
          />
        </CheckboxContainer>
        <IconContainer onPress={navigateToItemEdit}>
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

const CheckboxContainer = styled(View)`
  color: #f8f8f2;
  width: 260px;
  height: auto;
  font-size: 20px;
  margin-top: 11px;
  margin-right: 20px;
  padding-left: 10px;
`;

const IconContainer = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  margin-top: 5px;
  height: 40px;
  border-radius: 10px;
`;
