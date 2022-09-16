import { notify } from "../lib/notify.js";
import { clearUserData, getUserData, setUserData } from "../util.js";

const hostname = 'https://parseapi.back4app.com';


async function request(url, options) {
    try {
        const response = await fetch(hostname +  url, options);

        if(response.ok != true) {
            const error = await response.json();
            console.log(error);
            throw {
                message: error.error,
                code: error.code
            };
        }
    
        return response.json();
    } catch(err) {
        notify(err.message);
        throw err;
    }
}

function createOptions(method='get', data) {
    const options = {
        method,
        headers: {
            'X-Parse-Application-Id': '2QZo5wW0aI95U2pSljkotgOyrtuwr0LPOGPCJ2jN',
            'X-Parse-REST-API-Key': 'v4saDetLXBl2PuoQyioXWVnaI4ONijt0BKv0PmLJ'
        }
    }

    const userData = getUserData();
    if(userData) {
        options.headers['X-Parse-Session-Token'] = userData.token;
    }

    if (data) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    return options;
}


// CRUD requests
export async function get(url) {
    return request(url, createOptions());
}

export async function post(url, data) {
    return request(url, createOptions('post', data));
}

export async function put(url, data) {
    return request(url, createOptions('put', data));
}

export async function del(url) {
    return request(url, createOptions('delete'));
}


// User profile requests
export async function login(username, password) {
    const result = await post('/login', {username, password});
    const userData = {
        username: result.username,
        id: result.objectId,
        token: result.sessionToken,
    };
    setUserData(userData);
    return result;
}

export async function register(username, email, password) {
    const result = await post('/users', {username, email, password});
    const userData = {
        username,
        id: result.objectId,
        token: result.sessionToken,
    };
    setUserData(userData);
    return result;
}

export async function logout() {
    await post('/logout'); 
    clearUserData();
}