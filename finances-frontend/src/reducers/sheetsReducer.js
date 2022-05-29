import types from "../types/types";

// const initialState = {
//     sheets: [{
//         id: 1,
//         fullDate: new Date().getTime(),
//         monthName: 'Mayo',
//         year: 2022,
//         initialAmount: 40000
//     }],
//     active: {
//         id: 1,
//         fullDate: new Date().getTime(),
//         monthName: 'Mayo',
//         year: 2022,
//         initialAmount: 40000
//     },
//     sheetItems: [{
//         id: new Date().getTime(),
//         description: 'alquiler',
//         amount: 10000,
//         type: 'normal'
//     }],
//     activeItem: null
// }

const initialState = {
    sheets: [],
    active: null,
    activeItems: [],
    activeItem: null
}

const sheetsReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.sheetClearAll: {
            return {
                sheets: [],
                active: null,
                activeItems: [],
                activeItem: null
            }
        }

        case types.sheetSetLastRemainingAmount:
            return {
                ...state,
                remainingAmount: action.payload
            }

        case types.sheetAdd:
            return {
                ...state,
                sheets: [...state.sheets, action.payload],
                active: action.payload
            }

        case types.sheetSetSheets: 
            return {
                ...state,
                sheets: action.payload
            }
            
        case types.sheetDelete: 
            return {
                ...state,
                sheets: state.sheets.filter(sheet => sheet.id !== action.payload.id),
                active: null
            }
        
        case types.sheetUpdate: 
            return {
                ...state,
                sheets: state.sheets.map(sheet => {
                    if (sheet.id === action.payload.id) {
                        return {
                            ...action.payload
                        }
                    }
                    return sheet;
                })
            }

        case types.sheetSetActive:
            return {
                ...state,
                active: action.payload
            }

        case types.sheetClearActive:
            return {
                ...state,
                active: null,
                activeItems: []
            }

        case types.sheetSetItems: {
            return {
                ...state,
                activeItems: action.payload
            }
        }

        case types.sheetAddItem:
            return {
                ...state,
                activeItems: [...state.activeItems, action.payload]
            }

        case types.sheetUpdateItem:

            return {
                ...state,
                activeItems: state.activeItems.map(item => {
                    if(item.id === action.payload.id){
                        return action.payload;
                    }
                    return item;
                })

            }

        case types.sheetDeleteItem:
            return {
                ...state,
                activeItems: state.activeItems.filter(item => item.id !== action.payload.id)
            }

        case types.sheetSetActiveItem:
            return {
                ...state,
                activeItem: action.payload
            }

        case types.sheetClearActiveItem:
            return {
                ...state,
                activeItem: null
            }
        
        default:
            return state;
    }

}

export {
    sheetsReducer
}