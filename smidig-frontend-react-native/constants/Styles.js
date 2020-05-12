import {StyleSheet} from 'react-native'
import {colors} from './Colors'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightGray
    },
    feedContainer: {
        paddingTop: 110,
    },
    contentContainer: {
        paddingTop: 110,
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'center',
        flexDirection: 'column',
    },
    contentContainerWithoutTop: {
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'center',
        flexDirection: 'column',
    },
    conversationsContainer:{
        marginTop: 30
    },
    smallerContainer: {
        width: '80%',
        alignSelf: 'center',
    },
    inputContainer: {
        marginTop: 30,
        width: '100%',
    },
    inputField: {
        fontFamily: 'circular-book',
        backgroundColor: 'transparent',
        marginLeft: 10,
        marginRight: 10
    },
    topBar: {
        height: 80,
        backgroundColor: colors.lightGrayTransparent,
        borderBottomColor: 'transparent',
        borderBottomWidth: 0,
    },
    bigMarginBottom: {
        marginBottom: 120
    },
    buttonStyle: {
        alignSelf: 'center',
        shadowOffset:{
            width: 0,
            height: 5,
        },
        shadowColor: colors.fabRight,
        shadowOpacity: 0.3,
        shadowRadius: 5
    },
    disabledButtonStyle: {
        alignSelf: 'center',
        shadowOpacity: 0,
    },
    modalContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: colors.darkerGrayTransparent
    },
    modalContentContainer: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20
    },
    modalButtonRow: {
        flexDirection: 'row',
        marginTop: 20
    },
    modalButtonContainer: {
        flex: 0.5,
        paddingLeft: 5,
        paddingRight: 5,
        height: 50
    },
    modalButton: {
        backgroundColor: 'white',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: colors.fabRight,
        height: '100%'
    },
    modalGradientButtonContainer: {
        flex: 0.5,
        paddingLeft: 5,
        paddingRight: 5
    }
});

export const chatInputStyles = StyleSheet.create({
    chatInputSection: {
        width: '100%',
        backgroundColor: 'white',
        padding: 10,
        flexDirection: 'row'
    },
    chatInput: {
        fontFamily: 'circular-book',
        fontSize: 15,
        display: 'flex',
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: 'transparent',
    },
    chatInputContainer: {
        borderRadius: 20,
        borderBottomWidth: 0,
        backgroundColor: colors.lightGray,
        paddingLeft: 10,
        paddingRight: 10
    },
    chatSendButtonContainer: {
        flex: 0.2,
        alignSelf: 'flex-end'
    }
});

export const sliderStyles= StyleSheet.create({
    sliderSectionContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        marginTop: 20,
        marginBottom: 20,
    },
    sliderContainer: {
        flex: 0.8,
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'column',
    },
    sliderThumbNumberContainer: {
        width: '100%'
    },
    sliderThumbNumber: {
        alignSelf: 'flex-start',
        width: '12.5%',
        textAlign: 'center',
    },
    sliderThumb: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: colors.fabRight,
        shadowOffset:{  width: 0,  height: 8,  },
        shadowColor: colors.fabRight,
        shadowOpacity: 0.5,
        shadowRadius: 5
    },
    sliderTrack: {
        height: 2
    },
    sliderNumber: {
        alignSelf: 'flex-end',
        paddingBottom: 10,
        flex: 0.1,
    }
});


export const cardStyles = StyleSheet.create({
    cardContainer: {
        borderRadius: 20,
        padding: 20,
        marginBottom: 10,
        shadowColor: colors.mediumGray,
        shadowOffset: {
            width: -10,
            height: 10
        },
        shadowRadius: 10
    },
    cardHeader: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: colors.mediumGray,
        alignItems: 'center',
        paddingBottom: 15
    },
    cardFooter:{
        borderTopWidth: 0.5,
        borderTopColor: colors.mediumGray,
        paddingTop: 15,
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardHeaderUserInfo: {
        flex: 0.5,
        alignItems: 'flex-start',
        paddingLeft: 10
    },
    cardHeaderGroupMembers: {
        flex: 0.3,
        textAlign: 'right',
    },
    cardContent: {
        paddingTop: 10,
        flexDirection: 'column'
    },
    userPicContainer: {
        flex: 0.2,
    },
    userPic: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'white',
        resizeMode: 'cover',
        borderColor: colors.fabLeft,
        borderWidth: 2,
    },
    membersSectionContainer: {
        marginTop: 30,
        marginBottom: 30
    },
    membersContainer:{
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    singleMember:{
        flex: 0.33,
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: 10,
        paddingLeft: 5,
        paddingRight: 5,
    },
    memberPic: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'white',
        resizeMode: 'cover',
        alignSelf: 'center',
        marginBottom: 10,
    },
    activePostActionContainer: {
        flexDirection: 'column',
        paddingLeft: 15,
        paddingRight: 15,
    }
});

export const textStyles = StyleSheet.create({
    colorOrange: {
        color: colors.fabRight,
    },
    headline: {
        fontSize: 30,
        fontFamily: 'circular-book',
        paddingTop: 10,
        paddingBottom: 10
    },
    cardUserName: {
        fontSize: 15,
        fontFamily: 'circular-book',
        color: colors.darkGray,
    },
    cardUserFieldOfStudy:{
        fontSize: 10,
        textTransform: 'uppercase',
        fontFamily: 'circular-bold',
        color: colors.darkGray
    },
    cardNumber: {
        fontSize: 20,
        textAlign: 'right',
        fontFamily: 'circular-bold',
        color: colors.fabRight
    },
    cardNumberMembers: {
        fontSize: 10,
        textAlign: 'right',
        textTransform: 'uppercase',
        fontFamily: 'circular-bold',
        color: colors.fabRight
    },
    cardHeader: {
        fontSize: 20,
        paddingBottom: 10,
        fontFamily: 'circular-bold',
    },
    mainText: {
        fontSize: 15,
        lineHeight: 22,
        color: colors.darkGray,
        fontFamily: 'circular-book',
    },
    biggerMainText: {
        fontSize: 18,
    },
    biggerBoldDarkMainText: {
        fontSize: 18,
        color: colors.darkerGray,
        fontFamily: 'circular-bold'
    },
    smallerHeadline: {
        fontSize: 25,
        fontFamily: 'circular-book'
    },
    boldSmallText: {
        fontSize: 12,
        color: colors.darkerGray,
        fontFamily: 'circular-bold'
    },
    memberName: {
        fontSize: 10,
        color: colors.fabRight,
        fontFamily: 'circular-bold',
        textAlign: 'center',
        width: '100%',
    },
    memberInfo: {
        fontSize: 10,
        color: colors.darkGray,
        fontFamily: 'circular-book',
        textAlign: 'center',
        width: '100%',
    },
    buttonText: {
        fontSize: 10,
        color: 'white',
        fontFamily: 'circular-bold',
        textAlign: 'center',
        width: '100%',
        textTransform: 'uppercase'
    },
    disabledButtonText: {
        fontSize: 10,
        color: colors.darkGray,
        fontFamily: 'circular-bold',
        textAlign: 'center',
        width: '100%',
        textTransform: 'uppercase'
    },
    smallerText: {
        fontSize: 12,
        lineHeight: 20,
        color: colors.darkerGray,
        fontFamily: 'circular-book',
        flex: 0.1,
        alignSelf: 'center'
    },
    sliderNumber: {
        paddingLeft: 10,
        paddingRight: 10,
        color: colors.darkerGray
    },
    textAlignLeft: {
        textAlign: 'left'
    },
    textAlignRight: {
        textAlign: 'right',
    },
    textAlignCenter: {
        textAlign: 'center'
    },
    textWhite: {
        color: 'white',
    },
    inputLabel: {
        fontFamily: 'circular-bold',
        textTransform: 'uppercase',
        fontSize: 10,
        letterSpacing: 1,
        color: colors.fabLeft,
        paddingLeft: 10,
        paddingRight: 10,
    },
    chatListGroupName: {
        fontSize: 18,
        paddingBottom: 5,
        fontFamily: 'circular-book',
    },
    chatListCourseName: {
        fontSize: 12,
        color: colors.darkerGray,
        fontFamily: 'circular-bold',
    },
    chatListLastMessage: {
        fontSize: 12,
        lineHeight: 20,
        color: colors.darkGray,
        fontFamily: 'circular-book',
    },
    chatUnreadLastMessage: {
        fontSize: 12,
        lineHeight: 20,
        color: colors.darkerGray,
        fontFamily: 'circular-bold',
    },
    chatListTimestamp: {
        fontSize: 15,
        lineHeight: 20,
        color: colors.darkGray,
        fontFamily: 'circular-bold',
    },
    chatListNewMessage: {
        fontFamily: 'circular-bold',
    },
    smallerLineHeight: {
        lineHeight: 18,
    },
    chatBubbleAuthorLeft: {
        alignSelf: 'flex-start',
        color: colors.darkGray,
    },
    chatBubbleAuthorRight: {
        alignSelf: 'flex-end',
        color: colors.darkGray,
    },
    tabBarIconTxt: {
        fontSize: 10,
        color: colors.darkGray,
        fontFamily: 'circular-bold',
        marginTop: 5,
    }
});

export const chatListStyles = StyleSheet.create({
    item: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.mediumGray,
        paddingBottom: 15,
        paddingTop: 15,
    },
    imageContainer: {
        width: 60,
        height: 65,
        alignSelf: 'center'
    },
    chatInfoContainer: {
        flex: 0.8,
        paddingLeft: 10,
        paddingRight: 10,
    },
    lastTimeStampContainer: {
        flex: 0.2,
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        paddingBottom: 5,
    },
    userPic: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'white',
        resizeMode: 'cover',
    },
    singleUserPic: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'white',
        resizeMode: 'cover',
    },
    lastUserPic: {
        borderColor: colors.lightGray,
        borderWidth: 2,
        alignSelf: 'flex-end',
        top: -15,
    },
    secondToLastUserPic: {
        alignSelf: 'flex-start',
    },
    notificationMark: {
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: colors.fabRight
    }
});

export const chatBubbleStyles = StyleSheet.create({
    chatBubbleContainer: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 20,
    },
    sentMessageContainer: {
        justifyContent: 'flex-end',
    },
    receivedMessageContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    bubbleSectionLeft: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flex: 0.9,
    },
    bubbleSectionRight: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        flex: 0.8,
    },
    chatBubbleCard: {
        margin: 0,
        borderWidth: 0,
        borderRadius: 20,
        paddingTop: 8,
        paddingLeft: 10,
        paddingBottom: 8,
        paddingRight: 10,
    },
    sentChatBubbleCard: {
        backgroundColor: colors.fabLeft,
        shadowOffset:{
            width: 0,
            height: 5,
        },
        shadowColor: colors.fabRight,
        shadowOpacity: 0.3,
        shadowRadius: 5
    },
    receivedChatBubbleCard: {
        shadowOffset:{
            width: 0,
            height: 5,
        },
        shadowColor: colors.darkGray,
        shadowOpacity: 0.3,
        shadowRadius: 5
    },
    senderPicContainer: {
        width: 35,
        marginRight: 15,
        justifyContent: 'flex-end',
    },
    chatProfilePic: {
        height: 35,
        width: 35,
        borderRadius: 15,
        resizeMode: 'cover',
    }

});

export const requestStyles = StyleSheet.create({
    item: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.mediumGray,
        paddingBottom: 15,
        paddingTop: 15,
    },
    imageContainer: {
        alignSelf: 'center'
    },
    profilePic: {
        width: 60,
        height: 60,
        borderRadius: 30,
        resizeMode: 'cover'
    },
    requestInfoContainer: {
        flex: 0.6,
        marginLeft: 20,
    },
    acceptButtonContainer: {
        flex: 0.2,
        justifyContent: 'center',
    },
    declineButtonContainer: {
        flex: 0.2,
        justifyContent: 'center',
    },
    buttonIcon: {
        position: 'absolute',
        alignSelf: 'center',
    },
    declineButton: {
        height: 40,
        width: 40,
        alignSelf: 'center',
        borderRadius: 20,
        backgroundColor: 'white',
        shadowOffset:{
            width: 0,
            height: 5,
        },
        shadowColor: colors.darkGray,
        shadowOpacity: 0.3,
        shadowRadius: 5
    }

});

export const profileStyles = StyleSheet.create({
    picContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        alignSelf: 'center'
    },
    profilePic: {
        height: 120,
        width: 120,
        borderRadius: 60,
        resizeMode: 'cover',
    },
    editPicButton: {
        position: 'absolute',
        height: 50,
        width: 50,
        borderRadius: 25,
        bottom: 0,
        right: -20,
        flexDirection: 'column',
        justifyContent: 'center',
        shadowOffset:{
            width: 0,
            height: 5,
        },
        shadowColor: colors.fabRight,
        shadowOpacity: 0.3,
        shadowRadius: 5
    },
    editButtonBackground: {
        height: '100%',
        width: '100%',
        borderRadius: 25
    },
    editIcon: {
        position: 'absolute',
        alignSelf: 'center'
    },
    iconFont: {
        textAlign: 'center',
        flex: 0.2,
        fontFamily: 'font-awesome-regular',
        fontSize: 20,
        color: colors.fabRight,
    },
    infoText: {
        flex: 0.8,
    },
    infoRow: {
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 15,
        width: '90%',
    },
    buttonContainer: {
        marginTop: 15,
        marginBottom: 15,
    },
    postContainer: {
        marginTop: 15,
        marginBottom: 15,
    },
    postsWrapper: {
        marginLeft: 5,
        marginRight: 5,
    }
});
