import {Platform, StatusBar, Text, TouchableWithoutFeedback, View} from 'react-native'
import {filterStyles} from '../constants/styles/FilterStyles'
import {textStyles} from '../constants/Styles'
import {colors} from '../constants/Colors'
import {Icon} from 'react-native-elements'
import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

const Schools = ['Høyskolen Kristiania', 'Universitetet i Oslo'];

export default class SchoolDropdown extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            dropdownOpen: false,
            shouldShowLabel: false,
        }
    }

    componentDidMount() {
        this.checkDropdownSelection();
    }

    openCloseSchoolDropdown = () => {
        if(!this.state.dropdownOpen) {
            this.setState({dropdownOpen: true})
        } else {
            this.setState({dropdownOpen: false})
        }
    };

    checkDropdownSelection = () => {
        if(this.props.schoolChosen === ""){
            this.setState({shouldShowLabel: false})
        } else if(this.props.schoolChosen !== "" && this.state.shouldShowLabel !== true){
            this.setState({shouldShowLabel: true})
        }
    };

    chooseSchool = (index) => {
        console.log("chooseSchool")
        console.log(index)
        console.log(Schools[index])
        this.setState({shouldShowLabel: true});
        this.props.chooseSchool(Schools[index]);
        this.openCloseSchoolDropdown();
    };

    setLabelVisibility(){
        if(!this.state.shouldShowLabel){
            return {
                opacity: 0
            }
        } else {
            return {
                opacity: 1
            }
        }
    }

    renderDropdown = () => {
        if(this.state.dropdownOpen){
            return (
                <View style={filterStyles.dropdownListContainer}>
                    {Schools.map((school, index) => {
                        return (
                            <TouchableWithoutFeedback key={index} onPress={() => this.chooseSchool(index)}>
                                <View style={[
                                    filterStyles.dropdownItemContainer,
                                    Schools.length -1 === index ?
                                        filterStyles.itemNoBorder :
                                        filterStyles.itemBorderBottom]}>
                                    <Text style={[textStyles.mainText, {color: colors.darkerGray}]}>{school}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    })}
                </View>
            )
        } else {
            return <View/>
        }
    };

    render() {
        return (
            <View style={[Platform.OS === 'ios' ? {zIndex: 5000, width: '100%'} : {width: '100%'}]}>
                <Text style={[textStyles.inputLabel, this.setLabelVisibility()]}>
                    Skole
                </Text>
                <TouchableWithoutFeedback onPress={this.openCloseSchoolDropdown}>
                    <View style={filterStyles.dropdownContainer}>
                        <Text style={[
                            textStyles.mainText,
                            textStyles.biggerMainText,
                            filterStyles.dropdownContainerText,
                            this.props.schoolChosen.length > 0 ?
                                {color: colors.darkerGray, opacity: 1} :
                                {color: colors.darkGray, opacity: 0.9}
                        ]}>
                            {this.props.schoolChosen.length > 0 ? this.props.schoolChosen : 'Skole'}
                        </Text>
                        {this.state.dropdownOpen ?
                            <Icon
                                name='chevron-up'
                                type='feather'
                                color={colors.darkGray}
                                containerStyle={filterStyles.dropdownArrowContainer}/>
                            :
                            <Icon
                                name='chevron-down'
                                type='feather'
                                color={colors.darkGray}
                                containerStyle={filterStyles.dropdownArrowContainer}/>}
                    </View>
                </TouchableWithoutFeedback>
                {this.renderDropdown()}
            </View>
        )
    }
}

SchoolDropdown.propTypes = {
    schoolChosen: PropTypes.string.isRequired,
    chooseSchool: PropTypes.func.isRequired
};
