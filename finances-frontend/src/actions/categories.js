import { fetchWithToken } from "../helpers/fetch"
import types from "../types/types";
import { closeModal, finishLoading, startLoading } from "./ui";



export const startAddCategory = (category, resetForm) => {
    return async (dispatch) => {

        try {
            dispatch(startLoading());
            const res = await fetchWithToken('category/add', category, 'POST');
            const body = await res.json();
            dispatch(finishLoading());

            if (body.ok) {
                dispatch(addCategory(body.category));
                resetForm();
            } else {
                console.log("not ok");
            }


        } catch (e) {
            console.log(e);
            dispatch(finishLoading());
        }
    }
}

export const startGetCategories = () => {
    return async (dispatch) => {
        try {

            const res = await fetchWithToken('category/get-all', null, 'GET');
            const body = await res.json();

            if (body.ok) {
                dispatch(setCategories(body.categories));
            } else {
                console.log("not ok");
            }


        } catch (e) {
            console.log(e);
        }
    }
}

export const startUpdateCategory = (category) => {
    return async (dispatch) => {

        try {
            dispatch(startLoading());
            const res = await fetchWithToken(`category/update?categoryID=${category.id}`, category, 'PUT');
            const body = await res.json();
            dispatch(finishLoading());

            if (body.ok) {
                dispatch(updateCategory(body.category));
                dispatch(closeModal());
            } else {
                console.log("not ok");
            }

        } catch (e) {
            console.log(e);
            dispatch(finishLoading());
        }
    }
}

export const startDeleteCategory = (category) => {
    return async (dispatch) => {

        try {
            dispatch(startLoading());
            const res = await fetchWithToken(`category/delete?categoryID=${category.id}`, {}, 'DELETE');
            const body = await res.json();
            dispatch(finishLoading());

            if (body.ok) {
                dispatch(deleteCategory(category.id));
                dispatch(closeModal());
            } else {
                console.log("not ok");
            }


        } catch (e) {
            console.log(e);
            dispatch(finishLoading());
        }
    }
}

export const setActiveCategory = (category) => ({
    type: types.categorySetActive,
    payload: category
});

const addCategory = (category) => ({
    type: types.categoryAdd,
    payload: category
})

const setCategories = (categories) => ({
    type: types.categorySetCategories,
    payload: categories
})


const updateCategory = (category) => ({
    type: types.categoryUpdated,
    payload: category
});

const deleteCategory = (categoryId) => ({
    type: types.categoryDeleted,
    payload: categoryId
});

