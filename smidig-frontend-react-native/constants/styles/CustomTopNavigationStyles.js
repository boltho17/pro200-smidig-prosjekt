import {StyleSheet} from 'react-native'

export const topNavigationStyles = StyleSheet.create({
    topBarContainer: {
        position: 'absolute',
        top: 0,
        height: 100,
        width: '100%',
        paddingTop: 10,
        //backgroundColor: colors.lightGrayTransparent,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    topBarBackground: {
        width: '100%',
        height: 120,
        top: 0,
        position: 'absolute',
    },
    cameraTopBar: {
        display: 'none'
    },
    headerLeft: {
        height: 50,
        width: 50,
        justifyContent: 'center',
    },
    headerRight: {
        height: 50,
        width: 50,
        alignSelf: 'flex-end',
        justifyContent: 'center',
    },
    iconLeftContainer: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconRightContainer: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
});
