export const SET_ITEMS = "SET_ITEMS";

export const setItems = (items) => {
    return({type: SET_ITEMS, payload:items});
}