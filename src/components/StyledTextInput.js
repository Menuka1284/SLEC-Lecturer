/* eslint-disable prettier/prettier */
import React from 'react'
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { AppFontSize } from '../constants/Values';
const StyledTextArea = styled.TextInput`
    border-radius: ${props => props.isRounded ? '50px' : '0px'};
    width: ${Dimensions.get('screen').width - 100};
    height: ${props => props.height !== undefined ? props.height : Dimensions.get('screen').height / 20};
    background-color: ${props => props.transparent ? 'transparent' : '#C8C8C8'};
    text-align: center;
    font-size: ${AppFontSize};
    margin-top: 8;
    font-weight:600;
    border-width: ${props => props.transparent ? 1 : 0};
    border-color: blue;
`
const StyledTextInput = props => (
    <StyledTextArea
        onTouchStart={props.onTouchStart}
        isRounded={props.isRounded}
        secureTextEntry={props.isPassword}
        keyboardType={props.KeyboardType === undefined? 'default' : props.keyboardType}
        autoCapitalize={props.isPassword || props.email ? 'none' : 'sentences'}
        placeholder={props.placeholder}
        transparent={props.transparent}
        onChangeText={props.onChangeText} 
    />
);
export default StyledTextInput;