/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React from 'react';
import { SafeAreaView , ActivityIndicator } from 'react-native';
import { PrimaryColor } from '../constants/Values';
import MainStyleSheet from '../styles/MainStyleSheet';
const LogoutScreesn = props => {
    setTimeout(() => props.navigation.replace('Welcome'), 2500);
    return (
        <SafeAreaView style={[MainStyleSheet.justifyContentCenter,MainStyleSheet.alignItemsCenter,MainStyleSheet.fullSizeContainer]}>
            <ActivityIndicator color={PrimaryColor} size={'large'}/>
        </SafeAreaView>
    );
}
export default LogoutScreesn;
