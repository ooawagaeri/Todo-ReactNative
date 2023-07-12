import React, {useState} from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {postTodoItem} from '../utils/api';

export default function AddItem(props: {
  id: number;
  handleRefresh: () => void;
}) {
  let {id, handleRefresh} = props;
  const [value, setValue] = useState('');

  const onChangeText = (text: React.SetStateAction<string>) => {
    setValue(text);
  };

  const handleAdd = async () => {
    if (value !== '') {
      setValue('');
      const newTodo = {
        todo_list_id: id,
        description: value,
      };
      const resPost = await postTodoItem(newTodo);
      console.log(resPost);
      await handleRefresh();
    }
  };

  return (
    <ComponentContainer>
      <InputContainer>
        <Input placeholder="Add Item..." onChangeText={onChangeText} />
      </InputContainer>
      <SubmitButton onPress={() => handleAdd()}>
        <AntDesign name="plus" size={24} color="#282a36" />
      </SubmitButton>
    </ComponentContainer>
  );
}

const ComponentContainer = styled(View)`
  flex-direction: row;
`;

const InputContainer = styled(View)`
  flex-direction: row;
  border-radius: 10px;
`;

const Input = styled(TextInput)`
  font-size: 20px;
  background-color: #44475a;
  color: #f8f8f2;
  width: 300px;
  margin-right: 20px;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 10px;
`;

const SubmitButton = styled(TouchableOpacity)`
  width: 50px;
  justify-content: center;
  align-items: center;
  background-color: #50fa7b;
  margin-bottom: 20px;
  border-radius: 50px;
`;
