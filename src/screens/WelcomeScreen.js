/* eslint-disable prettier/prettier */
import React from 'react'
import { SafeAreaView , Animated, Dimensions , View ,PermissionsAndroid} from 'react-native';
import MainStyleSheet,{dynamicHeight} from '../styles/MainStyleSheet';
import StyledLogo from '../components/StyledLogo';
import PrimaryButton from '../components/PrimaryButton';
import { PrimaryColor } from '../constants/Values';
import SecondaryButton from '../components/SecondaryButton';
let fadeInAnimate = new Animated.Value(0);
let movingAnimation = new Animated.ValueXY({ x: Dimensions.get('screen').width / 2, y: Dimensions.get('screen').height / 2 });
const requestPermissions = async () => {
    return await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE, {
        title: 'We want your device imei number',
        buttonPositive: 'Ok',
        message: 'SLEC wants to know your IMEI number please give Permissions You can not use this App without IMEI number'
    });
}
const checkDevicePermissions = async () => {
    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE).then(async _ => {
        try{
            const granted = await requestPermissions();
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                requestPermissions();
            }
        } catch (e) {
            console.log('user denys');
        }
    }).catch(e => {
        console.log(e);
    });
}
const WelcomeScreen = props => {
    Animated.timing(fadeInAnimate, { toValue: 1, duration: 6000 }).start();
    Animated.spring(movingAnimation, { toValue: { x: Dimensions.get('screen').width / 250, y: Dimensions.get('screen').height / 100 } }).start();
    checkDevicePermissions();
    return (
        <SafeAreaView style={[MainStyleSheet.flexBox1, MainStyleSheet.fullSizeContainer, MainStyleSheet.bgWhite]}>
            <Animated.View style={[dynamicHeight(MainStyleSheet.height25.height),MainStyleSheet.justifyContentCenter, MainStyleSheet.alignItemsCenter, { opacity: fadeInAnimate }]}>
                <StyledLogo color={PrimaryColor}/>
            </Animated.View>
            <View style={[MainStyleSheet.alignItemsCenter,MainStyleSheet.justifyContentCenter]}>
                <PrimaryButton onPress={()=> props.navigation.replace('Login')} marginTop={Dimensions.get('screen').height / 50} text={'Login'} />
                <SecondaryButton onPress={()=> props.navigation.navigate('Signup')} marginTop={Dimensions.get('screen').height / 90} text={'Signup'}/>
            </View>
        </SafeAreaView>
    );
}
export default WelcomeScreen;