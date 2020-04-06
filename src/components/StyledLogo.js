/* eslint-disable prettier/prettier */
import React from 'react'
import styled from 'styled-components/native';
import logo from '../../assets/applog.png';
import { Dimensions } from 'react-native';

const StyledLogoContainer = styled.View`
    background-color: transparent;
    justify-content: center;
    align-items: center;
`
const StyledLogoImage = styled.Image`
    height: ${Dimensions.get('screen').height /5};
    width: ${Dimensions.get('screen').height / 5};
`
const StyledLogoText = styled.Text`
    font-family: Arial;
    font-size: 25px;
    color: ${props => props.color};
    font-weight: bold;
`
const StyledLogo = props => (
    <StyledLogoContainer>
        <StyledLogoImage source={logo} />
        <StyledLogoText color={props.color} numberOfLines={2} ellipsizeMode={'tail'}>SLEC LECTURER</StyledLogoText>
    </StyledLogoContainer>
);
export default StyledLogo;