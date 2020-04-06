/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { FlatList, SafeAreaView, View , Text, StyleSheet, Dimensions , RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import MainStyleSheet from '../styles/MainStyleSheet';
import { SecondaryColor, PrimaryColor, AppIconSize_Md } from '../constants/Values';
import { loadTodayTimeTable } from '../services/user.service';
import { loadTimeTable , lectureEmptyAction } from '../store/actions/lecture.actions';
import SimpleToast from 'react-native-simple-toast';
import StyledRoundedButton from '../components/StyledRoundedButton';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import StyledHeader from '../components/StyledHeader';
class TimetableScreen extends Component{
    state={refresh: false}
    constructor(props) {
        super(props);
        console.log(this.props.timeTable);
    }
    generateRandomColor = (index) => {
        let colors = [SecondaryColor, PrimaryColor];
        return colors[index % colors.length];
    }
    refresh = () => {
        this.setState({ refresh: true });
        setTimeout(async () => {
            await loadTodayTimeTable().then(async response => {
                await this.props.loadTimeTable(response);
                this.setState({ refresh: false });
            }).catch(async e => {
                await this.props.emptyTimeTable();
                SimpleToast.show(e.message, 5000);
                this.setState({ refresh: false });
            });
        }, 3000);
    }
    iterateSubjects = ({ subject , index }) => {
        return (
            <View style={[MainStyleSheet.samllContainer, MainStyleSheet.fullWidth, MainStyleSheet.alignItemsCenter, timeTableScreenStyles.subjectContainerStyle , MainStyleSheet.flexDirectionRow,{backgroundColor: this.generateRandomColor(index)},MainStyleSheet.shadow]}>
                <View style={[timeTableScreenStyles.subjectDetailsContainer,MainStyleSheet.alignItemsCenter]}>
                    <Text style={[MainStyleSheet.txtBold , timeTableScreenStyles.txtWhite]}>{subject.module_code}</Text>
                </View>
                <View style={timeTableScreenStyles.subjectDetailsContainer}>
                    <Text style={[MainStyleSheet.txtBold , timeTableScreenStyles.txtWhite]}>{subject.start_time}</Text>
                </View>
                <View style={[timeTableScreenStyles.subjectDetailsContainer,MainStyleSheet.alignItemsCenter]}>
                    <Text style={[MainStyleSheet.txtBold , timeTableScreenStyles.txtWhite]}>{subject.module_code}</Text>
                </View>
                <View style={[timeTableScreenStyles.subjectDetailsContainer,MainStyleSheet.alignItemsCenter]}>
                    <Text style={[MainStyleSheet.txtBold , timeTableScreenStyles.txtWhite]}>{subject.module_name}</Text>
                </View>
            </View>
        );
    }
    render() {
        if(this.props.timeTable.length > 0)
            return (
                <SafeAreaView style={[MainStyleSheet.fullSizeContainer, MainStyleSheet.flexBox1]}>
                    <View style={[MainStyleSheet.tenPercent,MainStyleSheet.fullWidth]}>
                        <StyledHeader onPress={()=> this.props.navigation.openDrawer()} text={<Text style={[MainStyleSheet.appFontSize,MainStyleSheet.txtBold,timeTableScreenStyles.txtWhite]}>{this.props.student.name}</Text>} bgColor={SecondaryColor} height={'70%'} icon={<SimpleLineIcon name={'menu'} size={AppIconSize_Md} color={'white'}/>}/>
                    </View>
                    <View style={[MainStyleSheet.nintyPerCent,MainStyleSheet.fullWidth]}>
                        <FlatList data={this.props.timeTable} renderItem={({ item, index }) => <this.iterateSubjects subject={item} index={index} />} keyExtractor={(item) => item.id} extraData={this.props.timeTable} refreshControl={<RefreshControl refreshing={this.state.refresh} onRefresh={this.refresh} />} />
                    </View>
                </SafeAreaView>
            );
        else {
            return (
                <SafeAreaView style={[MainStyleSheet.flexBox1, MainStyleSheet.fullSizeContainer, MainStyleSheet.justifyContentCenter, MainStyleSheet.alignItemsCenter]}>
                    <View style={[MainStyleSheet.tenPercent,MainStyleSheet.fullWidth]}>
                        <StyledHeader onPress={()=> this.props.navigation.openDrawer()} text={<Text style={[MainStyleSheet.appFontSize,MainStyleSheet.txtBold,timeTableScreenStyles.txtWhite]}>{this.props.student.name}</Text>} bgColor={SecondaryColor} height={'70%'} icon={<SimpleLineIcon name={'menu'} size={AppIconSize_Md} color={'white'}/>}/>
                    </View>
                    <View style={[MainStyleSheet.nintyPerCent,MainStyleSheet.fullWidth,MainStyleSheet.justifyContentCenter,MainStyleSheet.alignItemsCenter]}>
                        <StyledRoundedButton onPress={this.refresh} size={Dimensions.get('screen').width / 4} bgColor={'transparent'}>
                            <SimpleLineIcon name={'refresh'} size={AppIconSize_Md} color={'black'}/>
                        </StyledRoundedButton>
                    </View>
                </SafeAreaView>
            );
        }
    }
    
}
const timeTableScreenStyles = StyleSheet.create({
    subjectContainerStyle: {
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 10,
        margin: 3,
        borderLeftWidth: 5,
    },
    subjectDetailsContainer: {
        width: Dimensions.get('screen').width / 4,
    },
    txtWhite: {
        color: 'white',
    }
})
const mapStateToProps = (state) => {
    return {
        timeTable: state.lectureReducer.timeTable,
        student: state.userReducer.loggedUser,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        loadTimeTable: timeTable => dispatch(loadTimeTable(timeTable)),
        emptyTimeTable: ()=> dispatch(lectureEmptyAction()),
    };
};

export default connect(mapStateToProps , mapDispatchToProps)(TimetableScreen);
