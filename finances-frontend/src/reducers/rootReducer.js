import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { sheetsReducer } from "./sheetsReducer";
import { uiReducer } from "./uiReducer";



const rootReducer = combineReducers({
    ui: uiReducer,
    auth: authReducer,
    sheets: sheetsReducer
})


export default rootReducer;