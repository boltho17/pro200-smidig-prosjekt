import {StyleSheet} from 'react-native'
import {colors} from '../Colors'

export const tabBarStyles = StyleSheet.create({
    fabBackground: {
        height: 60,
        width: 60,
        borderRadius: 30,
        position: 'absolute',
        alignSelf: 'center',
    },
    fabIcon: {
        position: 'absolute',
        alignSelf: 'center'
    },
    fabContainer: {
        bottom: 30,
        height: 60,
        width: 60,
        alignSelf: 'center',
        justifyContent: 'center',
        flex: 0.3,
        zIndex: 1000
    },
    tabBarStyle: {
        height: 60,
        backgroundColor: 'transparent',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        borderTopWidth: 0
    },
    tabBarItems: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'row',
    },
    tabBarItemContainer: {
        flex: 0.35,
        paddingTop: 5,
        paddingBottom: 10,
        justifyContent: 'flex-end'
    },
    tabBarBackground: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        bottom: 0,
        shadowOffset:{
            width: 0,
            height: 5,
        },
        shadowColor: colors.darkGray,
        shadowOpacity: 1,
        shadowRadius: 5,
        overflow: 'visible'
    },
    notificationContainer: {
        position: 'absolute',
        top: 5,
        alignSelf: 'center',
    },
    notificationNumberContainer: {
        backgroundColor: colors.fabRight,
        height: 15,
        width: 15,
        borderRadius: 7.5,
        marginLeft: 20,
        shadowOffset:{
            width: 0,
            height: 5,
        },
        shadowColor: colors.fabRight,
        shadowOpacity: 0.3,
        shadowRadius: 5
    }
});
