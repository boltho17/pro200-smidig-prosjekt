import {createAppContainer, createSwitchNavigator} from "react-navigation";
import Login from "../screens/Login";
import AppNavigator from "./AppNavigator";
import Tutorial from '../screens/Tutorial'


const tutorialSwitchNavigator = createSwitchNavigator( {
    Tutorial: Tutorial,
    Login: Login,
    AppNavigator
});


export default createAppContainer(tutorialSwitchNavigator)
