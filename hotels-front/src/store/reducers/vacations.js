import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    vacations: [{}],
    error: false,
    userId : 4
};

const setVacations = (state, action) => {
    return updateObject( state, {
        vacations: action.vacations,
        error: false
    } );
};

const fetchVacationsFailed = (state, action) => {
    return updateObject( state, { error: true } );
};

// const addUserVacation = (state, action) => {
//     const 
// };

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SET_VACATIONS: return setVacations(state, action);  
        case actionTypes.FETCH_VACATIONS_FAILED: return fetchVacationsFailed(state, action);  
        default: return state;
    }
};

export default reducer;