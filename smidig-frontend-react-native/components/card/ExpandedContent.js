import {cardStyles, textStyles} from '../../constants/Styles'
import {Text, View} from 'react-native'
import React, {PureComponent} from 'react'
import FeedContent from './FeedContent'
import Member from './Member'
import CustomButton from '../CustomButton'
import Auth from '../../utils/Auth'


export default class ExpandedContent extends PureComponent {

    constructor(props) {
        super(props);
    }

    postAsyncJobBackend = () => {
        fetch('https://smidig-backend.herokuapp.com/api/request', {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer '+ Auth.getJWTToken()},
            body: JSON.stringify({
                groupId: this.props.group.groupId,
                message: "hallo!"
            })
        })
            .then( response => response.json())
            .catch(error => console.log('ERROR FROM JSON: ' + error))
            .then( responseInJson => {
                    this.setState({
                        apiResponse: responseInJson,
                        waiting: false
                    });
                }
            )
    };

    renderJoinButton = () => {
        if(this.props.group.owner || this.props.group.member){
            return(
                <View/>
            )
        } else if(this.props.group.hasSentRequest){
            return(
                <CustomButton
                    text={'Bli med'}
                    clickedText={'Forespørsel sendt'}
                    shouldDisable={true}
                    onClick={this.postAsyncJobBackend}
                    isDisabled={true}/>
            )
        } else {
            return(
                <CustomButton
                    text={'Bli med'}
                    clickedText={'Forespørsel sendt'}
                    shouldDisable={true}
                    onClick={this.postAsyncJobBackend}
                    isDisabled={false}/>
            )
        }
    };

    render() {
        return (
            <View>
                <FeedContent group={this.props.group}/>
                <View style={cardStyles.membersSectionContainer}>
                    <Text style={textStyles.boldSmallText}>
                        Medlemmer:
                    </Text>
                    <View style={cardStyles.membersContainer}>
                        {this.props.group.participants
                        .map(
                        (memberInd) => <Member memberObj={memberInd} key={memberInd.userId} />)}
                    </View>
                </View>
                {this.renderJoinButton()}
            </View>
        );
    }
}

