import React, {PureComponent} from 'react'
import GradientButton from 'react-native-gradient-buttons/src/index'
import {Text} from 'react-native'
import {styles, textStyles} from '../constants/Styles'
import {colors} from '../constants/Colors'
import PropTypes from 'prop-types'


export default class CustomButton extends PureComponent {

    constructor(props){
        super(props);
        this.state = {
            isClicked: false,
        }
    }

    clickButton = () => {
        this.setState({isClicked: true});
        this.props.onClick();
    };

    render() {
        return (
            <GradientButton
                disabled={(
                    !!(this.props.shouldDisable
                    && this.state.isClicked)
                        || this.props.isDisabled)}
                disabledGradientBegin={colors.disabledGradientLeft}
                disabledGradientEnd={colors.disabledGradientRight}
                gradientBegin={colors.gradientLeft}
                gradientEnd={colors.gradientRight}
                gradientDirection="diagonal"
                height={50}
                width={'100%'}
                style={this.state.isClicked && this.props.shouldDisable ?
                    styles.disabledButtonStyle :
                    styles.buttonStyle}
                radius={30}
                onPressAction={this.clickButton}>
                <Text style={this.state.isClicked && this.props.shouldDisable ?
                    textStyles.disabledButtonText :
                    textStyles.buttonText}>
                        {(this.state.isClicked
                            && this.props.shouldDisable)
                        || this.props.isDisabled ?
                        this.props.clickedText :
                        this.props.text}
                </Text>
            </GradientButton>
        );
    }
}

CustomButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    clickedText: PropTypes.string,
    shouldDisable: PropTypes.bool,
    isDisabled: PropTypes.bool,
};

CustomButton.defaultProps = {
    shouldDisable: false,
    isDisabled: false,
};

