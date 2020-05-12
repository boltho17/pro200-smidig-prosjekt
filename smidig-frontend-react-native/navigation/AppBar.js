import React from 'react';
import {createStackNavigator} from "react-navigation"
import UserProfile from '../screens/UserProfile'
import Feed from '../screens/Feed'
import Login from '../screens/Login'
import Filter from '../screens/Filter'
import CreateGroup from '../screens/CreateGroup'
import Chat from '../screens/Chat'
import ChatConversation from '../screens/ChatConversation'
import EditProfile from '../screens/EditProfile'
import CameraPage from '../screens/CameraPage'
import CustomTopNavigationBar from './CustomTopNavigationBar'


export const CreateGroupStack = createStackNavigator( {
    CreateGroup: {
        screen: CreateGroup,
        navigationOptions: ({ navigation }) => {
            return {
                header: (
                    <CustomTopNavigationBar
                        navigation={navigation}
                        routeLeft={'Feed'}
                        iconLeftName={'arrow-left'}
                        iconLeftType={'feather'}
                        headline={'Opprett kollokvie'}
                        isSmallerHeadline={true}
                    />
                )
            };
        }}
});


export const ChatStack = createStackNavigator({
    Chat: {
        screen: Chat,
        navigationOptions: ({ navigation }) => {
            return{
                header: (
                    <CustomTopNavigationBar
                        navigation={navigation}
                        routeRight={'UserProfile'}
                        headline={'Grupper'}
                        iconRightName={'user'}
                        iconRightType={'feather'}/>
                )
            }
        }
    },
    ChatConversation: {
        screen: ChatConversation,
        navigationOptions: ({ navigation }) => {
            return{
                header: (
                    <CustomTopNavigationBar
                        navigation={navigation}
                        routeLeft={'Chat'}
                        iconLeftName={'arrow-left'}
                        iconLeftType={'feather'}
                        headline={navigation.getParam('headerTitle', 'hei')}
                        isSmallerHeadline={true}
                    />
                )
            }
        }
    }
});


export const FeedStack = createStackNavigator( {
    Feed: {
        screen: Feed,
        navigationOptions: ({ navigation }) => {
            return {
                header: (
                    <CustomTopNavigationBar
                        navigation={navigation}
                        routeLeft={'Filter'}
                        routeRight={'UserProfile'}
                        headline={'Feed'}
                        iconLeftName={'filter'}
                        iconLeftType={'feather'}
                        iconRightName={'user'}
                        iconRightType={'feather'}/>
                    )
            };
        }
    },
    Filter: {
        screen: Filter,
        navigationOptions: ({ navigation }) => {
            return {
                header: (
                    <CustomTopNavigationBar
                        navigation={navigation}
                        routeLeft={'Feed'}
                        headline={'Filter'}
                        iconLeftName={'arrow-left'}
                        iconLeftType={'feather'}
                        isSmallerHeadline={true}/>
                )
            };
        }
    },
    UserProfile: {
        screen: UserProfile,
        navigationOptions: ({ navigation }) => {
            return {
                header: (
                    <CustomTopNavigationBar
                        navigation={navigation}
                        routeLeft={'Feed'}
                        iconLeftName={'arrow-left'}
                        iconLeftType={'feather'}
                        headline={'Din profil'}
                        routeRight={'LogOut'}
                        iconRightName={'log-out'}
                        iconRightType={'feather'}
                        isSmallerHeadline={true}/>
                )
            };
        }
    },
    EditProfile:{
        screen: EditProfile,
        navigationOptions: ({ navigation }) => {
            if(navigation.getParam('isFirstLogIn', false)){
                return {
                    header: (
                        <CustomTopNavigationBar
                            navigation={navigation}
                            headline={'Legg inn profildetaljer'}
                            isSmallerHeadline={true}/>
                    )
                }
            }

            return {
                header: (
                    <CustomTopNavigationBar
                        navigation={navigation}
                        routeLeft={'UserProfile'}
                        iconLeftName={'arrow-left'}
                        iconLeftType={'feather'}
                        headline={'Endre profil'}
                        isSmallerHeadline={true}/>
                )
            };
        },
    },
    CameraPage: {
        screen: CameraPage,
        navigationOptions: ({ navigation }) => {
            return {
                header: (
                    <CustomTopNavigationBar
                        navigation={navigation}
                        routeLeft={'EditProfile'}
                        iconLeftName={'arrow-left'}
                        iconLeftType={'feather'}
                        headline={''}
                        isCameraBar={true}/>
                )
            }}
    },
    LogOut: {
        screen: Login
    }

});

