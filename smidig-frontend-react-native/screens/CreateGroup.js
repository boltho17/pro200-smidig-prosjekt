import React, {PureComponent} from 'react';
import { Text, View } from 'react-native';
import {styles, textStyles} from '../constants/Styles';
import InputField from '../components/InputField'
import CustomButton from '../components/CustomButton'
import CustomSlider from '../components/CustomSlider';
import { NavigationActions } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Auth from '../utils/Auth';
import LottieView from 'lottie-react-native';
import {colors} from '../constants/Colors'


export default class CreateGroup extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            numberOfMembers: 2,
            courseText: '',
            descriptionText: '',
            showSavedPage: false,
            success: false,
            showErrorMessage: false,
        }
    }


    setCourseText = (text) => {
        this.setState({courseText: text})
    };

    setDescriptionText = (text) => {
        this.setState({descriptionText: text})
    };

    onSaveButtonClick = () => {
        const token = Auth.getJWTToken();
        const data = JSON.stringify({
            description: this.state.descriptionText,
            course: this.state.courseText,
            groupSize: (this.state.numberOfMembers === 9 ? -1 : this.state.numberOfMembers),
        });

        if(this.state.courseText.length > 0 &&
            this.state.descriptionText.length > 0) {
            fetch('https://smidig-backend.herokuapp.com/api/group', {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token},
                body: data
            })
                .then(response => response.json())
                .catch(error => {
                    this.setState({
                        descriptionText: '',
                        courseText: '',
                        numberOfMembers: 2,
                        showSavedPage: true,
                        success: false,
                        showErrorMessage: false,
                    })
                })
                .then(responseInJson => {
                    this.setState({
                        descriptionText: '',
                        courseText: '',
                        numberOfMembers: 2,
                        showSavedPage: true,
                        success: true,
                        showErrorMessage: false,
                    });
                });
        } else {
            this.setState({ showErrorMessage: true })
        }
  };


    onSliderChange = (newValue) => {
    this.setState({numberOfMembers: newValue})
  };

  onCloseButtonClick = () => {
      const navigateAction = NavigationActions.navigate({
          routeName: 'Feed',
          params: {},
      });
      this.props.navigation.dispatch(navigateAction);
      this.setState({showSavedPage: false})
  };

    renderErrorMessage() {
        if(this.state.showErrorMessage){
            return (
                <View style={{marginTop: 15}}>
                    <Text style={[textStyles.mainText, textStyles.textAlignCenter, {color: colors.fabRight}]}>
                        * Du må fylle ut alle felter! *
                    </Text>
                </View>
            )
        } else {
            return(
                <View/>
            )
        }
    }

  renderCreatePage() {
    return (
        <KeyboardAwareScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}>
            <View style={styles.smallerContainer}>
                <Text
                    style={[textStyles.mainText, textStyles.textAlignCenter]}>
                    Velg maks antall gruppemedlemmer(inkludert deg selv).
                    Velg "infinite" om det ikke spiller noen rolle.
                </Text>
            </View>

            <CustomSlider
                onChange={this.onSliderChange}
                numberOfMembers={this.state.numberOfMembers}
                maximumMembers={9}
                minimumMembers={2}/>

            <InputField
                fieldName='Emne/fag'
                setText={this.setCourseText}
                text={this.state.courseText}
                multiline={false}/>
          <InputField
              fieldName='Beskrivelse'
              setText={this.setDescriptionText}
              text={this.state.descriptionText}
              multiline={true}/>
            {this.renderErrorMessage()}
          <View style={[styles.bigMarginBottom, {marginTop: 40}]}>
            <CustomButton text={'Lagre'} onClick={this.onSaveButtonClick}/>
          </View>

        </KeyboardAwareScrollView>
    );
  }


  renderSavedPage() {
    return (
        <View style={[styles.container, styles.contentContainerWithoutTop]}>
            <View style={styles.smallerContainer}>
                {this.state.success ?
                    <View style={{marginTop: 80}}>
                        <LottieView source={require('../assets/animations/saved.json')}
                                    style={{height: 250, marginBottom: 20, alignSelf: 'center'}}
                                    autoPlay={true}
                                    loop={false} />

                        <Text
                            style={[textStyles.headline, textStyles.textAlignCenter]}>
                            Lagret!
                        </Text>
                        <Text
                            style={[textStyles.mainText, textStyles.textAlignCenter]}>
                            Bra jobba! Gruppen er lagt til, og andre vil nå kunne sende forespørsler om å bli med.
                        </Text>
                    </View>
                    :
                    <Text
                        style={[textStyles.headline, textStyles.textAlignCenter]}>
                        Det gikk ikke :(
                    </Text>
                }

            </View>
            <View style={{marginTop: 40}}>
                <CustomButton text={'Lukk'} onClick={this.onCloseButtonClick}/>
            </View>
        </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.showSavedPage ? this.renderSavedPage() : this.renderCreatePage()}
      </View>
    );
  }

}

