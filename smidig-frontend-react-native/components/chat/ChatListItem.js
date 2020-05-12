import {Image, Text, TouchableWithoutFeedback, View} from 'react-native'
import {textStyles, chatListStyles, cardStyles, styles} from '../../constants/Styles'
import PropTypes from 'prop-types'
import React from 'react'
import SockJS from 'sockjs-client'
import Stomp from 'stomp-websocket'
import Auth from '../../utils/Auth'

export default class ChatListItem extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            messages: null,
            waiting: true,
            hasMessages: false,
            connected: false,
            subscription: null,
            gettingMessages: 0,
            profilePicOwner: '',
            profilePicExtra: '',
            isSinglePictureUpdated: false
        };
    }

    componentDidMount() {
        this.getProfileImages();
        this.getMessages();
        this.getConnection();
    }

    getProfileImages = async () => {
            await fetch('https://smidig-backend.herokuapp.com/api/user/image/' + this.props.group.owner_id, {
                method: 'GET',
                headers: {'Authorization': 'Bearer ' + Auth.getJWTToken()}
            })
                .then(async response => {
                    this.setState({profilePicOwner: response._bodyText})
                })
                .catch(error => {
                    console.log(error)
                });

         if (this.props.group.participants.length > 1) {
           const extraUser =  this.props.group.participants.find(participant => participant.userId !== this.props.group.owner_id);
             await fetch('https://smidig-backend.herokuapp.com/api/user/image/' + extraUser.userId, {
                     method: 'GET',
                     headers: {'Authorization': 'Bearer ' + Auth.getJWTToken()}
                 })
                     .then(async response => {
                         this.setState({profilePicExtra: response._bodyText})
                     })
                     .catch(error => {
                         console.log(error)
                     });
             }

        this.setState({waiting: false})
    };
    renderProfilePic = () => {
        if(this.props.group.participants.length === 1) {
        if(this.state.profilePicOwner.length > 0){
            return (
                <View style={chatListStyles.imageContainer}>
                    <Image
                        source={{uri: 'data:image/jpeg;base64,' + this.state.profilePicOwner + ''}}
                        style={chatListStyles.singleUserPic}/>
                </View>)
        }
        }
        else {
            if(this.state.profilePicOwner.length > 0 && this.state.profilePicExtra.length > 0 ) {
                return (
                    <View style={chatListStyles.imageContainer}>
                        <Image
                            style={[chatListStyles.userPic, chatListStyles.secondToLastUserPic]}
                            source={{uri: 'data:image/jpeg;base64,' + this.state.profilePicOwner}}/>
                        <Image
                            style={[chatListStyles.userPic, chatListStyles.lastUserPic]}
                            source={{uri: 'data:image/jpeg;base64,' + this.state.profilePicExtra}}/>
                    </View>
                )
            }
        }
    };

    getMessages = async () => {
        const response = await fetch("https://smidig-backend.herokuapp.com/api/group/" + this.props.group.groupId + "/messages/0/20", {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + Auth.getJWTToken() + '',
                'Content-Type': 'application/json' + ''
            }
        });

        const body = await response.json();
        if (response.status === 200){
            if (body.length > 0){
                this.setState({messages: body, hasMessages: true})
            }
        }
    };

   getConnection = () => {
        this.socket = new SockJS("https://smidig-backend.herokuapp.com/ws");
        this.stompClient = Stomp.over(this.socket);
        this.stompClient.debug = null;
        this.stompClient.connect({'Authorization': 'Bearer ' + Auth.getJWTToken()}, () => {
        this.stompClient.subscribe("/queue/chat/" + this.props.group.groupId, msg => {
            const messageBody = JSON.parse(msg.body);
            this.setState(
                prev => {
                    if(prev.messages === null){
                        return {messages: [messageBody], hasMessages: true};
                    } else {
                        return {messages: [...prev.messages, messageBody], hasMessages: true}
                    }
                }
            );
    }, (error) => {
        console.log(error)
    })
}, (error => {
    console.log(error)
    }))
};

    componentWillUnmount() {
        this.stompClient.disconnect();
        this.socket.close()
    }

    onChatClick(groupId) {
        this.props.onChatClick(groupId, this.state.messages);
    }

    renderLastMessage = () => {
        let formattedLastMessage = null;
        let latestMessage;
        let latestUserName;
        if (this.state.hasMessages){
            latestMessage = this.state.messages[this.state.messages.length - 1];
            if(latestMessage !== '') {
                latestUserName = latestMessage.username;
                formattedLastMessage = (latestUserName + ': ' + latestMessage.message).substring(0, 32) + '...'
            } else{
                formattedLastMessage = null
            }
        }
        return (formattedLastMessage === null ?
            'Bli den første til å si hei!' :
            formattedLastMessage)
    };

    render() {

        let formattedGroupName;

        if(this.props.group.name.length > 21){
            formattedGroupName = this.props.group.name.substring(0, 21) + '...';
        } else {
            formattedGroupName = this.props.group.name

        }

        if(this.state.waiting) {
            return (
                <View style={styles.container}>
                    <Text>Loading data...</Text>
                </View>
            )
        }
        else {
            return (
                <TouchableWithoutFeedback
                    onPress={() => this.onChatClick(this.props.group)}>
                    <View style={chatListStyles.item}>
                        {this.renderProfilePic()}
                        <View style={chatListStyles.chatInfoContainer}>
                            <Text style={
                                this.props.group.hasUnreadMessages ?
                                    [textStyles.chatListGroupName, textStyles.chatListNewMessage] :
                                    textStyles.chatListGroupName}>
                                {formattedGroupName}
                            </Text>
                            <Text style={textStyles.chatListCourseName}>
                                {this.props.group.course}
                            </Text>
                            <Text style={
                                this.props.group.hasUnreadMessages ?
                                    textStyles.chatUnreadLastMessage :
                                    textStyles.chatListLastMessage}>
                                {this.renderLastMessage()}
                            </Text>

                        </View>

                    </View>
                </TouchableWithoutFeedback>
            );
        }
    }
}

ChatListItem.propTypes = {
    group: PropTypes.object.isRequired,
    onChatClick: PropTypes.func.isRequired,
};

