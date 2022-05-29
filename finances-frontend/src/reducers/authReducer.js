import types from "../types/types";

const initialState = {
    cheking: true
    
}

const authReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.authLogin:
            return {
                ...state,
                ...action.payload,
                cheking: false

            }

        case types.authCheckingFinish:
            return {
                ...state,
                ...action.payload,
                cheking: false
            }
    
        case types.authLogout:
            return {
                cheking: false

            }
            
        default:
            return state;
    }

}

export {
    authReducer
}