/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { createStore,combineReducers, applyMiddleware } from 'redux';
import {createAppContainer } from 'react-navigation';
import LoginScreen from './src/screens/LoginScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator , DrawerItems} from 'react-navigation-drawer';
import { userReducer } from './src/store/reducers/user.reducer';
import { Provider } from 'react-redux';
import SignupScreen from './src/screens/SignupScreen';
import thunk from 'redux-thunk';
import ProfileScreen from './src/screens/ProfileScreen';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import { PrimaryColor, AppFontSize, SecondaryColor } from './src/constants/Values';
import { Dimensions } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { lectureReducer } from './src/store/reducers/lecture.reducer';
import { SafeAreaView, ScrollView, StatusBar } from 'react-native';
import StyledLogo from './src/components/StyledLogo';
import TimetableScreen from './src/screens/TimetableScreen';
import MainStyleSheet from './src/styles/MainStyleSheet';
import LogoutScreen from './src/screens/LogoutScreen';

const store = createStore(combineReducers({ userReducer: userReducer , lectureReducer: lectureReducer }),applyMiddleware(thunk));

const DrawerNavigator = createDrawerNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      drawerLabel: 'Profile',
      drawerIcon: () => <SimpleLineIcon name={'emotsmile'} color={PrimaryColor} size={AppFontSize} />,
    },
  },
  Timetable: {
    screen: TimetableScreen,
    navigationOptions: {
      drawerLabel: 'Today Timetable',
      drawerIcon:()=> <SimpleLineIcon name={'note'} color={SecondaryColor} size={AppFontSize}/>
    },
  },
  Logout: {
    screen: LogoutScreen,
    navigationOptions: {
      drawerLabel: 'Logout',
      drawerIcon:()=> <SimpleLineIcon name={'logout'} color={PrimaryColor} size={AppFontSize}/>
    }
  }
}, {
  drawerWidth: Dimensions.get('screen').width - 100,
  drawerType: 'front',
  contentOptions: {
    iconStyle: {
      width: '80%',
    },
    labelStyle: {
      fontSize: AppFontSize,
      width: '30%',
    },
  },
  contentComponent: props => (
    <SafeAreaView>
      <StyledLogo color={'black'} />
      <ScrollView style={[MainStyleSheet.fullWidth]}>
        <DrawerItems {...props} />
      </ScrollView>
    </SafeAreaView>
  ),
});

const MainNavigator = createStackNavigator({
    Welcome: {
        screen: WelcomeScreen,
        navigationOptions: {
            header : null,
        },
    },
    Login: {
        screen: LoginScreen,
        navigationOptions: {
            header: null,
        },
  },
  Signup: {
    screen: SignupScreen,
    navigationOptions: {
      header:null,
    },
  },
  Profile: {
    screen: DrawerNavigator,
    navigationOptions: {
      header: null,
    },
  },
}, { initialRouteName: 'Welcome' });
const NavigetionStack = createAppContainer(MainNavigator);

function App() {
  return (
    <Provider store={store}>
          <StatusBar backgroundColor={PrimaryColor} barStyle={'light-content'}/>
          <NavigetionStack/>
    </Provider>
  );
}

export default gestureHandlerRootHOC(App);
