import {styles, textStyles} from '../constants/Styles'
import {Text, View, Keyboard} from 'react-native'
import React, {PureComponent} from 'react'
import {Input} from 'react-native-elements'
import {colors} from '../constants/Colors'
import PropTypes from 'prop-types'

export default class InputField extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            shouldShowLabel: false,
            isFocused: false,
        }
    }

    componentDidMount() {
        this.checkFieldInput()
    }

    handleBlur = () => this.setState({isFocused: false});

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

    setText = (text) => {
       this.props.setText(text)
    };

    setFocused = () => {
        this.setState({shouldShowLabel: true, isFocused: true})
    };

    checkFieldInput = () => {
        if(this.props.text === ""){
            this.setState({shouldShowLabel: false})
        } else if(this.props.text !== "" && this.state.shouldShowLabel !== true){
            this.setState({shouldShowLabel: true})
        }
    };

    checkKey = (key) => {
        if(key.nativeEvent.key === 'Enter'){
            Keyboard.dismiss();
        }
    };

    render() {
        return (
            <View style={styles.inputContainer}>
                <Text style={[textStyles.inputLabel, this.setLabelVisibility()]}>
                    {this.props.fieldName}
                </Text>
                <Input
                    ref={ ref => this.input = ref }
                    placeholder={this.props.fieldName}
                    inputStyle={styles.inputField}
                    inputContainerStyle={{borderBottomColor:
                            this.state.isFocused ?
                                colors.darkerGray : colors.darkGray,
                        paddingTop: 5,
                        paddingBottom: 5}}
                    onFocus={ this.setFocused }
                    onBlur={this.handleBlur}
                    onEndEditing={ this.checkFieldInput }
                    onChangeText={ value => this.setText(value)}
                    multiline={this.props.multiline}
                    returnKeyType = { this.props.returnKeyType }
                    value={this.props.text}
                    onKeyPress={(keyPress) => this.checkKey(keyPress)}
                />
            </View>

        )
    }
}

InputField.propTypes = {
    fieldName: PropTypes.string.isRequired,
    multiline: PropTypes.bool,
    returnKeyType: PropTypes.string,
    blurOnSubmit: PropTypes.bool,
    inFocus: PropTypes.string,
    text: PropTypes.string,
    setText: PropTypes.func.isRequired,
};

InputField.defaultProps = {
    returnKeyType: 'done',
    blurOnSubmit: true,
    multiline: false,
    text: ''
};
