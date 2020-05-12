import {colors} from '../constants/Colors'
import {Text, TouchableWithoutFeedback, View} from 'react-native'
import {Icon} from 'react-native-elements'
import {textStyles} from '../constants/Styles'
import React, {PureComponent} from 'react'
import {NavigationActions} from 'react-navigation'
import PropTypes from 'prop-types'
import {topNavigationStyles} from '../constants/styles/CustomTopNavigationStyles'
import {tabBarStyles} from '../constants/styles/CustomBottomTabStyles'
import {LinearGradient} from 'expo'


export default class CustomTopNavigationBar extends PureComponent {

    navigationLeft = () => {
        const navigateAction = NavigationActions.navigate({
            routeName: this.props.routeLeft,
        });
        this.props.navigation.dispatch(navigateAction);
    };

    navigationRight = () => {
        if(this.props.routeRight === 'LogOut'){
            this.props.navigation.setParams({modalVisible: true})
        } else {
            const navigateAction = NavigationActions.navigate({
                routeName: this.props.routeRight,
            });
            this.props.navigation.dispatch(navigateAction);
        }
    };

    render(){
        return (
            <View style={
                this.props.isCameraBar ?
                    topNavigationStyles.cameraTopBar :
                    topNavigationStyles.topBarContainer}>
                <LinearGradient
                    colors={[colors.lightGray, colors.transparent]}
                    style={topNavigationStyles.topBarBackground}
                    start={[0.5, 0.6]}/>
                <View style={{flex: 0.2,}}>
                    <TouchableWithoutFeedback onPress={this.navigationLeft}>
                        <View style={topNavigationStyles.headerLeft}>
                            <Icon
                                containerStyle={topNavigationStyles.iconLeftContainer}
                                size={25}
                                color={colors.darkerGray}
                                name={this.props.iconLeftName}
                                type={this.props.iconLeftType}/>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={{flex: 0.6}}>
                    <Text style={[
                        this.props.isSmallerHeadline ?
                            textStyles.smallerHeadline :
                            textStyles.headline,
                        textStyles.textAlignCenter]}>
                        {this.props.headline}
                    </Text>
                </View>
                <View style={{flex: 0.2}}>
                    <TouchableWithoutFeedback onPress={this.navigationRight}>
                        <View style={topNavigationStyles.headerRight}>
                            <Icon
                                containerStyle={topNavigationStyles.iconRightContainer}
                                size={25}
                                color={colors.darkerGray}
                                name={this.props.iconRightName}
                                type={this.props.iconRightType}/>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        )
    }
}

CustomTopNavigationBar.propTypes = {
    navigation: PropTypes.object.isRequired,
    routeLeft: PropTypes.string,
    iconLeftName: PropTypes.string,
    iconLeftType: PropTypes.string,
    headline: PropTypes.string.isRequired,
    routeRight: PropTypes.string,
    iconRightName: PropTypes.string,
    iconRightType: PropTypes.string,
    isSmallerHeadline: PropTypes.bool,
    isCameraBar: PropTypes.bool,
};

CustomTopNavigationBar.defaultProps = {
    routeLeft: null,
    iconNameLeft: null,
    iconTypeLeft: null,
    routeRight: null,
    iconRightName: null,
    iconRightType: null,
    isSmallerHeadline: false,
    isCameraBar: false,
};
