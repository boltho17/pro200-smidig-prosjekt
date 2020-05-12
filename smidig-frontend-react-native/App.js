import React from 'react';
import {AsyncStorage, Platform, StatusBar, View} from 'react-native';
import {AppLoading, Asset, Font, Icon, SplashScreen} from 'expo';
import FrontSwitchNavigator from './navigation/FrontSwitchNavigator'
import {styles} from './constants/Styles'
import TutorialSwitchNavigator from './navigation/TutorialSwitchNavigator'
import Auth from './utils/Auth'


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAppReady: false,
            isFirstTime: true,
        };
    }

    render() {


        if (!this.state.isAppReady) {
            return (
                <AppLoading
                    startAsync={this._cacheResourcesAsync}
                    onError={this._handleLoadingError}
                    onFinish={() => this.setState({isAppReady: true})}
                    autoHideSplash={false}
                />
            );
        }

        if (!this.state.isFirstTime) {
            console.log("isNotFirstTime")
            return (

                <View style={styles.container}>
                    {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
                    <FrontSwitchNavigator/>
                </View>
            );
        } else {console.log("LastCheck")
            return (

                <View style={styles.container}>
                    {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
                    <TutorialSwitchNavigator/>
                </View>
            );
        }
    }

    _checkIfTokenExistOnDeviceAndSetLoggedInIfTokenIsValid = async () => {
        try {
            const jwtToken = Auth.getJWTToken();
            if (jwtToken !== undefined && jwtToken !== null) {
                await this._checkIfTokenIsWithBackend()
            } else {
                await Auth.loadJWTTokenFromSecureStorage();
                await this._checkIfTokenIsWithBackend();
                console.log("jwt null or undefined after async")
                console.log(Auth.getJWTToken())
            }
        } catch (e) {
            console.log("Error while retriving jwtToken" + e)
        }
    };

    _checkIfTokenIsWithBackend = async () => {
        try {
            const isValidFromBackend = await Auth.checkIfTokenIsValidWithBackend();

            if(isValidFromBackend){
                Auth.setLoggedIn(true)
            }else{
                await AsyncStorage.setItem('hasUsedApp', 'false');
                await Auth.deleteTokenFromSecureStorage()
                Auth.setLoggedIn(false);
                this.setState({isFirstTime: true})
            }

        } catch (e) {
            console.log("Error while retriving jwtToken" + e)
        }
    };

    _retrieveData = async () => {
        try {
            const hasUsedApp = await AsyncStorage.getItem('hasUsedApp');
            if (hasUsedApp !== null && hasUsedApp === false) {
                this.setState({isFirstTime: true})
            } else {
                this._storeData()
            }
        } catch (error) {

        }
    };

    _storeData = async () => {
        try {
            await AsyncStorage.setItem('hasUsedApp', 'true');
        } catch (error) {
            // Error saving data
        }
    };


    _cacheResourcesAsync = async () => {
        await Promise.all([
            this._doAllAsyncLoading(),
            Asset.loadAsync([
                require('./assets/images/robot-dev.png'),
                require('./assets/images/robot-prod.png'),
                require('./assets/images/tabbar.png'),
                require('./assets/images/logo.png'),
                //require('./assets/images/splash.png'),
            ]),
            Font.loadAsync({
                // This is the font that we are using for our tab bar
                ...Icon.Ionicons.font,
                'circular-bold': require('./assets/fonts/CircularStd-Bold.otf'),
                'circular-book': require('./assets/fonts/CircularStd-Book.otf'),
                'font-awesome-light': require('./assets/fonts/FontAwesome-Light-300.otf'),
                'font-awesome-regular': require('./assets/fonts/FontAwesome-Regular-400.otf'),
            }),
        ]);
        SplashScreen.hide()
        //setTimeout(() => { SplashScreen.hide() }, 2000);
    };


    _handleLoadingError = error => {
        console.warn(error);
    };

    _doAllAsyncLoading = async () => {
        await this._checkIfTokenExistOnDeviceAndSetLoggedInIfTokenIsValid()
            .then(this._retrieveData)
            .catch(error => console.log(error));
        console.log("allasyncbeforeretrueve")

    }
}


