/* eslint-disable prettier/prettier */
import { StyleSheet, Dimensions } from 'react-native';
import { PrimaryColor, AppFontSize } from '../constants/Values';

const styles = StyleSheet.create({
    fullSizeContainer: {
        height: Dimensions.get('screen').height,
        width: Dimensions.get('screen').width,
    },
    bgPrimary: {
        backgroundColor: PrimaryColor
    },
    height50: {
        minHeight: Dimensions.get('screen').height / 2
    },
    flexBox1: {
        flex: 1
    },
    alignItemsCenter: {
        alignItems:'center'
    },
    justifyContentCenter: {
        justifyContent:'center'
    },
    height25: {
        height:Dimensions.get('screen').height /4
    },
    logoImage: {
        height: Dimensions.get('screen').height / 10,
        width: Dimensions.get('screen').height /10
    },
    textPrimary: {
        color: PrimaryColor
    },
    bgWhite: {
        backgroundColor:'white'
    },
    nintyPerCent: {
        height:'90%'
    },
    tenPercent: {
        height:'10%'
    },
    justifyContentFlexStart: {
        justifyContent:'flex-start'
    },
    fullWidth: {
        width : Dimensions.get('screen').width
    },
    txtBold: {
        fontWeight:'bold',
    },
    appFontSize: {
        fontSize: AppFontSize
    },
    heightThirtyPercent: {
        height:'30%'
    },
    samllContainer: {
        height: Dimensions.get('screen').height / 8
    },
    flexDirectionRow: {
        flexDirection:'row'
    },
    jsutifyContentFlexEnd: {
        justifyContent:'flex-end'
    },
    shadow: {
        elevation: 10,
        shadowOpacity: 2,
        shadowOffset: { height: 0, width: 0 },
        shadowRadius: 2,
    },
    fiftyPercentWidth: {
        width:'50%'
    }
});

export const dynamicHeight = (style) =>{
    return {
        height: Dimensions.get('screen').height - style
    }
}
export default styles;