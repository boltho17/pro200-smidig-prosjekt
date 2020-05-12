import {Image, Text, View, TouchableWithoutFeedback} from 'react-native'
import {cardStyles, requestStyles, styles, textStyles} from '../../constants/Styles'
import PropTypes from 'prop-types'
import React from 'react'
import GradientButton from 'react-native-gradient-buttons/src/index'
import {colors} from '../../constants/Colors'
import {Icon, Button} from 'react-native-elements'
import Auth from '../../utils/Auth'


export default class ChatRequest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            profilePic: '',
            isPictureUpdated: false
        }
    }

    getProfileImage = async () => {
        await fetch('https://smidig-backend.herokuapp.com/api/user/image/' + this.props.request.user.userId, {
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + Auth.getJWTToken()}
        })
            .then(async response => {
                this.setState({profilePic: response._bodyText})
            })
            .catch(error => {
                console.log(error)
            });
    };
    renderProfilePic = () => {
        if(this.state.profilePic.length > 0 && !this.state.isSinglePictureUpdated){
            return (
                <Image
                    source={{uri: 'data:image/jpeg;base64,' + this.state.profilePic + ''}}
                    style={cardStyles.userPic}/>)
        } else if(this.state.profilePic.length > 0 && this.state.isSinglePictureUpdated){
            return (
                <Image
                    source={{uri: this.state.profilePic}}
                    style={cardStyles.userPic}/>)
        } else {
            return (
                <View></View>
            )
        }
    };
    componentDidMount() {
        this.getProfileImage()
    }

    render() {
        return (
            <View style={requestStyles.item}>
                <View style={requestStyles.imageContainer}>
                    {this.renderProfilePic()}
                </View>
                <View style={requestStyles.requestInfoContainer}>
                    <Text style={[textStyles.chatListGroupName, textStyles.chatListNewMessage]}>
                        {this.props.request.user.username}
                    </Text>
                    <Text style={textStyles.chatListCourseName}>
                        {this.props.request.group.course}
                    </Text>
                </View>
                <View style={requestStyles.acceptButtonContainer}>
                    <TouchableWithoutFeedback onPress={() => this.props.onClick(true, this.props.request.requestId)}>
                        <View style={{
                            alignItems: 'center',
                            flexDirection: 'column',
                            justifyContent: 'center'}}>
                            <GradientButton gradientBegin={colors.gradientLeft}
                                            gradientEnd={colors.gradientRight}
                                            gradientDirection="diagonal"
                                            height={40}
                                            width={40}
                                            style={styles.buttonStyle}
                                            radius={30}>
                            </GradientButton>
                            <Icon
                                name="ios-checkmark"
                                type="ionicon"
                                size={30}
                                color="#fff"
                                containerStyle={requestStyles.buttonIcon}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={requestStyles.declineButtonContainer}>
                    <Button
                        buttonStyle={requestStyles.declineButton}
                        onPress={() => this.props.onClick(false, this.props.request.requestId)}
                        icon={
                            <Icon
                                name="ios-close"
                                type="ionicon"
                                size={30}
                                color={colors.fabRight}
                                containerStyle={requestStyles.buttonIcon}
                            />
                        }/>
                </View>
            </View>
        );
    }
}

ChatRequest.propTypes = {
    request: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
};
