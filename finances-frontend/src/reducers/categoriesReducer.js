import types from "../types/types";



const initialState = {
    categories: [],
    active: null
};


const categoriesReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.categoryAdd:
            return {
                ...state,
                categories: [...state.categories, action.payload]
            }

        case types.categorySetCategories:
            return {
                ...state,
                categories: action.payload
            }

        case types.categorySetActive:
            console.log(action.payload);
            return {
                ...state,
                active: action.payload
            }

        case types.categoryUpdated:
            return {
                ...state,
                categories: state.categories.map(x => {
                    return x.id == action.payload.id ? { ...action.payload } : x 
                }),
                active: null
            }

        case types.categoryDeleted:
            return {
                ...state,
                categories: state.categories.filter(x => x.id !== action.payload),
                active: null
            }

        default:
            return state;
    }
}

export {
    categoriesReducer
}