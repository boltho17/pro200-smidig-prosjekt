import {cardStyles, textStyles} from '../../constants/Styles'
import {Text, View, Image} from 'react-native'
import React, {PureComponent} from 'react'
import Auth from '../../utils/Auth'

export default class Member extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            profilePic: '',
            isPictureUpdated: ''
        }
    }


    getProfileImage = async () => {
        await fetch('https://smidig-backend.herokuapp.com/api/user/image/' + this.props.memberObj.userId, {
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
                    style={cardStyles.memberPic}/>)
        } else if(this.state.profilePic.length > 0 && this.state.isSinglePictureUpdated){
            return (
                <Image
                    source={{uri: this.state.profilePic}}
                    style={cardStyles.memberPic}/>)
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
            <View style={cardStyles.singleMember}>
                {this.renderProfilePic()}
                <Text style={textStyles.memberName}>
                    {this.props.memberObj.username}
                </Text>
                <Text style={textStyles.memberInfo}>
                    {this.props.memberObj.study}
                </Text>
            </View>
        );
    }
}
