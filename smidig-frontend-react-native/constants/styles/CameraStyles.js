import {StyleSheet} from 'react-native'
import {colors} from '../Colors'

export const cameraStyles = StyleSheet.create({
    cameraTopBar: {
        position: 'absolute',
        top: 0,
        height: 80,
        width: '100%',
        backgroundColor: colors.darkerGrayTransparent,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    exitTouchableContainer: {
        flex: 0.5,
        alignSelf: 'center',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingLeft: 20,
    },
    flipTouchableContainer: {
        flex: 0.5,
        alignSelf: 'center',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingRight: 20,
    },
    cameraBottomBar: {
        position: 'absolute',
        bottom: 0,
        height: 80,
        width: '100%',
        backgroundColor: colors.darkerGrayTransparent,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cameraSnapButton: {
        borderColor: 'white',
        borderWidth: 2,
        width: 60,
        height: 60,
        borderRadius: 30,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
