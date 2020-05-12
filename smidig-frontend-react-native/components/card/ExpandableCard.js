import {Card} from 'react-native-elements/src/index'
import React, {PureComponent} from 'react'
import {cardStyles} from '../../constants/Styles'
import FeedContent from './FeedContent'
import ExpandedContent from './ExpandedContent'
import {View, TouchableWithoutFeedback} from 'react-native'

export default class ExpandableCard extends PureComponent {

    constructor(props){
        super(props);
        this.state = {
            isClicked: false
        }
    }

    changeState = () => {
      if(this.state.isClicked === false) {this.setState({isClicked: true})}
      else { this.setState({isClicked: false}) }
    };


    render() {
        return (
            <View>
                <TouchableWithoutFeedback onPress={this.changeState}>
                    <Card containerStyle={cardStyles.cardContainer} >
                        {this.state.isClicked ?
                            (<ExpandedContent group={this.props.group} />) :
                            (<FeedContent group={this.props.group}/>)}
                    </Card>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}
