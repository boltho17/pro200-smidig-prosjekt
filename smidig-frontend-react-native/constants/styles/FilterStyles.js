import { StyleSheet } from 'react-native'
import { colors } from '../Colors'

export const filterStyles = StyleSheet.create({
    dropdownContainer: {
        borderBottomColor: colors.darkGray,
        borderBottomWidth: 1,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        padding: 10,
        flexDirection: 'row'
    },
    dropdownContainerText: {
        opacity: 0.9,
        flex: 0.8
    },
    dropdownArrowContainer: {
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
        flex: 0.2
    },
    dropdownListContainer: {
        backgroundColor: 'white',
        width: '95%',
        position: 'absolute',
        top: 60,
        zIndex: 10000,
        alignSelf: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowOffset:{
            width: 0,
            height: 5,
        },
        shadowColor: colors.darkGray,
        shadowOpacity: 0.3,
        shadowRadius: 5
    },
    dropdownItemContainer: {
        padding: 10,
    },
    itemBorderBottom: {
        borderBottomColor: colors.mediumGray,
        borderBottomWidth: 1,
    },
    itemNoBorder: {
        borderBottomWidth: 0,
    },
    infoContainer: {
        marginBottom: 30
    },
    sliderHeadline: {
        marginTop: 40
    }

});
