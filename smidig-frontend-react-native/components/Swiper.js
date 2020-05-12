

import React, { PureComponent } from "react";
import { Dimensions, Platform, ScrollView, View } from "react-native";
import CustomButton from './CustomButton'
import {tutorialStyles} from '../constants/styles/TutorialStyles'


const { width, height } = Dimensions.get("window");


export default class Swiper extends PureComponent {

    // Props for ScrollView component
    static defaultProps = {
        horizontal: true,
        pagingEnabled: true,
        showsHorizontalScrollIndicator: false,
        showsVerticalScrollIndicator: false,
        bounces: false,
        scrollsToTop: false,
        removeClippedSubviews: true,
        automaticallyAdjustContentInsets: false,
        index: 0
    };

    state = this.initState(this.props);


    initState(props) {
        const total = props.children ? props.children.length || 1 : 0,
            index = total > 1 ? Math.min(props.index, total - 1) : 0,
            offset = width * index;

        const state = {
            total,
            index,
            offset,
            width,
            height
        };

        this.internals = {
            isScrolling: false,
            offset
        };

        return state;
    }

    onScrollBegin = e => {
        this.internals.isScrolling = true;
    };

    onScrollEnd = e => {
        this.internals.isScrolling = false;
        this.updateIndex(
            e.nativeEvent.contentOffset
                ? e.nativeEvent.contentOffset.x
                : e.nativeEvent.position * this.state.width
        );
    };

    onScrollEndDrag = e => {
        const { contentOffset: { x: newOffset } } = e.nativeEvent,
            { children } = this.props,
            { index } = this.state,
            { offset } = this.internals;
        if (offset === newOffset &&
            (index === 0 || index === children.length - 1)) {
            this.internals.isScrolling = false;
        }
    };


    updateIndex = offset => {
        const state = this.state,
            diff = offset - this.internals.offset,
            step = state.width;
        let index = state.index;
        if (!diff) {
            return;
        }
        index = parseInt(index + Math.round(diff / step), 10);
        this.internals.offset = offset;
        this.props.changeIndex(index);
        this.setState({
            index
        });
    };


    swipe = () => {
        if (this.internals.isScrolling || this.state.total < 2) {
            return;
        }
        const state = this.state,
            diff = this.state.index + 1,
            x = diff * state.width,
            y = 0;
        this.scrollView && this.scrollView.scrollTo({ x, y, animated: true });
        this.internals.isScrolling = true;
        if (Platform.OS === "android") {
            setImmediate(() => {
                this.onScrollEnd({
                    nativeEvent: {
                        position: diff
                    }
                });
            });
        }
    };


    renderScrollView = pages => {
        return (
            <ScrollView
                ref={component => {
                    this.scrollView = component;
                }}
                {...this.props}
                contentContainerStyle={[tutorialStyles.wrapper, this.props.style]}
                onScrollBeginDrag={this.onScrollBegin}
                onMomentumScrollEnd={this.onScrollEnd}
                onScrollEndDrag={this.onScrollEndDrag}>
                {pages.map((page, i) => (
                    // Render each slide inside a View
                    <View style={[tutorialStyles.fullScreen]} key={i}>
                        {page}
                    </View>
                ))}
            </ScrollView>
        );
    };


    renderPagination = () => {
        if (this.state.total <= 1) {
            return null;
        }
        const ActiveDot = <View style={[tutorialStyles.dot, tutorialStyles.activeDot]} />,
            Dot = <View style={tutorialStyles.dot} />;
        let dots = [];
        for (let key = 0; key < this.state.total; key++) {
            dots.push(
                key === this.state.index
                    ?
                    React.cloneElement(ActiveDot, { key })
                    :
                    React.cloneElement(Dot, { key })
            );
        }
        return (
            <View pointerEvents="none" style={[tutorialStyles.pagination, tutorialStyles.fullScreen]}>
                {dots}
            </View>
        );
    };


    navigateToLogin = () => {
        this.props.navigation.navigate("Login")
    };

    renderButton = () => {
        const lastScreen = this.state.index === this.state.total - 1;
        return (
            <View
                pointerEvents="box-none"
                style={[tutorialStyles.buttonWrapper, tutorialStyles.fullScreen]}>
                {lastScreen ? (
                    <CustomButton
                        text="Kom i gang"
                        onClick={this.navigateToLogin}/>
                ) : (
                    <CustomButton text="Neste" onClick={this.swipe} />
                )}
            </View>
        );
    };

    render = ({ children } = this.props) => {
        return (
            <View style={[tutorialStyles.container, tutorialStyles.fullScreen]}>
                {this.renderScrollView(children)}
                {this.renderButton()}
                {this.renderPagination()}
            </View>
        );
    };
}

