import Cookies from  'js-cookie';
import qs from 'qs';

const BASE_API = 'http://localhost:6060';

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

const apiFetchPut = async (endpoint, body) => {
    if(!body.token) {
        let token = Cookies.get('token');
        if(token){
            body.token = token;
        }
    }
    
    const res = await fetch(BASE_API + endpoint, {
        method: 'PUT',
        headers: {
            'Accept':'application/json',
            'Content-type':'application/json'
        },
        body: JSON.stringify(body),
    });

    const json = await res.json();
    if(json.notallowed){
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
        const json = await apiFetchPost('/user/login', {email, password});
        return json;
    },
    register: async (name, stateLoc, email, password) => {
        const json = await apiFetchPost('/user/signup', {
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

    getAds: async (options) => {
        const json = await apiFetchGet(
            '/ad/list',
            options
        );
        return json;
    },

    getAd: async (id, othersAds = false) => {
        const json = await apiFetchGet(
            '/ad/item',
            { id, othersAds }
        );
        return json;
    },

    addAd: async (fData) => {
        const json = await apiFetchFile(
            '/ad/add',
            fData
        );
        return json;
    },

    updateAd: async (id, fData) => {
        const json = await apiFetchFile(
            `/ad/${id}`
        );
        return json;
    },

    getUser: async () => {
        const json = await apiFetchGet(
            '/user/me'
        );
        return json;
    },

    updateUser: async (name, stateLoc, email, password) => {
        const json = await apiFetchPut('/user/me', {
            name,
            state: stateLoc,
            email,
            password
        });
        return json;
    },
}

export default () => OlxAPI;