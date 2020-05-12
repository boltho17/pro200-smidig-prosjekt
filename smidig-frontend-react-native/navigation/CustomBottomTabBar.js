import React, {PureComponent} from 'react'
import {Icon} from 'react-native-elements'
import {Image, View, TouchableWithoutFeedback, Text} from 'react-native'
import {colors} from '../constants/Colors'
import {profileStyles} from '../constants/Styles'
import {NavigationActions} from 'react-navigation'
import { LinearGradient } from 'expo';
import {textStyles} from '../constants/Styles'
import {tabBarStyles} from '../constants/styles/CustomBottomTabStyles'
import SockJS from "sockjs-client";
import Stomp from "stomp-websocket";
import Auth from "../utils/Auth";
import jwtDecode from "jwt-decode";

export default class CustomBottomTabBar extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            notifications: 0
        }
    }

    async componentDidMount() {
        this.getConnection();
        const response = await fetch("https://smidig-backend.herokuapp.com/api/notification/all", {
            headers: {
                Authorization: 'Bearer ' + Auth.getJWTToken()
            }
        });

        if(response.status === 200){
            const body = await response.json();
            this.setState({notifications: body.length})
        }
    }

    componentWillUnmount() {
        this.socket.close()
    }

    getConnection = () => {
        this.getCurrentUser();
        this.socket = new SockJS("https://smidig-backend.herokuapp.com/ws");
        this.stompClient = Stomp.over(this.socket);
        this.stompClient.debug = null;
        this.stompClient.connect({'Authorization': 'Bearer ' + Auth.getJWTToken()}, () => {
            this.stompClient.subscribe("/queue/notification/" + this.state.currentUser, msg => {
                const messageBody = JSON.parse(msg.body);

                this.setState({notifications: this.state.notifications + 1})

            }, (error) => {
                console.log(error)
            })
        }, (error => {
            console.log(error)
        }))
    };

    deleteNotifications = () => {
        const response = fetch("https://smidig-backend.herokuapp.com/api/notification", {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + Auth.getJWTToken()
            }
        })
    };

    getCurrentUser = () => {
        this.setState({currentUser: jwtDecode(Auth.getJWTToken()).sub.toString()})
    };

    navigateToFeed = () => {
        const navigateAction = NavigationActions.navigate({
            routeName: 'Feed'
        });
        this.props.navigation.dispatch(navigateAction);
    };

    navigateToCreateGroup = () => {
        const navigateAction = NavigationActions.navigate({
            routeName: 'CreateGroup'
        });
        this.props.navigation.dispatch(navigateAction);
    };


    navigateToChat = () => {
        this.deleteNotifications();
        this.setState({notifications: 0});
        const navigateAction = NavigationActions.navigate({
            routeName: 'Chat'
        });
        this.props.navigation.dispatch(navigateAction);
    };



    render() {
        return(
            <View style={tabBarStyles.tabBarStyle}>
                <Image source={require('../assets/images/tabbar.png')}
                       style={tabBarStyles.tabBarBackground}/>
                <View style={tabBarStyles.tabBarItems}>

                    <TouchableWithoutFeedback onPress={this.navigateToFeed}>
                        <View style={tabBarStyles.tabBarItemContainer}>
                            <Icon
                                name="ios-list"
                                type="ionicon"
                                size={25}
                                color={this.props.navigation._childrenNavigation.Feed.isFocused() ?
                                    this.props.activeTintColor : this.props.inactiveTintColor}/>
                            <Text style={[
                                textStyles.tabBarIconTxt,
                                textStyles.textAlignCenter,
                                {color: this.props.navigation._childrenNavigation.Feed.isFocused() ?
                                        this.props.activeTintColor : this.props.inactiveTintColor}]}>
                                Feed
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={this.navigateToCreateGroup}>
                        <View style={tabBarStyles.fabContainer}>
                            <LinearGradient
                                colors={[colors.fabLeft, colors.fabRight]}
                                style={tabBarStyles.fabBackground}/>
                            <Icon
                                name="ios-add"
                                type="ionicon"
                                size={20}
                                color="#fff"
                                containerStyle={tabBarStyles.fabIcon}/>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={this.navigateToChat}>
                        <View style={tabBarStyles.tabBarItemContainer}>
                            <Text style={[profileStyles.iconFont,
                                {color: this.props.navigation._childrenNavigation.Chat.isFocused() ?
                                    this.props.activeTintColor : this.props.inactiveTintColor}]}>
                                users
                            </Text>
                            {this.state.notifications > 0 ?
                                <View style={tabBarStyles.notificationContainer}>
                                    <View style={tabBarStyles.notificationNumberContainer}>
                                        <Text style={textStyles.buttonText}>
                                            {this.state.notifications}
                                        </Text>
                                    </View>
                                </View> :
                                <View/>
                            }
                            <Text style={[
                                textStyles.tabBarIconTxt,
                                textStyles.textAlignCenter,
                                {color: this.props.navigation._childrenNavigation.Chat.isFocused() ?
                                        this.props.activeTintColor : this.props.inactiveTintColor}]}>
                                Grupper
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        )
    }
}
