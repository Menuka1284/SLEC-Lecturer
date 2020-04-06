/* eslint-disable prettier/prettier */

import React from 'react';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { AppFontSize , PrimaryColor } from '../constants/Values';
const StyledTouchableOpacity = styled.TouchableOpacity`
    height: ${props => props.height !== undefined ? props.height : Dimensions.get('screen').height / 20} ;
    background-color: ${PrimaryColor};
    width:${Dimensions.get('screen').width - 100};
    justify-content: center;
    align-items: center;
    border-radius: 50;
    margin-top:${props=> props.marginTop};
`
const ButtonText = styled.Text`
    color: white;
    font-size: ${AppFontSize};
    font-weight: bold;
`

const PrimaryButton = props => (
    <StyledTouchableOpacity onPress={props.onPress} height={props.height} marginTop={props.marginTop}>
        <ButtonText>{props.text}</ButtonText>
    </StyledTouchableOpacity>
);
export default PrimaryButton;
