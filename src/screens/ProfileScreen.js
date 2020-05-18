/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text , SafeAreaView, StyleSheet, Dimensions , Alert, Image, Button, Linking } from 'react-native';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import MainStyleSheet from '../styles/MainStyleSheet';
import StyledHeader from '../components/StyledHeader';
import { PrimaryColor, AppIconSize_Md , SecondaryColor} from '../constants/Values';
import StyledRoundedButton from '../components/StyledRoundedButton';
import { connect } from 'react-redux';
import { markAttendance  } from '../store/actions/lecture.actions';
import { getMacAddress } from 'react-native-device-info';
import { markUserAttendance , checkStudentAvailabe , retryAttendance } from '../services/user.service';
import BackgroundTimer from 'react-native-background-timer';
import PushNotification from 'react-native-push-notification';
class ProfileScreen extends Component{
    state={macAddress : null , retry : true}
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        getMacAddress().then(mac => {
            this.setState({
                macAddress: mac
            });
            console.log(mac);
        }).catch(e => console.log(e));
    }
    presentButtonHandler = () => {
        // console.log({
        //     mac: this.state.macAddress,
        //     batch: this.props.student.batch,
        //     course: this.props.student.course,
        //     id: this.props.student.nsbm_id
        // });
        markUserAttendance(this.state.macAddress, this.props.student.batch, this.props.student.course, this.props.student.nsbm_id, this.props.student.name).then(async response => {
            await this.props.markAttendance(response);
            this.checkStudentAvailable();
        }).catch(err => {
            Alert.alert('Error', err.message);
        });
    }
    checkStudentAvailable = () => {
        console.log({
            mac: this.state.macAddress,
            batch: this.props.student.batch,
            course: this.props.onGoingLecture.module_code,
            id: this.props.student.nsbm_id
        });
        BackgroundTimer.runBackgroundTimer(async () => {
            await getMacAddress().then(mac => {
                this.setState({
                    macAddress: mac
                });
                console.log(mac);
            }).catch(e => console.log(e));
            checkStudentAvailabe(this.state.macAddress, this.props.student.nsbm_id, this.props.onGoingLecture.module_code).then(res => {
                console.log(res);
                BackgroundTimer.stopBackgroundTimer();
            }).catch(async e => {
                console.log(e);
                await this.sendNotification();
                console.log('hello timer');
                BackgroundTimer.stopBackgroundTimer();
            });
        }, 3 * 60 *1000 /*180 * 60 * 1000*/);
    }
    sendNotification = () => {
        return new Promise(async (resolve, reject) => {
            console.log('notification triggers')
            try {
                PushNotification.localNotification({
                message: 'You Attend Correct Lecture Hall',
                title: 'You Attend Correct Lecture Hall',
                vibrate: false
            });
            this.setState({ retry: false });
                resolve('Send');
            } catch (e) {
                reject(e);
            }
        });
    }
    resendAttendance = ()=>{
        retryAttendance(this.state.macAddress, this.props.onGoingLecture.module_code, this.props.student.nsbm_id).then(_ => {
            this.setState({ retry: false });
        }).catch(e => {
            Alert.alert('Warning', e.message);
        });
    }
    render() {
        return (
            <SafeAreaView style={[MainStyleSheet.fullSizeContainer, MainStyleSheet.alignItemsCenter, MainStyleSheet.justifyContentCenter, MainStyleSheet.flexBox1]}>
                <View style={[MainStyleSheet.tenPercent,MainStyleSheet.justifyContentFlexStart]}>
                    <StyledHeader height={'60%'} onPress={() => this.props.navigation.openDrawer()} text={<Text style={[MainStyleSheet.appFontSize, MainStyleSheet.txtBold, profileScreenStyles.fontWhite]}>{this.props.student.name}</Text>} icon={<SimpleLineIcon name={'menu'} color={'white'} size={AppIconSize_Md} />} bgColor={SecondaryColor} />
                    <View style={profileScreenStyles.lateHelperText}>
                        {this.props.onGoingLecture !== (undefined || null)?
                            this.props.onGoingLecture.late === 1 ?
                                <View style={profileScreenStyles.lateHelperTextArea}>
                                    <Text style={[MainStyleSheet.appFontSize,MainStyleSheet.txtBold]}>
                                          You Are Attend Correct Lecture. 
                                    </Text>
                                </View>
                                :
                                <View style={profileScreenStyles.lateHelperTextArea}>
                                    <Text style={[MainStyleSheet.appFontSize,MainStyleSheet.txtBold]}>
                                          You Are Attend Correct Lecture. 
                                    </Text>
                                </View>
                            :
                            <Text>You Are  Not Marked The Lecturer Participation</Text>
                        }
                    </View>
                </View>
                <View style={[MainStyleSheet.nintyPerCent,MainStyleSheet.fullWidth]}>
                    <View style={[profileScreenStyles.markerButtonContainer, MainStyleSheet.alignItemsCenter,MainStyleSheet.flexDirectionRow,MainStyleSheet.bgWhite,MainStyleSheet.shadow]}>
                        <View style={[MainStyleSheet.fiftyPercentWidth,MainStyleSheet.justifyContentCenter,MainStyleSheet.alignItemsCenter]}>
                            <StyledRoundedButton onPress={this.presentButtonHandler} size={Dimensions.get('screen').width / 4} bgColor={PrimaryColor}>
                                <SimpleLineIcon name={'cursor'} size={AppIconSize_Md} color={'white'} />
                                <Text style={[profileScreenStyles.attendanceMarkText,MainStyleSheet.appFontSize,MainStyleSheet.txtBold,profileScreenStyles.fontWhite]}> Lecturer Attend</Text>
                            </StyledRoundedButton>
                        </View>
                       <View style={[MainStyleSheet.fiftyPercentWidth,MainStyleSheet.justifyContentCenter,MainStyleSheet.alignItemsCenter]}>
                            <StyledRoundedButton  onPress={() => {
            //on clicking we are going to open the URL using Linking
            Linking.openURL('http://192.168.1.106/');
          }} size={Dimensions.get('screen').width / 4} bgColor={PrimaryColor}>
                                <SimpleLineIcon name={'camera'} size={AppIconSize_Md} color={'white'} />
                                <Text style={[profileScreenStyles.attendanceMarkText,MainStyleSheet.appFontSize,MainStyleSheet.txtBold,profileScreenStyles.fontWhite]}> CCTV View</Text>
                            </StyledRoundedButton>
                        </View>
              
                    </View>
        <View>
       </View>
                </View>
            </SafeAreaView>
        );
    }
}

const profileScreenStyles = StyleSheet.create({
    markerButtonContainer: {
        height: '40%',
        width: '100%',
    },
    attendanceMarkText: {
        marginTop: 3,
    },
    fontWhite: {
        color: 'white'
    },
    lateHelperText: {
        margin : 5
    },
    
});
const mapStateToProps = (state) => {
    return {
        student: state.userReducer.loggedUser,
        onGoingLecture: state.lectureReducer.onGoingLecture
    }
}
const mapDispatchToProps = dispatch=> {
    return {
        markAttendance: onGoingLecture => dispatch(markAttendance(onGoingLecture)),
    }
}


export default connect(mapStateToProps , mapDispatchToProps) (ProfileScreen);
