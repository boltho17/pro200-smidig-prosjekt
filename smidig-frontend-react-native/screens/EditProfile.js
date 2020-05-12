import React, {PureComponent} from 'react';
import {Image, View, Text, TouchableWithoutFeedback, ScrollView} from 'react-native';
import InputField from '../components/InputField'
import {profileStyles, styles} from '../constants/Styles'
import CustomButton from '../components/CustomButton'
import {ImageManipulator, LinearGradient} from 'expo'
import {colors} from '../constants/Colors'
import {Icon} from 'react-native-elements'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {storeFeideTokenOnSecureStorage, getFeideTokenOnSecureStorage, storeTokenOnSecureStorage} from '../utils/Utils'
import {NavigationActions} from "react-navigation";
import SchoolDropdown from '../components/SchoolDropdown'
import Auth from '../utils/Auth'

export default class EditProfile extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            isFirstLogin: props.navigation.getParam('isFirstLogIn', false),
            profilePic: '',
            isPictureUpdated: false,
            userName: '',
            mail: '',
            school: '',
            study: '',
            errorMsg: ''
        }
    }


    async componentDidMount() {
        console.log("is first login:" + this.state.isFirstLogin)
        if (this.state.isFirstLogIn) {
            await this.getAsyncJobBackend()
        }

    }

    getAsyncJobBackend = async () => {

        await fetch('https://smidig-backend.herokuapp.com/api/user', {
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + Auth.getJWTToken()}
        })
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson)
                    responseJson.error !== undefined ?
                        this.setState({errorMessage: responseJson.error})
                        :
                        this.setState({
                            waiting: false,
                            mail: responseJson.email,
                            school: responseJson.school,
                            study: responseJson.study
                        })
                }
            )
            .catch(error => {
                this.setState({waiting: true, errorMsg: error});
            });
        await this.getProfileImage()
    };


    componentDidUpdate(prevProps, prevState, snapshot) {
        let profilePicture = this.props.navigation.state.params.profilePicture;
        if (profilePicture !== undefined && (prevState.profilePic !== profilePicture)) {
            this.setState({profilePic: profilePicture, isSinglePictureUpdated: true})
        }
    }

    setUsername = (newUsername) => {
        this.setState({userName: newUsername})
    };
    setMail = (newMail) => {
        this.setState({mail: newMail})
    };

    setStudy = (newStudy) => {
        this.setState({study: newStudy})
    };

    getProfileImage = async () => {
        fetch('https://smidig-backend.herokuapp.com/api/user/image', {
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + await Auth.getJWTToken()}
        })
            .then(async response => {
                this.setState({profilePic: response._bodyText})
            })
            .catch(error => {
                console.log(error)
            });
    };

    postPicture = async () => {
        let form = new FormData();
        form.append("file", {
            uri: this.state.profilePic,
            type: 'image/jpg',
            name: this.state.profilePic.split(/[\\/]/).pop() // basename
        });
        await fetch('https://smidig-backend.herokuapp.com/api/user/image', {
            method: 'POST',
            headers: {'Content-Type': 'multipart/form-data', 'Authorization': 'Bearer ' + Auth.getJWTToken()},
            body: form
        })
            .catch(error => {
                console.log(error)
            })
    };

    saveEdits = async () => {
        if (this.state.isFirstLogin) {
            const response = await fetch('https://smidig-backend.herokuapp.com/auth/sign-up', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    feideAccessToken: await getFeideTokenOnSecureStorage(),
                    email: this.state.mail,
                    school: this.state.school,
                    study: this.state.study,
                    username: this.state.userName
                })
            });
            try {
                if (response.headers.get('Authorization') !== null && response.headers.get('Authorization') !== undefined) {
                    let token = response.headers.get('Authorization').replace('Bearer ', '');
                    storeTokenOnSecureStorage(token).then(
                        await Auth.loadJWTTokenFromSecureStorage(),
                        this.props.navigation.dispatch(NavigationActions.navigate({
                            routeName: 'Login',
                            params: {loggingIn: true}
                        }))
                    )
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            await fetch('https://smidig-backend.herokuapp.com/api/user', {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + Auth.getJWTToken()},
                body: JSON.stringify({
                    email: this.state.mail,
                    school: this.state.school,
                    study: this.state.study
                })
            }).then(
                this.props.navigation.navigate('UserProfile', {
                    refresh: true,
                    modalVisible: false
                }))
        }
        if (this.state.profilePic.length > 0 && this.state.isSinglePictureUpdated) {

            await this.postPicture();
        } else {
            console.log('no picture?')
        }
    };

    chooseSchool = (selected) => {
        console.log("EditProfile")
        console.log(selected)
        this.setState({school: selected})
    };

    navigateToCamera = () => {
        this.props.navigation.navigate('CameraPage');
    };

    renderProfilePic = () => {
        if (this.state.profilePic.length > 0 && !this.state.isSinglePictureUpdated) {
            return (
                <Image
                    source={{uri: 'data:image/jpeg;base64,' + this.state.profilePic}}
                    style={profileStyles.profilePic}/>)
        } else if (this.state.profilePic.length > 0 && this.state.isSinglePictureUpdated) {
            return (
                <Image
                    source={{uri: this.state.profilePic}}
                    style={profileStyles.profilePic}/>)
        } else {
            return (
                <View/>
            )
        }
    };

    renderUsername = () => {
        if (this.state.isFirstLogin) {
            return <InputField
                fieldName='Username'
                setText={this.setUsername}
                text={this.state.userName}
                multiline={false}/>
        } else return (
            <View>
            </View>
        )
    };

    render() {

        return (

            this.state.waiting ?
                <Text>
                    Loading
                    {this.state.errorMsg}
                </Text>
                :
                <View style={styles.container}>
                    <KeyboardAwareScrollView
                        style={styles.container}
                        contentContainerStyle={styles.contentContainer}>
                        <View style={profileStyles.picContainer}>
                            {this.renderProfilePic()}
                            <TouchableWithoutFeedback onPress={this.navigateToCamera}>
                                <View style={profileStyles.editPicButton}>
                                    <LinearGradient
                                        colors={[colors.gradientLeft, colors.gradientRight]}
                                        style={profileStyles.editButtonBackground}/>
                                    <Icon
                                        name="camera"
                                        type="feather"
                                        size={20}
                                        color="#fff"
                                        containerStyle={profileStyles.editIcon}/>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        {this.renderUsername()}
                        <View style={{marginBottom: 30}}>
                            <InputField
                                fieldName='Mail'
                                setText={this.setMail}
                                text={this.state.mail}
                                multiline={false}/>
                        </View>
                        <SchoolDropdown schoolChosen={this.state.school} chooseSchool={this.chooseSchool}/>
                        <InputField
                            fieldName='Linje'
                            setText={this.setStudy}
                            text={this.state.study}
                            multiline={false}/>
                        <View style={{marginTop: 50, marginBottom: 50}}>
                            <CustomButton text={'Lagre'} onClick={this.saveEdits}/>
                        </View>
                    </KeyboardAwareScrollView>
                </View>
        );
    }
}


