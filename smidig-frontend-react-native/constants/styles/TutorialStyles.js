import {Dimensions, StyleSheet} from 'react-native'
import {colors} from '../Colors'

const { width, height } = Dimensions.get("window");


export const tutorialStyles = StyleSheet.create({
    slide: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: colors.lightGray
    },
    animationContainer: {
        flex: 0.55,
        width: '100%',
        backgroundColor: colors.lightGray,
    },
    textContainer: {
        flex: 0.45,
        flexDirection: 'column',
        width: '100%',
    },
    headlineContainer: {
        marginTop: 20,
        marginBottom: 30,
    },
    fullScreen: {
        width: width,
        height: height
    },
    container: {
        backgroundColor: "transparent",
        position: "relative"
    },
    pagination: {
        position: "absolute",
        bottom: 25,
        left: 0,
        right: 0,
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-end",
        backgroundColor: "transparent"
    },
    dot: {
        backgroundColor: colors.mediumGray,
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3
    },
    activeDot: {
        backgroundColor: colors.fabLeft
    },
    buttonWrapper: {
        backgroundColor: "transparent",
        flexDirection: "column",
        position: "absolute",
        bottom: 60,
        left: 0,
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: "flex-end",
        alignItems: "center"
    }
});

