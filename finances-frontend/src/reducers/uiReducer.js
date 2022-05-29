import types from "../types/types";

const initialState = {
    loadingAddSheetItem: false,
    modalOpen: false,
    loading: false
}

const uiReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.uiOpenModal:
            return {
                ...state,
                modalOpen: true
            }

        case types.uiCloseModal:
            return {
                ...state,
                modalOpen: false
            }

        case types.uiStartLoading:
            return {
                ...state,
                loading: true
            }

        case types.uiFinishLoading:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }

}

export {
    uiReducer
}