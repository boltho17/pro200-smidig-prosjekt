import {sliderStyles, textStyles} from '../constants/Styles'
import {Text, View} from 'react-native'
import {colors} from '../constants/Colors'
import PropTypes from 'prop-types'
import React, {PureComponent} from 'react'
import {Slider} from 'react-native-elements'

export default class CustomSlider extends PureComponent {

    constructor(props){
        super(props);
        this.state = {
            shouldShowNumber: false,
        }
    }

    showNumber = () => {
        this.setState({shouldShowNumber: true})
    };

    hideNumber = () => {
        this.setState({shouldShowNumber: false})
    };

    setSliderNumberVisibility() {
        if(this.state.shouldShowNumber){
            return {
                opacity: 1
            }
        } else {
            return {
                opacity: 0
            }
        }
    }

    setSliderNumberMargin() {
        let numberOfPossibleMembers = this.props.maximumMembers - this.props.minimumMembers + 1;
        let mainMarginPercentage = 100 / numberOfPossibleMembers;
        let multiplicationFactor = this.props.numberOfMembers - this.props.minimumMembers;
        let margin = mainMarginPercentage * multiplicationFactor;
        return {
            marginLeft: '' + margin + '%'
        }
    }

    changeNumberOfMembers(newNumber) {
        this.props.onChange(newNumber);
    }

    render() {
        let sliderNumber = this.props.numberOfMembers;
        if(this.props.numberOfMembers === 9){
            sliderNumber = '∞'
        }

        return (
            <View style={sliderStyles.sliderSectionContainer}>
                <View style={sliderStyles.sliderNumber}>
                    {!this.props.shouldDisableOnMinNumber ?
                        <Text style={[textStyles.smallerText,
                            textStyles.sliderNumber,
                            textStyles.textAlignRight]}>
                            {this.props.minimumMembers}
                        </Text>
                    : <View/>}

                </View>
                <View style={sliderStyles.sliderContainer}>
                    <View style={[
                        sliderStyles.sliderThumbNumberContainer,
                        this.setSliderNumberMargin()]}>
                        <Text style={[
                            sliderStyles.sliderThumbNumber,
                            textStyles.sliderNumber,
                            this.setSliderNumberVisibility()]}>
                            {sliderNumber}
                        </Text>
                    </View>

                    <Slider
                        thumbTouchSize={{width: 40, height: 40}}
                        thumbStyle={[sliderStyles.sliderThumb,
                            this.props.shouldDisableOnMinNumber &&
                            this.props.numberOfMembers === this.props.minimumMembers ?
                                {backgroundColor: 'white'} :
                                {backgroundColor: colors.fabRight}]}
                        trackStyle={sliderStyles.sliderTrack}
                        minimumTrackTintColor={colors.fabLeft}
                        maximumTrackTintColor={colors.darkGray}
                        maximumValue={this.props.maximumMembers}
                        minimumValue={this.props.minimumMembers}
                        value={this.props.numberOfMembers}
                        step={1}
                        onValueChange={value => this.changeNumberOfMembers(value)}
                        onSlidingStart={this.showNumber}
                        onSlidingComplete={this.hideNumber}
                    />
                </View>
                <View style={sliderStyles.sliderNumber}>
                    {!this.props.shouldDisableOnMinNumber ?
                        <Text style={[textStyles.smallerText,
                            textStyles.sliderNumber,
                            textStyles.textAlignLeft]}>
                            ∞
                        </Text>
                        : <View/>
                    }
                </View>
            </View>
        );
    }
}


CustomSlider.propTypes = {
    onChange: PropTypes.func.isRequired,
    numberOfMembers: PropTypes.number.isRequired,
    maximumMembers: PropTypes.number.isRequired,
    minimumMembers: PropTypes.number.isRequired,
    shouldDisableOnMinNumber: PropTypes.bool,
};

CustomSlider.defaultProps = {
    shouldDisableOnMinNumber: false
};

