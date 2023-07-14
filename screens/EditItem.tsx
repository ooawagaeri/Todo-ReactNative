import React, {useLayoutEffect, useState} from 'react';
import {SafeAreaView, TextInput, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {putTodoItemById} from '../utils/api';

export default function EditItem(props: {navigation: any; route: any}) {
  let {navigation, route} = props;
  const [desc, setDesc] = useState(route.params.description);

  const handleSubmit = async () => {
    if (desc !== '') {
      const res = await putTodoItemById(route.params.id, {
        description: desc,
        is_done: undefined,
      });
      console.log(res);
      navigation.navigate('TodoItems', {
        id: route.params.list_id,
        name: route.params.list_name,
      }); // Return to list of TodoItems
    }
  };

  const onChangeText = (text: React.SetStateAction<string>) => {
    setDesc(text);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Edit: ' + route.params.description,
    });
  }, [navigation, route.params.description]);

  return (
    <ComponentContainer>
      <InnerContainer>
        <InputContainer>
          <Input
            placeholder="New Description..."
            value={desc}
            onChangeText={onChangeText}
          />
        </InputContainer>
        <SubmitButton onPress={() => handleSubmit()}>
          <AntDesign name="enter" size={24} color="#282a36" />
        </SubmitButton>
      </InnerContainer>
    </ComponentContainer>
  );
}

const ComponentContainer = styled(SafeAreaView)`
  background-color: #282a36;
  flex: 1;
  padding: 10px;
  align-items: center;
`;

const InnerContainer = styled(View)`
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