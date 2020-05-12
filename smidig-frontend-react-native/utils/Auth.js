import {
    storeFeideTokenOnSecureStorage,
    storeTokenOnSecureStorage,
    deleteTokenFromSecureStorage,
    getTokenFromSecureStorate
} from './Utils'

var Auth = (function() {
    var token = undefined;
    var loggedIn = false;

    var getJWTToken = function() {
        return token
    };

    var loadJWTTokenFromSecureStorage = async function(){
        await getTokenFromSecureStorate()
            .then(tokenFromStorage => {
                token = tokenFromStorage
            })
    };

    var checkIfTokenIsValidWithBackend = async function (){
        if(getJWTToken() === undefined || getJWTToken() === null){
            return false
        }
        await fetch('https://smidig-backend.herokuapp.com/auth/verify', {
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + getJWTToken()}
        })
            .then(async response => {
                console.log("CheckIfValidWithBackend")
                console.log(response)
                return response.status === 200;
            })
            .catch(error => {
                console.log(error);
                return false
            })
    }

    const logout = function () {
        token = null;
        deleteTokenFromSecureStorage()
    };

    var getLoggedIn = function () {
        return loggedIn
    };

    var setLoggedIn = function(newLoggedIn){
        loggedIn = newLoggedIn
    };

    return {
        getJWTToken: getJWTToken,
        loadJWTTokenFromSecureStorage: loadJWTTokenFromSecureStorage,
        getLoggedIn: getLoggedIn,
        setLoggedIn: setLoggedIn,
        logout: logout,
        checkIfTokenIsValidWithBackend,
        deleteTokenFromSecureStorage,
        storeTokenOnSecureStorage
    }
});


export default Auth();