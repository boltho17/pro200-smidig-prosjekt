import React, { PureComponent } from "react";
import { Text, View } from "react-native";
import Swiper from "../components/Swiper";
import {tutorialStyles} from '../constants/styles/TutorialStyles'
import {textStyles} from '../constants/Styles'
import {styles} from '../constants/Styles'
import {Video} from 'expo'


/*
* Code from: https://github.com/aryaminus/RN-intro-screen
* */
export default class Screen extends PureComponent {

    constructor(props){
        super(props);
        this.state = {
            pageIndex: 0
        }
    }

    changeIndex = (newIndex) => {
        this.setState({pageIndex: newIndex})
    };
    render() {
        return (
            <Swiper navigation={this.props.navigation} changeIndex={this.changeIndex}>
                {/* First screen */}
                <View style={tutorialStyles.slide}>
                    <View style={tutorialStyles.animationContainer}>
                        <Video
                            source={require('../assets/animations/tutorial1.mp4')}
                            rate={1.0}
                            isMuted={true}
                            resizeMode="cover"
                            style={{ width: '100%', height: '100%' }}
                            isLooping={true}
                            shouldPlay={this.state.pageIndex === 0}/>
                    </View>
                    <View style={tutorialStyles.textContainer}>
                        <View style={styles.smallerContainer}>
                            <View style={tutorialStyles.headlineContainer}>
                                <Text style={[textStyles.smallerHeadline, textStyles.textAlignCenter, textStyles.colorOrange]}>
                                    Finn andre studenter
                                </Text>
                            </View>
                            <Text style={[textStyles.mainText, textStyles.textAlignCenter]}>
                                Peer gjør det enkelt å finne andre elever som studerer det samme som deg!
                            </Text>
                        </View>
                    </View>
                </View>
                {/* Second screen */}
                <View style={tutorialStyles.slide}>
                    <View style={tutorialStyles.animationContainer}>
                        <Video
                            source={require('../assets/animations/tutorial2.mp4')}
                            rate={1.0}
                            isMuted={true}
                            resizeMode="cover"
                            style={{ width: '100%', height: '100%' }}
                            isLooping={true}
                            shouldPlay={this.state.pageIndex === 1}/>
                    </View>
                    <View style={tutorialStyles.textContainer}>
                        <View style={styles.smallerContainer}>
                            <View style={tutorialStyles.headlineContainer}>
                                <Text style={[textStyles.smallerHeadline, textStyles.textAlignCenter, textStyles.colorOrange]}>
                                    Lag din egen eller bli med i en kollokviegruppe
                                </Text>
                            </View>
                            <Text style={[textStyles.mainText, textStyles.textAlignCenter]}>
                                Peer gjør det enkelt å finne andre elever som studerer det samme.
                            </Text>
                        </View>
                    </View>
                </View>
                {/* Third screen */}
                <View style={tutorialStyles.slide}>
                    <View style={tutorialStyles.animationContainer}>
                        <Video
                            source={require('../assets/animations/tutorial3.mp4')}
                            rate={1.0}
                            isMuted={true}
                            resizeMode="cover"
                            style={{ height: '100%' }}
                            isLooping={true}
                            shouldPlay={this.state.pageIndex === 2}/>
                    </View>
                    <View style={tutorialStyles.textContainer}>
                        <View style={styles.smallerContainer}>
                            <View style={tutorialStyles.headlineContainer}>
                                <Text style={[textStyles.smallerHeadline, textStyles.textAlignCenter, textStyles.colorOrange]}>
                                    Chat med kollokvie-gruppene dine
                                </Text>
                            </View>
                            <Text style={[textStyles.mainText, textStyles.textAlignCenter]}>
                                    Gjennom gruppechatter kan du snakke med alle i en kollokviegruppe du er medlem i
                            </Text>
                        </View>
                    </View>
                </View>
            </Swiper>
        );
    }
}

