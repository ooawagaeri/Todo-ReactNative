import React from 'react';
import styled from 'styled-components';
import {Image, Text, View} from 'react-native';

function Empty(props: {text: string}) {
  let {text} = props;
  return (
    <ComponentContainer>
      <EmptyImage source={require('../assets/images/todo.png')} />
      <EmptyText>Add {text}.</EmptyText>
    </ComponentContainer>
  );
}

const ComponentContainer = styled(View)`
  align-items: center;
  justify-content: center;
  height: 500px;
`;

const EmptyImage = styled(Image)`
  width: 350px;
  height: 200px;
`;

const EmptyText = styled(Text)`
  color: #f8f8f2;
  margin-top: 30px;
  font-size: 30px;
`;

export default Empty;
