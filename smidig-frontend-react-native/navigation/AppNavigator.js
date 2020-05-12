import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import {colors} from '../constants/Colors'
import {FeedStack, CreateGroupStack, ChatStack} from './AppBar'
import CustomBottomTabBar from './CustomBottomTabBar'


const AppNavigator = createBottomTabNavigator({
        Feed: {
            screen: FeedStack,
            navigationOptions: ({ navigation }) => {
                if(navigation.state.index > 0){
                    return { tabBarVisible: false }
                }
            },
        },
        Kollokvie: {
            screen: CreateGroupStack,
            navigationOptions: () => ({
                tabBarVisible: false,
            })
        },
        Chat: {
            screen: ChatStack,
            navigationOptions: ({ navigation }) => {
                if(navigation.state.index > 0){
                    return { tabBarVisible: false }
                }
            },
        }
    },
    {
        tabBarOptions: {
            activeTintColor: colors.fabRight,
            inactiveTintColor: colors.mediumGray,
            activeBackgroundColor: 'transparent',
            inActiveBackgroundColor: 'transparent',
        },
        tabBarComponent: props => {
            return (
                <CustomBottomTabBar {...props} />
            )
        }
});

export default AppNavigator;
