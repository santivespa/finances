import types from "../types/types"

export const openModal = () => ({
    type: types.uiOpenModal
})

export const closeModal = () => ({
    type: types.uiCloseModal
})


export const startLoading = () => ({
    type: types.uiStartLoading
})

export const finishLoading = () => ({
    type: types.uiFinishLoading
})