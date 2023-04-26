//? The users-service.js module will make AJAX requests to the Express server.

//? The flow of data...
    //* SignUpForm.jsx <--> users-service.js <--> users-api.js <-Internet-> server.js (Express)
    //* handleSubmit <--> [signUp]-users-service <--> [signUp]-users-api <-Internet-> server.js (Express)

//!New code: refactored and drier (see below for old code)

import { getToken } from "./users-service";

//base path of the Express route
const BASE_URL = '/api/users';

//* SignUp
export function signUp(userData) {
    return sendRequest(BASE_URL, 'POST', userData);
}

//* Login
export function login(credentials) {
    return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

//* Check Token
export function checkToken() {
    return sendRequest(`${BASE_URL}/check-token`)
}

/*--- Helper Functions ---*/

async function sendRequest(url, method = 'GET', payload = null) {
    // Fetch accepts an options object as the 2nd argument
    // used to include a data payload, set headers, etc.
    const options = { method };
    if (payload) {
        options.headers = { 'Content-Type': 'application/json' };
        options.body = JSON.stringify(payload);
    }

    // sends token to backend
    const token = getToken();

    if (token) {
        //this is to ensure headers object exists
        options.headers = options.headers || {};
        //add token to Authorization header
        //preface with 'Bearer' is recommended as per HTTP specification
        options.headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(url, options);
    // res.ok will be false if the status code set to 4xx in the controller action
    if (res.ok) return res.json();
    throw new Error('Bad Request');
}


//!Old code: repetitive

/*
//*Sign up
export async function signUp(userData) {
    const BASE_URL = '/api/users';

    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData) // converts JS object to string so it can be sent over internet
    });
    
    if (res.ok) {
        return res.json(); // JWT Token
    } else {
        throw new Error('Invalid Signup!')
    }
}

//*Login
export async function login(credentials) {
    const BASE_URL = '/api/users';

    //?sends different data to a different endpoint than signUp
    const res = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(credentials)
    })

    if (res.ok) {
        return res.json();
    } else {
        throw new Error('Invalid Sign-in!')
    }
}
*/