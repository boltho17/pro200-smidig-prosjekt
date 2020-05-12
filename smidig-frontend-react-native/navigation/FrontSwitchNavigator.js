import {createAppContainer, createSwitchNavigator} from "react-navigation";
import Login from "../screens/Login";
import AppNavigator from "./AppNavigator";


const mainSwitchNavigator = createSwitchNavigator( {
    Login: Login,
    AppNavigator
});


export default createAppContainer(mainSwitchNavigator)
