import React from 'react';
import {
    ScrollView,
    Text,
    RefreshControl,
    View
} from 'react-native';
import {styles, textStyles} from '../constants/Styles'
import ChatListItem from '../components/chat/ChatListItem'
import {NavigationActions} from "react-navigation"
import ChatRequest from '../components/chat/ChatRequest'
import Auth from '../utils/Auth'
import SockJS from "sockjs-client";
import Stomp from "stomp-websocket";
import jwtDecode from "jwt-decode";

//TODO: 1 - kjent bug i chat, noen ganger når man refresher chat-sida så kommer det not connected feilmelding, da må man restarte
//TODO: 4 - Pagination i chat conversation for å hente flere meldinger ved scrolling

export default class Chat extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            groups: [],
            waiting: true,
            requests: '',
            refreshing: false
        };
    }

    _onRefresh = () => {
        this.setState({waiting: true});
        this.setState({groups: []});
        this.getGroupRequests();
        this.getGroups();
    };

    deleteNotifications = async () => {
        const response = await fetch("https://smidig-backend.herokuapp.com/api/notification", {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + this.state.currentUser
            }
        })
    };

    getConnection = () => {
        this.getCurrentUser();
        this.socket = new SockJS("https://smidig-backend.herokuapp.com/ws");
        this.stompClient = Stomp.over(this.socket);
        this.stompClient.debug = null;
        this.stompClient.connect({'Authorization': 'Bearer ' + Auth.getJWTToken()}, () => {
            this.stompClient.subscribe("/queue/notification/" + this.state.currentUser, msg => {
                const messageBody = JSON.parse(msg.body);

                if (messageBody.type !== 'MESSAGE') {
                    this._onRefresh();
                    this.deleteNotifications()

                }

            }, (error) => {
                console.log(error)
            })
        }, (error => {
            console.log(error)
        }))
    };

    getCurrentUser = async () => {
        this.setState({currentUser: jwtDecode(await Auth.getJWTToken()).sub.toString()})
    };

    getGroups = async () => {
        const response = await fetch("https://smidig-backend.herokuapp.com/api/user/groups", {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + Auth.getJWTToken()
            }
        });
        const groups = await response.json();
        this.setState({
            groups: groups,
            waiting: false
        });
    };

    getGroupRequests = () => {
        fetch('https://smidig-backend.herokuapp.com/api/user/requests', {
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + Auth.getJWTToken()}
        })
            .then( response => response.json())
            .then( responseJson => {
                    responseJson.error !== undefined ? this.setState({errorMessage: responseJson.error}) :
                        this.setState({
                            waiting: false,
                            requests: responseJson
                        });
                }
            )
            .catch( error => {
                this.setState({waiting: true});
            });
    };


    componentDidMount() {
        this.getGroupRequests();
        this.getGroups();
        this.getConnection()
    }

    componentWillUnmount() {
        this.socket.close()
    }

    navigateToChatConversation = (group, messages) => {
        let headerTitle;
        if(group.course.length >= 18){
            headerTitle = group.course.substring(0, 15) + '...'
        } else {
            headerTitle = group.course;
        }

        const navigateAction = NavigationActions.navigate({
            routeName: 'ChatConversation' + '',
            params: {
                showGroup: group,
                headerTitle: headerTitle,
                messages: messages,
                token: Auth.getJWTToken()
            },
        });

        this.props.navigation.dispatch(navigateAction);
    };

    approveRequest = (approve, requestId) => {
        const approveString = approve ? 'approve' : 'deny';
        fetch('https://smidig-backend.herokuapp.com/api/request/' + requestId + '/' + approveString, {
            method: 'POST',
            headers: {'Authorization': 'Bearer ' + Auth.getJWTToken(),
                'Content-Type': 'application/json'}
        }).then( _ => {
                    this.getGroupRequests()
                }
            )
    };

    render() {
        if(this.state.waiting) {
            return (
                <View style={styles.container}>
                    <Text>Loading data...</Text>
                </View>
            )
        }
        else {
            return (
                <View style={styles.container}>
                    <ScrollView
                        style={styles.container}
                        contentContainerStyle={styles.contentContainer}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}/>
                        }>
                        <Text style={[textStyles.cardNumberMembers, textStyles.textAlignLeft]}>
                            Forespørsler
                        </Text>
                        {this.state.requests.length > 0 ?
                            this.state.requests.map((request, index) => {
                                return (
                                    <ChatRequest
                                        key={index}
                                        request={request}
                                        onClick={this.approveRequest}/>
                                )
                            }) :
                            //TODO: Bedre beskjed på å ikke ha forespørsler
                            <Text style={textStyles.mainText}>
                                Du har ingen forespørsler
                            </Text>
                        }
                        <View style={styles.conversationsContainer}>
                            <Text style={[textStyles.cardNumberMembers, textStyles.textAlignLeft]}>
                                Samtaler
                            </Text>
                            {this.state.groups.length > 0 ?
                                this.state.groups.map((group, index) => {
                                    return (
                                        <ChatListItem
                                            key={index}
                                            group={group}
                                            onChatClick={this.navigateToChatConversation}
                                        />
                                    )
                                }) :
                                //TODO: Bedre beskjed på å ikke være medlem av noen grupper
                                <Text style={textStyles.mainText}>
                                    Du er ikke medlem av noen grupper
                                </Text>
                            }

                        </View>
                        <View style={{height: 150}}/>
                    </ScrollView>

                </View>
            );
        }
    }
}
