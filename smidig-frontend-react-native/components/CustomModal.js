import React, {PureComponent} from 'react'
import {Modal, Text, View} from 'react-native'
import PropTypes from 'prop-types'
import {textStyles, styles} from '../constants/Styles'
import {Button} from 'react-native-elements'
import CustomButton from './CustomButton'


export default class CustomModal extends PureComponent {


    logOut = () => {
        this.props.onYes()
    };

    closeModal = () => {
        this.props.onCloseModal()
    };

    render() {
        return (
            <Modal
                visible={this.props.modalVisible}
                animationType={'slide'}
                onRequestClose={this.closeModal}
                transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContentContainer}>
                        <Text style={[textStyles.cardHeader, textStyles.textAlignCenter]}>
                            {this.props.modalText}
                        </Text>
                        <View style={styles.modalButtonRow}>
                            <Button
                                onPress={this.logOut}
                                title={'Ja'}
                                titleStyle={[textStyles.cardNumberMembers, textStyles.textAlignCenter]}
                                containerStyle={styles.modalButtonContainer}
                                buttonStyle={styles.modalButton}
                            />
                            <View style={styles.modalGradientButtonContainer}>
                                <CustomButton text={'Nei'} onClick={this.closeModal}/>
                            </View>

                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}


CustomModal.propTypes = {
    modalVisible: PropTypes.bool.isRequired,
    modalText: PropTypes.string.isRequired,
    onYes: PropTypes.func.isRequired,
    onCloseModal: PropTypes.func.isRequired
};

