import Swal from "sweetalert2";
import { fetchWithToken } from "../helpers/fetch";
import types from "../types/types";
import { closeModal, finishLoading, startLoading } from "./ui";



export const startAddSheet = (sheet) => {
    return async (dispatch) => {
        dispatch(startLoading());
        const res = await fetchWithToken('sheets/add', sheet, 'POST');
        const body = await res.json();
        if(body.ok) {
            dispatch(addSheet(body.sheet));
            dispatch(closeModal());
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

const addSheet = (sheet) => ({
    type: types.sheetAdd,
    payload: sheet
});

export const startGetSheets = () => {
    return async (dispatch) => {

        const res = await fetchWithToken('sheets/get-all', {}, 'GET');
        const body = await res.json();
        if(body.ok) {
            dispatch(setSheets(body.sheets));
        }else{
            Swal.fire(
                'Error',
                body.msg,
                'error'
            )
        }
    }
}

const setSheets = (sheets) => ({
    type: types.sheetSetSheets,
    payload: sheets
});

export const startUpdateSheet = (sheet) => {
    return async (dispatch) => {
        dispatch(startLoading());
        const res = await fetchWithToken(`sheets/update?id=${sheet.id}`, sheet, 'PUT');
        const body = await res.json();
     
        if(body.ok) {
            dispatch(updateSheet(sheet));
            //dispatch(startUpdateRemainingAmount());
            // TODO calculate remianing amount
            
        
            dispatch(closeModal());
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

const updateSheet = (sheet) => ({
    type: types.sheetUpdate,
    payload: sheet
});

export const startDeleteSheet = (sheet) => {
    return async (dispatch) => {
        dispatch(startLoading());
        const res = await fetchWithToken(`sheets/delete?id=${sheet.id}`, {}, 'DELETE');
        const body = await res.json();
        if(body.ok) {
            dispatch(deleteSheet(sheet));
            dispatch(closeModal());
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

const deleteSheet = (sheet) => ({
    type: types.sheetDelete,
    payload: sheet
});

export const sheetGetItems = (sheetID) => {
    return async (dispatch) => {
        const res = await fetchWithToken(`sheet-item/get-all?sheetID=${sheetID}`, {}, 'GET');
        const body = await res.json();

        if(body.ok) {
            dispatch(setSheetItems(body.items));
        }else{
            Swal.fire(
                'Error',
                body.msg,
                'error'
            )
        }
    }
}

const setSheetItems = (items) => ({
    type: types.sheetSetItems,
    payload: items
});

export const startAddItem = (item, sheetID) => {
    return async (dispatch) => {
        dispatch(startLoading());

        const res = await fetchWithToken(`sheet-item/add?sheetID=${sheetID}`, item, 'POST');
        const body = await res.json();
        if(body.ok) {
            dispatch(addItem(body.item));
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

const addItem = (item) => ({
    type: types.sheetAddItem,
    payload: item
});

export const startUpdateItem = (item) => {
    return async (dispatch) => {
        dispatch(startLoading());

        const res = await fetchWithToken(`sheet-item/edit?itemID=${item.id}`, item, 'PUT');
        const body = await res.json();
        if(body.ok) {
            dispatch(updateItem(body.item));
            dispatch(closeModal());
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

const updateItem = (item) => ({
    type: types.sheetUpdateItem,
    payload: item
});

export const startDeleteItem = (item) => {
    return async (dispatch) => {
        dispatch(startLoading());
        const res = await fetchWithToken(`sheet-item/delete?itemID=${item.id}`, item, 'DELETE');
        const body = await res.json();
        if(body.ok) {
            dispatch(deleteItem(item));
            dispatch(closeModal());
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

const deleteItem = (item) => ({
    type: types.sheetDeleteItem,
    payload: item
});


export const setActiveSheet = (sheet) => ({
    type: types.sheetSetActive,
    payload: sheet
});

export const sheetClearActive = () => ({
    type: types.sheetClearActive
});

export const setActiveSheetItem = (item) => ({
    type: types.sheetSetActiveItem,
    payload: item
});

export const sheetClearActiveItem = () => ({
    type: types.sheetClearActiveItem
});


export const calculateLastiRemainingAmount = () => {
    return async (dispatch) => {
        const res = await fetchWithToken(`sheets/last-remaining-amount`, {}, 'GET');
        const body = await res.json();
     
        if(body.ok) {
            dispatch(setLastRemainingAmount(body.remainingAmount));
        }else{
            console.error(body.msg);
        }
    }
}
export const setLastRemainingAmount = (remainingAmount) => ({
    type: types.sheetSetLastRemainingAmount,
    payload: remainingAmount
});