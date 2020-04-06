/* eslint-disable no-spaced-func */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text , SafeAreaView , StyleSheet , Keyboard , Animated, Dimensions,TouchableWithoutFeedback , ActivityIndicator } from 'react-native';
import Imei from 'react-native-imei';
import PrimaryButton from '../components/PrimaryButton';
import StyledTextInput from '../components/StyledTextInput';
import mainStyles, { dynamicHeight } from '../styles/MainStyleSheet';
import StyledLogo from '../components/StyledLogo';
import Toast from 'react-native-simple-toast';
import { connect } from 'react-redux';
import { loginAction } from '../store/actions/user.action';
import { loadTimeTable } from '../store/actions/lecture.actions';
import { login , loadTodayTimeTable } from '../services/user.service';
class LoginScreen extends Component {
  state = {
    imei: '',
    keyBoardShow: false,
    fadeInAnim: new Animated.Value(0),
    Password: '',
    email:'',
  }
  constructor(props) {
    super(props);
    this._keyboardShowEventListner = Keyboard.addListener('keyboardDidShow', this._keyboardShowEventListner);
    this._keyboardHideEventListner = Keyboard.addListener('keyboardDidHide', this._keyboardHideEventListner);
    this.test = new Animated.ValueXY({ x: -1, y: 450 });
    this.emailTextInputHandler = this.emailTextInputHandler.bind(this);
    this.passwordTextInputHandler = this.passwordTextInputHandler.bind(this);
    //console.log(this.props);
  }
  _keyboardShowEventListner = () => { this.setState({ keyBoardShow: true }); this.animateStart();}
  _keyboardHideEventListner = () => { this.setState({ keyBoardShow: false }); this.test = new Animated.ValueXY({ x: -1, y: 450 });}
  getImeiNumber = () => {
    Imei.getImei().then(imei => {
      this.setState({ imei: imei[0] });
    }).catch(err => {
      console.log(err);
    });
  }
  componentDidMount() {
    this.getImeiNumber();
  }
  animateStart = () => {
    Animated.spring(this.test, { toValue: { x: Dimensions.get('screen').width / 50, y: Dimensions.get('screen').height / 60 }, speed: 1, bounciness: 8 }).start();
  }
  componentWillUnmount() {
    this._keyboardHideEventListner.remove();
    this._keyboardShowEventListner.remove();
  }
  emailTextInputHandler(input) {
    this.setState({ email: input });
  }
  passwordTextInputHandler(input) {
    this.setState({ Password: input });
  }
  loginButtonHandler = () => {
    if (this.state.email.length < 2 || this.state.Password < 2 || this.state.imei.length < 1) {
      Toast.show('Something Went Wrong', 5000);
    } else {
      login(this.state.email, this.state.imei, this.state.Password).then(async response => {
        await this.props.login(response);
        await loadTodayTimeTable().then(async timeTable => this.props.loadTimeTable(timeTable)).catch(e => console.log(e));
        this.props.navigation.replace('Profile');
      }).catch(err => {
        console.log(err);
        Toast.show(err.message, 7000);
      });
    }
  }
  render() {
      return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={[mainStyles.fullSizeContainer, mainStyles.flexBox1, mainStyles.bgPrimary]}>
            {!this.state.keyBoardShow &&
              <View style={[mainStyles.height25, mainStyles.alignItemsCenter, mainStyles.justifyContentCenter]}>
                <StyledLogo color={'white'}/>
              </View>
            }
            <View style={[dynamicHeight(mainStyles.height25.height), !this.state.keyBoardShow ? loginScreenStyles.loginArea : { backgroundColor: 'white' }, mainStyles.alignItemsCenter]}>
              <View style={[mainStyles.heightThirtyPercent , mainStyles.justifyContentFlexStart]}>
                {this.state.keyBoardShow &&
                   <Animated.View style={this.test.getLayout()}>
                    <StyledLogo color={'black'} />
                  </Animated.View>
                }
              </View>
              <Text style={[mainStyles.textPrimary, loginScreenStyles.titleText]}>Login</Text>
              <StyledTextInput
                transparent
                isEmail={true}
                isRounded
                placeholder={'Type Email Address'}
                keyboardType={'email-address'}
                onChangeText={this.emailTextInputHandler}
              />
              <StyledTextInput
                transparent
                isPassword={true}
                isRounded
                placeholder={'Type Your Password'}
                onChangeText={this.passwordTextInputHandler}
              />
              <View style={[mainStyles.justifyContentFlexStart , mainStyles.heightThirtyPercent]}>
                <PrimaryButton onPress={this.loginButtonHandler} text={'Login'} marginTop={Dimensions.get('screen').height / 40} />
              </View>
            </View>
            </SafeAreaView>
          </TouchableWithoutFeedback>
      );
    }
}
const loginScreenStyles = StyleSheet.create({
  loginArea: {
    backgroundColor: 'white',
    borderTopStartRadius: Dimensions.get('screen').width / 1.2,
  },
  titleText: {
    textAlign: 'center',
    fontSize: Dimensions.get('screen').height / 20,
    marginTop: Dimensions.get('screen').width / 15,
  },
});
const mapStateToProps = (state) => {
  return {
    studentDetails: state.userReducer.loggedUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: studentDetails => {
      dispatch(loginAction(studentDetails));
    },
    loadTimeTable: timeTable => dispatch(loadTimeTable(timeTable)),
  };
};

export default connect(mapStateToProps,mapDispatchToProps) (LoginScreen);
