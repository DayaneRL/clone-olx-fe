import Cookies from  'js-cookie';
import qs from 'qs';

const BASE_API = '';

const apiFetchFile = async (endpoint, body) => {
    if(!body.token) {
        let token = Cookies.get('token');
        if (token) {
            body.append('token', token);
        }
    }
    const res = await fetch(BASE_API + endpoint, {
        method: 'POST',
        body
    });
    const json = await res.json();
    if(json.notallowed) {
        window.location.href = '/signin';
        return;
    }
    return json;
}

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
    },

    getCategories: async () => {
        const json = await apiFetchGet(
            '/categories'
        );
        return json.categories;
    },

    getAd: async (options) => {
        const json = await apiFetchGet(
            '/ad/list',
            options
        );
        return json;
    },

    addAd: async (fData) => {
        const json = await apiFetchFile(
            '/ad/add',
            fData
        );
        return json;
    }
}

export default () => OlxAPI;