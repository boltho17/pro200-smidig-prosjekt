import React, {PureComponent} from 'react';
import { ScrollView, Text, View } from 'react-native';
import {styles, textStyles} from '../constants/Styles'
import CustomSlider from '../components/CustomSlider'
import CustomButton from '../components/CustomButton'
import InputField from '../components/InputField'
import {filterStyles} from '../constants/styles/FilterStyles'
import SchoolDropdown from '../components/SchoolDropdown'
import {NavigationActions} from "react-navigation"
import {AsyncStorage} from 'react-native';
import{colors} from '../constants/Colors'


export default class Filter extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            school: '',
            numberOfMembers: 1,
            dropdownOpen: false,
            searchWords: '',
        }
    }

    async componentDidMount() {
        await this._retrieveFilter()
    }

    setNumberOfMembers = (newValue) => {
        this.setState({ numberOfMembers: newValue })
    };

    setSearchWords = (words) => {
        this.setState({searchWords: words})
    };

    chooseSchool = (selected) => {
        this.setState({school: selected})
    };

    _retrieveFilter = async () => {
        try {
            const value = await AsyncStorage.getItem('filter');
            if (value !== null) {
                let filter = JSON.parse(value);
                this.setState({
                    school: filter.school === null ? '' : filter.school,
                    numberOfMembers: filter.maxSize === null ? 1 : filter.maxSize,
                    searchWords: filter.freeText === null ? '' : filter.freeText
                })
            }

        } catch (error) {
            // Error retrieving data
        }
    };

    _storeFilter = async (filter) => {
        try {
            let filterString = JSON.stringify(filter);
            await AsyncStorage.setItem('filter', filterString)
        } catch (error) {
            console.log(error)
        }
    };

    saveFilterOptions = async () => {
        let school = this.state.school.length > 0 ? this.state.school : null;
        let maxSize = this.state.numberOfMembers > 1 ? this.state.numberOfMembers : null;
        let freeText = this.state.searchWords.length > 0 ? this.state.searchWords : null;
        let filter = {
            school: school,
            maxSize: maxSize,
            freeText: freeText
        };
        await this._storeFilter(filter);
        const navigateAction = NavigationActions.navigate({
            routeName: 'Feed',
            params: {filter},
        });
        this.props.navigation.dispatch(navigateAction);
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container}
                            contentContainerStyle={styles.contentContainer}>
                    <View style={[styles.smallerContainer, filterStyles.infoContainer]}>
                        <Text style={[textStyles.mainText, textStyles.textAlignCenter]}>
                            Se bare de postene du vil se ved å bruke filtreringen nedenfor
                        </Text>
                    </View>
                    <SchoolDropdown schoolChosen={this.state.school} chooseSchool={this.chooseSchool}/>
                    <View style={{width: '100%', zIndex: -1, marginBottom: 20}}>
                        <InputField
                            fieldName={'Skriv inn nøkkelord'}
                            setText={this.setSearchWords}
                            text={this.state.searchWords}/>

                        <View style={filterStyles.sliderHeadline}>
                            <Text style={[
                                textStyles.inputLabel,
                                textStyles.textAlignCenter,
                                this.state.numberOfMembers === 1 ?
                                    { color: colors.darkGray } :
                                    { color: colors.fabRight }]}>
                                Maks antall gruppemedlemmer
                            </Text>
                        </View>
                        <CustomSlider
                            maximumMembers={9}
                            minimumMembers={1}
                            numberOfMembers={this.state.numberOfMembers}
                            onChange={this.setNumberOfMembers}
                            shouldDisableOnMinNumber={true}/>
                    </View>
                    <CustomButton
                        text={ 'Filtrer' }
                        onClick={this.saveFilterOptions}/>
                </ScrollView>
            </View>
        );
    }
}
