import React, {PureComponent} from 'react'
import {Camera, Permissions, ImageManipulator, ImagePicker} from 'expo'
import {Text, TouchableOpacity, View} from 'react-native'
import {Icon} from 'react-native-elements'
import {colors} from '../constants/Colors'
import {cameraStyles} from '../constants/styles/CameraStyles'
import {NavigationActions} from "react-navigation"

export default class CameraPage extends PureComponent {

    constructor(props){
        super(props);
        this.state = {
            hasCameraPermission: null,
            cameraType: Camera.Constants.Type.front,
            pictureTaken: false
        }
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    navigateToEditProfile = (newUri) => {
        const navigateAction = NavigationActions.navigate({
            routeName: 'EditProfile' +'',
            params: {profilePicture: newUri, shouldUpdatePicture: true},
        });
        this.props.navigation.dispatch(navigateAction);
    };

    flipCamera = () => {
        this.setState({
            cameraType: this.state.cameraType === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back,
        })
    };

    resizePhoto = async(uri) => {
        let resizePhoto = await ImageManipulator.manipulateAsync(
            uri,
            [{resize: {width: 300}}],
            {compress: 0.1,
                format: 'jpg',
                base64: false});
        return resizePhoto.uri
    };

    snap = async () => {
        console.log('this must be here!');
        await this.camera.takePictureAsync({quality: 0.1, skipProcessing: false})
            .then(async (photo) => {
                    this.setState({pictureTaken: true});
                    let resizeURI = await this.resizePhoto(photo.uri);
                    this.navigateToEditProfile(resizeURI)
                })
    };


    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else if (this.state.pictureTaken){
            return <View style={{flex: 1, backgroundColor: 'black'}}/>
        }
        else {
            return (
                <View style={{flex: 1}}>
                    <Camera
                        style={{flex: 1}}
                        type={this.state.cameraType}
                        ref={ref => { this.camera = ref; }}>
                        <View style={cameraStyles.cameraTopBar}>
                            <TouchableOpacity
                                style={cameraStyles.exitTouchableContainer}
                                onPress={this.navigateToEditProfile}>
                                <Icon
                                    name='x'
                                    type='feather'
                                    size={25}
                                    color={'white'}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={cameraStyles.flipTouchableContainer}
                                onPress={this.flipCamera}>
                                <Icon
                                    name='repeat'
                                    type='feather'
                                    size={20}
                                    color={'white'}/>
                            </TouchableOpacity>
                        </View>

                    </Camera>
                    <View style={cameraStyles.cameraBottomBar}>
                        <TouchableOpacity
                            style={cameraStyles.cameraSnapButton}
                            onPress={this.snap}>
                            <Icon
                                name='camera'
                                type='feather'
                                size={20}
                                color={colors.fabRight}
                                containerStyle={{
                                    padding: 5,
                                    height: 50,
                                    width: 50,
                                    borderRadius: 25,
                                    backgroundColor: 'white',
                                    alignItems: 'center',
                                    justifyContent: 'center'}}/>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    }

}
