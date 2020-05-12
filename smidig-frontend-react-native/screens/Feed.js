import React, {PureComponent} from 'react';
import {AsyncStorage, RefreshControl, ScrollView, Text, View} from 'react-native';
import {styles, textStyles} from '../constants/Styles'
import ExpandableCard from '../components/card/ExpandableCard'
import CustomChip from '../components/CustomChip'
import Auth from '../utils/Auth'
import SockJS from "sockjs-client";
import Stomp from "stomp-websocket";
import jwtDecode from 'jwt-decode';

export default class Feed extends PureComponent {

    //TODO: 1 - Pagination i feed for å hente flere grupper ved scrolling

    constructor(props) {
        super(props);
        this.state = {
            apiResponse: "",
            waiting: true,
            refreshing: false,
            errorMessage: 'Waiting for data',
            filterSchool: null,
            filterMaxSize: null,
            filterFreeText: null,
            currentUser: null
        }
    }

    async componentDidMount() {
        await this._retrieveFilter();

        if (this.state.filterSchool === null &&
            this.state.filterMaxSize === null &&
            this.state.filterFreeText === null) {
            this.getAsyncJobBackend()
        } else {
            this.getAsyncFilteredPosts()
        }

        this.getConnection()
    }

    componentWillUnmount() {
        this.socket.close()
    }

    getCurrentUser = async () => {
        this.setState({currentUser: jwtDecode(await Auth.getJWTToken()).sub.toString()})
    };

    getConnection = () => {
        this.getCurrentUser();
        this.socket = new SockJS("https://smidig-backend.herokuapp.com/ws");
        this.stompClient = Stomp.over(this.socket);
        this.stompClient.debug = null;
        this.stompClient.connect({'Authorization': 'Bearer ' + Auth.getJWTToken()}, () => {
            this.stompClient.subscribe("/queue/notification/" + this.state.currentUser, msg => {
                const messageBody = JSON.parse(msg.body);

                if (messageBody.type==='CREATED_GROUP' || messageBody.type==='DELETED_GROUP') {
                    this._onRefreshWithFilter()
                }
            }, (error) => {
                console.log(error)
            })
        }, (error => {
            console.log(error)
        }))
    };

    async componentDidUpdate(prevProps, prevState, snapshot) {
        let filter = this.props.navigation.getParam('filter');
        let oldFilterParam = prevProps.navigation.getParam('filter');
        if (filter !== undefined && oldFilterParam !== filter) {
            this.setState({
                filterSchool: filter.school,
                filterMaxSize: filter.maxSize,
                filterFreeText: filter.freeText
            })
        }
        if (this.state.filterSchool === null &&
            this.state.filterMaxSize === null &&
            this.state.filterFreeText === null) {
            if (prevState.filterSchool !== this.state.filterSchool ||
                prevState.filterMaxSize !== this.state.filterMaxSize ||
                prevState.filterFreeText !== this.state.filterFreeText) {
                this._onRefresh()
            }
        } else if (this.state.filterSchool !== null ||
            this.state.filterMaxSize !== null ||
            this.state.filterFreeText !== null) {
            if (prevState.filterSchool !== this.state.filterSchool ||
                prevState.filterMaxSize !== this.state.filterMaxSize ||
                prevState.filterFreeText !== this.state.filterFreeText) {
                this._onRefreshWithFilter()
            }
        }

    }

    _retrieveFilter = async () => {
        try {
            const value = await AsyncStorage.getItem('filter');
            if (value !== null) {
                let filter = JSON.parse(value);
                this.setState({
                    filterSchool: filter.school,
                    filterMaxSize: filter.maxSize,
                    filterFreeText: filter.freeText
                })
            }

        } catch (error) {
            // Error retrieving data
        }
    };

    _storeFilter = async (filter) => {
        try {
            let filterString = JSON.stringify(filter);
            await AsyncStorage.mergeItem('filter', filterString);
            if (filter.school !== null ||
                filter.maxSize !== null ||
                filter.freeText !== null) {
            }
        } catch (error) {
            console.log(error)
        }
    };

    _removeFilterOption = (index) => {
        if (index === 0) {
            let filter = {
                school: null,
                maxSize: this.state.filterMaxSize,
                freeText: this.state.freeText
            };
            this._storeFilter(filter);
            this.setState({filterSchool: null})
        } else if (index === 1) {
            let filter = {
                school: this.state.filterSchool,
                maxSize: null,
                freeText: this.state.freeText
            };
            this._storeFilter(filter);
            this.setState({filterMaxSize: null})
        } else {
            let filter = {
                school: this.state.filterSchool,
                maxSize: this.state.filterMaxSize,
                freeText: null
            };
            this._storeFilter(filter);
            this.setState({filterFreeText: null})
        }
    };

    _onRefresh = () => {
        this.setState({waiting: true});
        this.getAsyncJobBackend()
    };

    _onRefreshWithFilter = () => {
        this.setState({waiting: true});
        this.getAsyncFilteredPosts()
    };

    getAsyncFilteredPosts = () => {
        let filter = {
            school: this.state.filterSchool,
            maxSize: this.state.filterMaxSize,
            freeText: this.state.filterFreeText
        };
        fetch('https://smidig-backend.herokuapp.com/api/group/filter', {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + Auth.getJWTToken()},
            body: JSON.stringify(filter)
        })
            .then(response => response.json())
            .then(responseJson => {
                responseJson.error !== undefined ?
                    this.setState({errorMessage: responseJson.error})
                    :
                    this.setState({waiting: false, apiResponse: responseJson})
            })
            .catch(error => {
                console.log(error)
            })
    };


    getAsyncJobBackend = () => {
        fetch('https://smidig-backend.herokuapp.com/api/group/0/50' + '', {
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + Auth.getJWTToken()}
        })
            .then(response => response.json())
            .then(responseJson => {
                    responseJson.error !== undefined ?
                        this.setState({errorMessage: responseJson.error})
                        :
                        this.setState({waiting: false, apiResponse: responseJson})
                }
            )
            .catch(error => {
                this.setState({waiting: true});
            });
    };


    render() {
        let mapOfFilters = [this.state.filterSchool, this.state.filterMaxSize, this.state.filterFreeText];
        let shouldNotShowFilter =
            this.state.filterSchool === null &&
            this.state.filterMaxSize === null &&
            this.state.filterFreeText === null;
        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.feedContainer}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={shouldNotShowFilter ?
                                this._onRefresh :
                                this._onRefreshWithFilter}/>
                    }>
                    {!shouldNotShowFilter ?
                        <View style={styles.contentContainerWithoutTop}>
                            <View style={{marginBottom: 15}}>
                                <Text style={[
                                    textStyles.cardNumberMembers,
                                    textStyles.textAlignLeft]}>
                                    Aktive filtere
                                </Text>
                            </View>
                            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                                {mapOfFilters.map((value, index) => {
                                    if (value !== null) {
                                        let onDelete = this._removeFilterOption;
                                        return (
                                            <CustomChip
                                                key={index}
                                                chipIndex={index}
                                                chipValue={value.toString()}
                                                onDelete={onDelete}/>
                                        )
                                    }
                                })}
                            </View>
                        </View>
                        :
                        <View/>
                    }
                    {!this.state.waiting && this.state.apiResponse.length > 0 ?
                        this.state.apiResponse.map((groupArrayItem) =>
                            <ExpandableCard
                                group={groupArrayItem}
                                key={groupArrayItem.groupId}/>) :
                            <View style={[styles.container, styles.contentContainer]}>
                                <Text style={[textStyles.mainText, textStyles.textAlignCenter]}>
                                    Ingen poster funnet
                                </Text>
                            </View>
                    }
                    <View style={styles.bigMarginBottom}/>
                </ScrollView>
            </View>
        );
    }
}
