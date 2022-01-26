import axios from 'axios';

export const SET_ITEMS = "SET_ITEMS";

export const getItems = () => (dispatch) => {
    return axios.get(`http://localhost:3333/items`)
        .then(res => {
            dispatch(setItems(res.data));
        })
        .catch(error => console.log(error));        
}

export const deleteItems = (id) => (dispatch) => {
    return axios.delete(`http://localhost:3333/items/${id}`)
      .then(res=> {
        dispatch(setItems(res.data));
      })
      .catch(err=>{
        console.log(err);
      });
}

export const updateItems = (id, item) => (dispatch) => {
    return axios.put(`http://localhost:3333/items/${id}`, item)
        .then(res=>{
            dispatch(setItems(res.data));
        })
        .catch(err=>{
            console.log(err);
        });
}


export const setItems = (items) => {
    return({type: SET_ITEMS, payload:items});
}