
import {Card, Icon} from 'react-native-elements/src/index'
import React, {PureComponent} from 'react'
import {cardStyles, textStyles} from '../../constants/Styles'
import {colors} from '../../constants/Colors'
import {View, TouchableHighlight, Text} from 'react-native'
import PropTypes from 'prop-types'
import CustomModal from '../CustomModal'

export default class ProfilePostCard extends PureComponent {

    constructor(props){
        super(props);
        this.state = {
            isClicked: false,
            showModal: false
        }
    }

    showModal = () => {
        this.setState({showModal: true})
    };

    hideModal = () => {
        this.setState({showModal: false})
    };

    onDelete = () => {
        this.props.onDelete(this.props.group.groupId)
    };

    render() {
        return (
            <View>
                <CustomModal
                    modalVisible={this.state.showModal}
                    onCloseModal={this.hideModal}
                    onYes={this.onDelete}
                    modalText={'Er du sikker på at du vil slette innlegget? Tilhørende chatter vil også bli slettet.'}/>
                <Card containerStyle={cardStyles.cardContainer} >
                    <View>
                        <View style={cardStyles.cardHeader}>
                            <View style={[cardStyles.cardHeaderGroupMembers, {flex: 0.7}]}>
                                <Text style={[
                                    textStyles.cardNumber,
                                    textStyles.textAlignLeft]}>
                                    {this.props.group.participants.length}/{this.props.group.groupSize === -1 ? (<Text>∞</Text>) : this.props.group.groupSize }
                                </Text>
                                <Text style={[
                                    textStyles.cardNumberMembers,
                                    textStyles.textAlignLeft]}>
                                    Medlemmer
                                </Text>
                            </View>
                            <View style={{
                                flex: 0.3,
                                flexDirection: 'row',
                                borderLeftWidth: 0.5,
                                borderLeftColor: colors.darkGray,
                                alignItems: 'flex-end',
                                justifyContent: 'flex-end'}}>
                                <TouchableHighlight
                                    onPress={this.showModal}
                                    underlayColor={colors.lightGray}
                                    activeOpacity={0.3}>
                                    <View style={cardStyles.activePostActionContainer}>
                                        <Icon
                                            name="trash-2"
                                            type="feather"
                                            size={20}
                                            color={colors.darkerGray}
                                            containerStyle={{marginBottom: 5}}/>
                                        <Text style={[textStyles.cardNumberMembers,
                                            textStyles.textAlignCenter, {color: colors.darkerGray}]}>Slett</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </View>
                        <View style={cardStyles.cardContent}>
                            <Text style={textStyles.cardHeader}>
                                {this.props.group.course}
                            </Text>
                            <Text style={textStyles.mainText}>
                                {this.props.group.description}
                            </Text>
                        </View>
                    </View>
                </Card>
            </View>

        );
    }
}

ProfilePostCard.propTypes = {
    group: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired
};

