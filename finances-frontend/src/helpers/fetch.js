
const BASE_URL = process.env.REACT_APP_API_URL;


export const fetchWithoutToken = (endpoint, data, method = 'GET') => {

    const url =`${BASE_URL}/${endpoint}`;

    if(method === 'GET') {
        return fetch(url);
    }else{
        return fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }
}

export const fetchWithToken = (endpoint, data, method = 'GET') => {
    const url =`${BASE_URL}/${endpoint}`;
    const token = localStorage.getItem('token') || '';

    if(method === 'GET') {
        return fetch(url, {
            method,
            headers: {
                'x-token': token
            }
        });
    }else{
        return fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify(data)
        });
    }

}