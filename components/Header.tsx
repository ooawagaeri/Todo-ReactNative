import React from 'react';
import styled from 'styled-components';
import {Text, View} from 'react-native';
import Syncer from './Syncer';

function Header(props: {text: string}) {
  let {text} = props;
  return (
    <ComponentContainer>
      <HeaderText>{text}.</HeaderText>
      <Syncer />
    </ComponentContainer>
  );
}

const ComponentContainer = styled(View)`
  height: 100px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
`;

const HeaderText = styled(Text)`
  color: #f8f8f2;
  font-size: 30px;
`;

export default Header;
