import Cookies from  'js-cookie';
import qs from 'qs';

const BASE_API = '';

const apiFetchPost = async (endpoint, body) => {
    if(!body.token) {
        let token = Cookies.get('token');
        if(token){
            body.token = token;
        }
    }
    const res = await fetch(BASE_API + endpoint, {
        method: 'POST',
        headers: {
            'Accept':'application/json',
            'Content-type':'application/json'
        },
        body: JSON.stringify(body)
    });

    const json = await res.json();
    if(json.notallowed){
        window.location.href = '/signin';
        return;
    }

    return json;
}

const apiFetchGet = async (endpoint, body = []) => {
    if(!body.token) {
        let token = Cookies.get('token');
        if(token){
            body.token = token;
        }
    }
    const res = await fetch(`${BASE_API+endpoint}?${qs.stringify(body)}`);

    const json = await res.json();
    if(json.notallowed){
        window.location.href = '/signin';
        return;
    }

    return json;
}

const OlxAPI = {
    login: async (email, password) => {
        const json = await apiFetchPost('user/login', {email, password});
        return json;
    },
    register: async (name, stateLoc, email, password) => {
        const json = await apiFetchPost('user/signup', {
            name,
            state: stateLoc,
            email,
            password
        });
        return json;
    },
    getState: async () => {
        const json = await apiFetchGet('/states');
        return json.states;
    }
}

export default () => OlxAPI;