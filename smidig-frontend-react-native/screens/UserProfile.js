import React, {PureComponent} from 'react'
import {ScrollView, Text, View, Button} from 'react-native'
import {profileStyles, styles, textStyles} from '../constants/Styles'
import CustomButton from '../components/CustomButton'
import {NavigationActions} from "react-navigation"
import ProfilePostCard from '../components/card/ProfilePostCard'
import ProfileDetails from '../components/ProfileDetails'
import CustomModal from '../components/CustomModal'
import {deleteTokenFromSecureStorage} from '../utils/Utils'
import jwtDecode from "jwt-decode";
import Auth from '../utils/Auth'

export default class UserProfile extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            showUser: undefined,
            loggedInUser: undefined,
            activePosts: [],
            showModal: false,
            waiting: true,
            errorMsg: '',
            profilePic: '',
            isPictureUpdated: false,
            currentUser: ''
        }
    }

    getGroups = async () => {
        const response = await fetch("https://smidig-backend.herokuapp.com/api/user/groups", {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + Auth.getJWTToken()
            }
        });
        const groups = await response.json();
        this.setState({
            activePosts: groups,
            waiting: false
        });
    };
    getCurrentUser = () => {
        this.setState({currentUser: jwtDecode(Auth.getJWTToken()).sub.toString()})
    };

    componentDidMount() {

        this.getCurrentUser();
        this.getAsyncJobBackend();
        this.getGroups();

        if (this.props.navigation &&
            this.props.navigation.state &&
            this.props.navigation.state.params) {
            this.setState({
                modalVisible: this.props.navigation.state.params.modalVisible,
                showModal: modalVisible,
                waiting: true,
                errorMsg: '',
                profilePic: '',
                isSinglePictureUpdated: false,
                deleteModalVisible: false
            })
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({showModal: nextProps.navigation.state.params.modalVisible});
        this.getAsyncJobBackend()
    }

    navigateToEditProfile = () => {
        const navigateAction = NavigationActions.navigate({
            routeName: 'EditProfile',
            params: {isFirstLogIn: false},
        });
        this.props.navigation.dispatch(navigateAction);
    };


    onLogOut = async () => {
        await Auth.logout();
        this.props.navigation.navigate('Login')
    };

    onCloseModal = () => {
        this.props.navigation.setParams({modalVisible: false})
    };

    getProfileImage = async () => {
        await fetch('https://smidig-backend.herokuapp.com/api/user/image', {
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

    onDeleteClick = (groupIdToBeDeleted) => {
        fetch("https://smidig-backend.herokuapp.com/api/group/" + groupIdToBeDeleted, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + Auth.getJWTToken()
            }
        })
            .then(this.getGroups)
    };

    getAsyncJobBackend = () => {
        fetch('https://smidig-backend.herokuapp.com/api/user', {
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + Auth.getJWTToken()}
        })
            .then(response => response.json())
            .then(responseJson => {
                    responseJson.error !== undefined ?
                        this.setState({errorMessage: responseJson.error})
                        :
                        this.setState({waiting: false, showUser: responseJson})
                }
            )
            .catch(error => {
                this.setState({waiting: true, errorMsg: error});
            });
        this.getProfileImage()
    };

    render() {
        return (
            this.state.waiting || this.state.showUser === undefined ?
                <View style={[styles.container, styles.contentContainer]}>
                    <Text style={[textStyles.mainText, textStyles.textAlignCenter]}>
                        Laster..
                        {this.state.errorMsg}
                    </Text>
                </View>
                :
                <View style={styles.container}>
                    <ScrollView
                        style={styles.container}>
                        <CustomModal
                            modalVisible={this.state.showModal}
                            onCloseModal={this.onCloseModal}
                            onYes={this.onLogOut}
                            modalText={'Er du sikker på at du vil logge ut?'}/>

                        <View style={styles.contentContainer}>
                            <ProfileDetails showUser={this.state.showUser}
                                            profilePic={this.state.profilePic}
                                            isPictureUpdate={this.state.isSinglePictureUpdated}
                                            navigationToEditProfile={this.navigateToEditProfile}/>
                            <View style={profileStyles.buttonContainer}>
                                <CustomButton text={'Endre detaljene dine'} onClick={this.navigateToEditProfile}/>
                            </View>
                        </View>
                        <View style={profileStyles.postContainer}>
                            <View style={styles.contentContainerWithoutTop}>
                                <Text style={[textStyles.cardNumberMembers, textStyles.textAlignCenter]}>
                                    Grupper du har opprettet
                                </Text>
                            </View>
                            <View style={profileStyles.postsWrapper}>
                                {this.state.activePosts.filter(item => item.owner_id == this.state.currentUser)
                                    .map((groupArrayItem) =>
                                        <ProfilePostCard
                                            group={groupArrayItem}
                                            key={groupArrayItem.groupId}
                                            onDeactivate={this.onDeactivateClick}
                                            onDelete={this.onDeleteClick}
                                            onEdit={this.onEditClick}/>
                                    )
                                }
                            </View>
                        </View>
                    </ScrollView>
                </View>
        );
    }
}
