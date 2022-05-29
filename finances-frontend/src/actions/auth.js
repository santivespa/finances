import Swal from "sweetalert2";
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch"
import types from "../types/types";
import { finishLoading, startLoading } from "./ui";



export const startLogin =  (email, password) => {
    return async (dispatch) => {

        dispatch(startLoading());
        const res = await fetchWithoutToken(`auth/login`, { email, password }, 'POST');
        const body = await res.json();
        if(body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().toTimeString());
            dispatch(login({
                id: body.id,
                email: body.email
            }));
        }else{
            Swal.fire(
                'Error',
                body.msg,
                'error'
            )
        }
        dispatch(finishLoading());
    }
}

export const startRegister = (email, password) => {
    return async (dispatch) => {
        dispatch(startLoading());

        const res = await fetchWithoutToken('auth/register', { email, password }, 'POST');
        const body = await res.json();
        if(body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().toTimeString());
            dispatch(login({
                id: body.id,
                email: body.email
            }));
        }else{
            Swal.fire(
                'Error',
                body.msg,
                'error'
            )
        }
        dispatch(finishLoading());

    }
}


export const startChekingToken = () => {

    return async(dispatch) => {
        const res = await fetchWithToken('auth/renew-token', {}, 'GET');
        const body = await res.json();
    
        if(body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().toTimeString());
            dispatch(login({
                id: body.id,
                email: body.email
            }));
        }else{
            localStorage.removeItem('token');
            localStorage.removeItem('token-init-date');
            dispatch(finishCheking());
        }
    }
   
}

const login = (user) => ({
    type: types.authLogin,
    payload: user
})

const finishCheking = () => ({
    type: types.authCheckingFinish
});

export const startLogout = () => {
    return (dispatch) => {
        localStorage.removeItem('token');
        localStorage.removeItem('token-init-date');
        dispatch(logout());
        dispatch(sheetClearAll());
    }
}


export const logout = () => ({
    type: types.authLogout
})

export const sheetClearAll = () => ({
    type: types.sheetClearAll
})