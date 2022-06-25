import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { categoriesReducer } from "./categoriesReducer";
import { sheetsReducer } from "./sheetsReducer";
import { uiReducer } from "./uiReducer";



const rootReducer = combineReducers({
    ui: uiReducer,
    auth: authReducer,
    sheets: sheetsReducer,
    categories: categoriesReducer
})


export default rootReducer;