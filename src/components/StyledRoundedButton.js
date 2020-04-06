/* eslint-disable prettier/prettier */
import React from 'react';
import styled from 'styled-components/native';
const RoundedButtonContainer = styled.TouchableOpacity`
    height: ${props => props.size};
    width: ${props => props.size};
    background-color: ${props => props.bgColor};
    border-radius : ${props => props.size / 2};
    justify-content: center;
    align-items: center;
`;
const StyledRoundedButton = props => (
    <RoundedButtonContainer disabled={props.disabled} onPress={props.onPress} size={props.size} bgColor={props.bgColor}>
        {props.children}
    </RoundedButtonContainer>
);
export default StyledRoundedButton;
