/* eslint-disable prettier/prettier */
import React from 'react'
import styled from 'styled-components/native';
const StyledHeaderContainer = styled.SafeAreaView`
    background-color:${props => props.bgColor};
    height: ${props=> props.height};
    width: 100%;
    justify-content:center;
    align-items: center;
    flex-direction: row;
`
const HeaderIcon = styled.View`
    width: 10%;
    height:100%;
    background-color:transparent;
    align-items: center;
    justify-content:center;
`

const HeaderText = styled.View`
    width: 90%;
    height:100%;
    background-color: transparent;
    align-items: center;
    justify-content: center;
`

const StyledHeader = ({ icon, text , bgColor , height , onPress}) => (
    <StyledHeaderContainer height={height} bgColor={bgColor}>
        <HeaderIcon onTouchStart={onPress}>
            {icon}
        </HeaderIcon>
        <HeaderText>
            {text}
        </HeaderText>
    </StyledHeaderContainer>
);
export default StyledHeader;