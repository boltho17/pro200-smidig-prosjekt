import {profileStyles, textStyles} from '../constants/Styles'
import {Image, Text, View, TouchableWithoutFeedback} from 'react-native'
import {Icon} from 'react-native-elements'
import {colors} from '../constants/Colors'
import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

export default class ProfileDetails extends PureComponent {

    constructor(props) {
        super(props)
    }

    navigationToEditProfile = () => {
        this.props.navigationToEditProfile()
    };

    renderProfilePic = () => {
        if(this.props.profilePic.length > 0 && !this.props.isSinglePictureUpdated){
            return (
                <Image
                    source={{uri: 'data:image/jpeg;base64,' + this.props.profilePic}}
                    style={profileStyles.profilePic}/>)
        } else if(this.props.profilePic.length > 0 && this.props.isSinglePictureUpdated){
            return (
                <Image
                    source={{uri: this.props.profilePic}}
                    style={profileStyles.profilePic}/>)
        } else {
            return (
                <View/>
            )
        }
    };
    render() {
        return (
            <View>
                <TouchableWithoutFeedback onPress={this.navigationToEditProfile}>
                    <View style={profileStyles.picContainer}>
                        {this.renderProfilePic()}
                    </View>
                </TouchableWithoutFeedback>
                <View style={[profileStyles.infoRow, {marginTop: 40}]}>
                    <Icon
                        name='user'
                        type='feather'
                        size={20}
                        color={colors.fabRight}
                        containerStyle={{flex: 0.2}}/>
                    <Text style={[
                        textStyles.mainText,
                        textStyles.biggerMainText,
                        profileStyles.infoText]}>
                        {this.props.showUser.username}
                    </Text>
                </View>
                <View style={profileStyles.infoRow}>
                    <Text style={profileStyles.iconFont}>
                        at
                    </Text>
                    <Text style={[textStyles.mainText,
                        textStyles.biggerMainText,
                        profileStyles.infoText]}>
                        {this.props.showUser.email}
                    </Text>
                </View>
                <View style={profileStyles.infoRow}>
                    <Text style={profileStyles.iconFont}>
                        university
                    </Text>
                    <Text style={[
                        textStyles.mainText,
                        textStyles.biggerMainText,
                        profileStyles.infoText]}>
                        {this.props.showUser.school}
                    </Text>
                </View>
                <View style={profileStyles.infoRow}>
                    <Text style={profileStyles.iconFont}>
                        graduation-cap
                    </Text>
                    <Text style={[
                        textStyles.mainText,
                        textStyles.biggerMainText,
                        profileStyles.infoText]}>
                        {this.props.showUser.study}
                    </Text>
                </View>
            </View>
        )
    }
}

ProfileDetails.propTypes = {
    navigationToEditProfile: PropTypes.func.isRequired,
    showUser: PropTypes.object.isRequired,
};
