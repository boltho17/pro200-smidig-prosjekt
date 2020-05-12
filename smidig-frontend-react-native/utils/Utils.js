import {AuthSession, SecureStore} from 'expo';
import {Buffer} from "buffer";

const feideAuthUrl = 'https://auth.dataporten.no/oauth/authorization';
const feideTokenUrl = 'https://auth.dataporten.no/oauth/token';
const feideClientId = '9aa61635-ad3c-479f-bb18-3711dabae6d2';
const feideClientSecret = '1708abb7-2fc8-4773-8af9-efc3fac58854';
const feideRedirectUrl = AuthSession.getRedirectUrl();
const feideResponseType = "code";

const peerApiSignupUrl = "https://smidig-backend.herokuapp.com/auth/signup";

async function getFeideAuthorizationToken() {
    const response = await AuthSession.startAsync({
        authUrl:
            feideAuthUrl +
            '?client_id=' + feideClientId + '' +
            '&response_type=' + feideResponseType +
            '&redirect_uri=' + encodeURIComponent(feideRedirectUrl)
    });
    return response.params.code
}

async function getFeideAccessToken() {
    const authToken = await getFeideAuthorizationToken();
    const encryptedCredentials = new Buffer(feideClientId + ":" + feideClientSecret).toString("base64");
    const response = await fetch(feideTokenUrl, {
        method: 'POST',
        headers: {
            Authorization: 'Basic ' + encryptedCredentials,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=authorization_code&code=' + authToken +
            '&client_id=' + feideClientId + '&redirect_uri=' + feideRedirectUrl
    });

    const json = await response.json();
    return json.access_token
}

async function peerApiLogin() {

    const token = await getFeideAccessToken();
    await storeFeideTokenOnSecureStorage(token);

    const response = await fetch("https://smidig-backend.herokuapp.com/auth/login", {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
    try {
        if (response.headers.get('Authorization') !== null && response.headers.get('Authorization') !== undefined) {
            await storeJwtTokenOnSecureStorage(response.headers.get('Authorization').replace('Bearer ', ''));
        }
    } catch (error) {
        console.log(error)
    }
    return response
}

async function storeFeideTokenOnSecureStorage(token) {
    await SecureStore.setItemAsync('feideAccessToken', token);
}

async function storeJwtTokenOnSecureStorage(token) {
    await SecureStore.setItemAsync('token', token);
}

async function getFeideTokenOnSecureStorage() {
    return await SecureStore.getItemAsync('feideAccessToken')
}

async function getTokenFromSecureStorate() {
    return await SecureStore.getItemAsync('token');
}

async function deleteTokenFromSecureStorage() {
    await SecureStore.deleteItemAsync('token').then(
    );
    await SecureStore.deleteItemAsync('feideAccessToken').then(

    )
}

module.exports = {
    storeFeideTokenOnSecureStorage,
    storeTokenOnSecureStorage: storeJwtTokenOnSecureStorage,
    deleteTokenFromSecureStorage,
    getTokenFromSecureStorate,
    getFeideTokenOnSecureStorage,
    peerApiLogin
};