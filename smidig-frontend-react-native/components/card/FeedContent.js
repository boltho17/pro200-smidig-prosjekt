import {cardStyles, textStyles} from '../../constants/Styles'
import {Text, View, Image} from 'react-native'
import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Auth from '../../utils/Auth'
import {colors} from '../../constants/Colors'

export default class FeedContent extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            profilePic: '',
            isPictureUpdated: ''
        }
    }

    getProfileImage = async () => {
        await fetch('https://smidig-backend.herokuapp.com/api/user/image/' + this.props.group.owner_id, {
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
                    source={{uri: 'data:image/jpeg;base64,' + this.state.profilePic}}
                    style={cardStyles.userPic}/>)
        } else if(this.state.profilePic.length > 0 && this.state.isSinglePictureUpdated){
            return (
                <Image
                    source={{uri: this.state.profilePic}}
                    style={cardStyles.userPic}/>)
        } else {
            return (
                <View/>
            )
        }
    };

    componentDidMount() {
        this.getProfileImage()
    }

    renderLabel = () => {
        if(this.props.group.owner){
            return (
                <View style={{
                    height: 18,
                    borderRadius: 9,
                    backgroundColor: colors.fabRight,
                    paddingLeft: 5,
                    paddingRight: 5,
                    paddingTop: 2,
                    marginTop: 3}}>
                    <Text style={textStyles.buttonText}>
                        Din gruppe
                    </Text>
                </View>
            )
        } else if(this.props.group.member){
            return (
                <View style={{
                    height: 18,
                    borderRadius: 9,
                    backgroundColor: colors.fabLeft,
                    paddingLeft: 5,
                    paddingRight: 5,
                    paddingTop: 2,
                    marginTop: 3}}>
                    <Text style={textStyles.buttonText}>
                        Du er medlem
                    </Text>
                </View>
            )
        } else if(this.props.group.hasSentRequest){
            return (
                <View style={{
                    height: 18,
                    borderRadius: 9,
                    backgroundColor: colors.darkGray,
                    paddingLeft: 5,
                    paddingRight: 5,
                    paddingTop: 2,
                    marginTop: 3}}>
                    <Text style={textStyles.buttonText}>
                        Sendt forespørsel
                    </Text>
                </View>
            )
        } else {
            return (
                <View/>
            )
        }
    };

    render() {
        const groupOwner = this.props.group.participants.find( user => {
                return user.userId === this.props.group.owner_id
            }
        );
        return (
            <View>
                <View style={cardStyles.cardHeader}>
                    <View style={cardStyles.userPicContainer}>
                        {this.renderProfilePic()}
                    </View>
                    <View style={cardStyles.cardHeaderUserInfo}>
                        <Text style={textStyles.cardUserName}>
                            {groupOwner.username}
                        </Text>
                        <Text style={textStyles.cardUserFieldOfStudy}>
                            {groupOwner.study}
                        </Text>
                        {this.renderLabel()}
                    </View>
                    <View style={cardStyles.cardHeaderGroupMembers}>
                        <Text style={textStyles.cardNumber}>
                            {this.props.group.participants.length}/{this.props.group.groupSize === -1 ? (<Text>∞</Text>) : this.props.group.groupSize }
                        </Text>
                        <Text style={textStyles.cardNumberMembers}>
                            Medlemmer
                        </Text>
                    </View>
                </View>
                <View style={cardStyles.cardContent}>
                    <Text style={textStyles.cardHeader}>
                        {this.props.group.course}
                    </Text>
                    <Text style={textStyles.mainText}>
                       {this.props.group.description}
                    </Text>

                </View>
            </View>
        );
    }
}

FeedContent.propTypes = {
    group: PropTypes.object.isRequired,
};
