import React, {PureComponent} from 'react';
import {Button, View, Text, Image} from 'react-native';
import {NavigationActions} from "react-navigation"
import {peerApiLogin, storeTokenOnSecureStorage} from '../utils/Utils'
import {styles, textStyles} from '../constants/Styles'
import CustomButton from '../components/CustomButton'
const jwtDecode = require('jwt-decode');
import Auth from '../utils/Auth'

export default class Login extends PureComponent {

    constructor(props) {
        super(props);

        if (props.loggingIn) {
            this.state = {
                loggingIn: true
            }
        } else {
            this.state = {
                loggingIn: false
            }
        }
    }

    componentDidMount() {
        let token = Auth.getJWTToken();
        console.log("didMount In Login")
        console.log(token)
        if (token === undefined || token === null) {
            this.setState({loggingIn: false});
        }
        /* Check if token is outdated
        else if(jwtDecode(token).exp < Date.now() / 1000) {
            this.setState({loggingIn: false});
            console.log('token outdated')
        }  */
        else {
            this.navigateToFeed()
        }
    }

    componentWillUnmount() {

    }

    signInAsync = async () => {
        const peerApiResponse = await peerApiLogin();
        if (peerApiResponse.status === 403) {
            console.log("peer api response")
            console.log(peerApiResponse)
            this.navigateToEditProfile()
        } else if (peerApiResponse.status === 200) {
            let token = peerApiResponse.headers.get('Authorization').replace('Bearer ', '');
            await Auth.storeTokenOnSecureStorage(token)
            await Auth.loadJWTTokenFromSecureStorage();
            this.navigateToFeed()
        }
    };

    navigateToFeed = () => {
        this.props.navigation.navigate('Feed');
    };

    navigateToEditProfile = () => {
        const navigateAction = NavigationActions.navigate({
            routeName: 'EditProfile',
            params: {isFirstLogIn: true},
        });
        this.props.navigation.dispatch(navigateAction);
    };

    render() {
        let content;
        if (this.state.loggingIn) {
            content =
                <View style={[styles.container, {justifyContent: 'center'}]}>
                    <View style={styles.contentContainerWithoutTop}>
                        <View style={styles.smallerContainer}>
                            <Text style={[textStyles.mainText, textStyles.textAlignCenter]}>
                                Logger inn... Vennligst vent!
                            </Text>
                        </View>
                    </View>
                </View>
        } else {
            content =
                <View style={[styles.container, {justifyContent: 'center'}]}>
                    <View style={styles.contentContainerWithoutTop}>
                        <View style={styles.smallerContainer}>
                            <Image
                                source={require('../assets/images/logo.png')}
                                style={{width: '100%', height: 100, resizeMode: 'contain', marginBottom: 40}}/>
                            <Text style={[textStyles.mainText, textStyles.textAlignCenter]}>
                                Du trenger Feide for å bruke denne løsningen. Logg inn med Feide ved å klikke på knappen
                                under.
                            </Text>
                        </View>
                        <View style={{marginTop: 40}}>
                            <CustomButton text={'Logg inn'} onClick={this.signInAsync}/>

                        </View>
                    </View>
                </View>
        }
        return (
            content
        )
    }
}


