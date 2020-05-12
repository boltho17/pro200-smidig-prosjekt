import {colors} from '../constants/Colors'
import {Text, View, TouchableWithoutFeedback, AsyncStorage} from 'react-native'
import {textStyles} from '../constants/Styles'
import React, {PureComponent} from 'react'
import {Icon} from 'react-native-elements'
import PropTypes from 'prop-types'


export default class CustomChip extends PureComponent {

    onDelete = () => {
        this.props.onDelete(this.props.chipIndex);
    };



    getCorrectText = () => {
        if(this.props.chipIndex === 0){
            return 'Skole: ' + this.props.chipValue
        } else if(this.props.chipIndex === 1){
            return 'Antall: ' + this.props.chipValue
        } else {
            return 'Søk: ' + this.props.chipValue
        }
    };

    render() {

        return (
            <TouchableWithoutFeedback onPress={this.onDelete}>
                <View style={{
                    backgroundColor: colors.fabLeft,
                    height: 40,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: 25,
                    paddingLeft: 5,
                    paddingRight: 10,
                    marginRight: 5,
                    marginBottom: 5
                }}>
                    <Icon
                        name='x'
                        type='feather'
                        size={20}
                        color={'white'}
                        containerStyle={{marginRight: 5}}/>
                    <Text style={[
                        textStyles.mainText,
                        textStyles.textWhite,
                        {fontSize: 12}]}>
                        {this.getCorrectText()}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

CustomChip.propTypes = {
    chipIndex: PropTypes.number.isRequired,
    chipValue: PropTypes.string,
    onDelete : PropTypes.func.isRequired
};
