import React from 'react'
import {chatInputStyles, requestStyles, styles, textStyles} from '../constants/Styles'
import {ScrollView, View, Text, KeyboardAvoidingView} from 'react-native'
import ChatBubble from '../components/chat/ChatBubble'
import {colors} from '../constants/Colors'
import {Input, Button, Icon} from 'react-native-elements'
import jwtDecode from 'jwt-decode';
import SockJS from "sockjs-client";
import Stomp from "stomp-websocket";

export default class ChatConversation extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            inputMessage: '',
            scrollView: null,
            currentUser: null,
            messages: props.navigation.getParam('messages', []),
            group: this.props.navigation.getParam('showGroup', null),
            token: this.props.navigation.getParam('token', '')
        };
    }
    sendWsMessage = () => {
        this.stompClient.send("/app/message/" + this.state.group.groupId,
            {Authorization: 'Bearer ' + this.state.token},
            JSON.stringify({
                groupId: this.state.group.groupId,
                message: this.state.inputMessage
        })
        );

        this.setState({inputMessage: ''})

    };
    getConnection = () => {
        this.socket = new SockJS("https://smidig-backend.herokuapp.com/ws" + "");
        this.stompClient = Stomp.over(this.socket);
        this.stompClient.debug = null;
        this.stompClient.connect({'Authorization': 'Bearer ' + this.state.token}, () => {
            this.stompClient.subscribe("/queue/chat/" + this.state.group.groupId, msg => {
                const messageBody = JSON.parse(msg.body);
                this.setState(
                    prev => {
                        if(prev.messages === null){
                            return {messages: [messageBody]};
                        } else {
                            return {messages: [...prev.messages, messageBody]}
                        }
                    }
                );
            }, (error) => {
                console.log(error)
            })
        })
    };

    componentDidMount() {
        this.getCurrentUser();
        this.getConnection();
    }
    componentWillUnmount() {
        this.stompClient.disconnect();
        this.socket.close()
    }

    getCurrentUser = () => {
       this.setState({currentUser: jwtDecode(this.state.token).sub.toString()})
    };

    setText = (message) => {
        this.setState({inputMessage: message})
    };

    scrollToTop = () => {
        if(this.state.scrollView !== null ) {
            this.state.scrollView.scrollToEnd({animated: true})
        }
    };

    setScrollView = (scrollView) => {
        this.setState({scrollView: scrollView})
    };

    render() {
        return(
            <KeyboardAvoidingView
                style={styles.container}
                behavior={"padding"}>
                <ScrollView
                    style={{flex: 1}}
                    ref={ ref => {
                        if(this.state.scrollView === null ) this.setScrollView(ref)}}
                    contentContainerStyle={styles.contentContainer}
                    onContentSizeChange={this.scrollToTop}
                >
                    {this.state.messages && this.state.messages.length > 0 ? this.state.messages.map( (message, index) => {
                        return (
                            <ChatBubble
                                key={index}
                                chatMessage={message}
                                currentLoggedInUserId={this.state.currentUser}/>
                        );
                    }) :
                        <Text style={[textStyles.mainText, textStyles.textAlignCenter]}>
                            Bli den første til å si hei!
                        </Text>
                    }
                </ScrollView>
                <View style={chatInputStyles.chatInputSection}>
                    <View style={{flex: 0.8}}>
                        <Input
                            placeholder={'Aa'}
                            value={this.state.inputMessage}
                            inputStyle={chatInputStyles.chatInput}
                            inputContainerStyle={chatInputStyles.chatInputContainer}
                            onChangeText={ value => this.setText(value)}
                            onFocus={this.scrollToTop}
                            multiline={true}
                        />
                    </View>
                    <View style={chatInputStyles.chatSendButtonContainer}>
                        <Button
                            containerStyle={{height: 40}}
                            buttonStyle={{backgroundColor: 'white'}}
                            onPress={this.sendWsMessage}
                            icon={
                                <Icon
                                    name="ios-send"
                                    type="ionicon"
                                    size={25}
                                    color={colors.fabRight}
                                />
                            }
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}