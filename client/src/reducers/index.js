import { SET_ITEMS } from './../actions';

export const initialState = {
    items: []
};

const reducer = (state = initialState, action ) => {
    switch(action.type) {
        case(SET_ITEMS):
            return({
                items: action.payload
            });
        default:
            return(state);
    }
}

export default reducer;