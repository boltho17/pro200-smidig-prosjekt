import React from 'react';
import PropTypes from 'prop-types'
import {Card} from 'react-native-elements'
import {View, Text, Image} from 'react-native'
import {cardStyles, chatBubbleStyles, textStyles} from '../../constants/Styles'


export default class ChatBubble extends React.Component {

    getDateFromUnix(unix) {
        let days = ['Søn','Man','Tir','Ons','Tor','Fre','Lør'];
        let months = ['Jan', 'Feb', 'Mars', 'Apr', 'Mai', 'Jun', 'Juli', 'Aug', 'Sept', 'Okt', 'Nov', 'Des'];

        let currentDate = new Date();
        let currentYear = currentDate.getFullYear();
        let currentMonth = currentDate.getMonth();
        let currentDateDay = currentDate.getDate();

        let date = new Date(unix*1000);
        let day = date.getDay();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let month = date.getMonth();
        let dateDay = date.getDate();
        let year = date.getFullYear();

        if(currentYear !== year){
            return dateDay + '. ' + months[month] + ' ' + year;
        } else if(currentMonth !== month || (currentDateDay - dateDay) > 7){
            return days[day] + ' ' + dateDay + '. ' + months[month];
        } else if((currentDateDay - dateDay) <= 7 && (currentDateDay - dateDay) > 0){
            return days[day] + ' ' + hours + ':' + minutes
        }
        return hours + ':' + minutes
    }

    isTheSenderTheCurrentUser(){
        return this.props.chatMessage.userId.toString() === this.props.currentLoggedInUserId;
    }

    renderReceivedMessage() {

        return (
            <View style={[chatBubbleStyles.chatBubbleContainer, chatBubbleStyles.receivedMessageContainer]}>
                <View style={chatBubbleStyles.senderPicContainer}>
                    <Image
                        //source={{uri: this.props.chatMessage.user.profilePic}}
                    style={chatBubbleStyles.chatProfilePic}/>
                </View>
                <View style={chatBubbleStyles.bubbleSectionLeft}>
                    <Text style={[textStyles.smallerText, textStyles.textAlignLeft, textStyles.chatBubbleAuthorLeft]}>
                        {this.props.chatMessage.username +
                        ' - ' +
                        this.getDateFromUnix(this.props.chatMessage.created)}
                    </Text>
                    <Card containerStyle={[chatBubbleStyles.chatBubbleCard, chatBubbleStyles.receivedChatBubbleCard]}>
                        <Text style={[textStyles.mainText, textStyles.textAlignLeft, textStyles.smallerLineHeight]}>
                            {this.props.chatMessage.message}
                        </Text>
                    </Card>
                </View>
            </View>
        );
    }

    renderSentMessage(){
        return (
            <View style={[chatBubbleStyles.chatBubbleContainer, chatBubbleStyles.sentMessageContainer]}>
                <View style={chatBubbleStyles.bubbleSectionRight}>
                    <Text style={[textStyles.smallerText, textStyles.textAlignRight, textStyles.chatBubbleAuthorRight]}>
                        {this.getDateFromUnix(this.props.chatMessage.created)}
                    </Text>
                    <Card containerStyle={[chatBubbleStyles.chatBubbleCard, chatBubbleStyles.sentChatBubbleCard]}>
                        <Text style={[textStyles.mainText, textStyles.textWhite, textStyles.textAlignRight, textStyles.smallerLineHeight]}>
                            {this.props.chatMessage.message}
                        </Text>
                    </Card>
                </View>
            </View>
        );
    }

    render() {

        return(
            <View>
                {this.isTheSenderTheCurrentUser() ? this.renderSentMessage() : this.renderReceivedMessage()}
            </View>
        )
    }
}

ChatBubble.propTypes = {
    chatMessage: PropTypes.object.isRequired,
    currentLoggedInUserId: PropTypes.string,
};
