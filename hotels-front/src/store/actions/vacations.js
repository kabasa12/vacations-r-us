import * as actionTypes from './actionTypes';
import * as axios from 'axios';

export const setVacations = ( vacations ) => {
    return {
        type: actionTypes.SET_VACATIONS,
        vacations: vacations
    };
};

export const fetchVacationsFailed = () => {
    return {
        type: actionTypes.FETCH_VACATIONS_FAILED
    };
};

// export const addUserVacation = (vacation_id) => {
//     return {
//         type:actionTypes.ADD_USER_VACATION,
//         vacation_id : vacation_id
//     }   
// };

// export const addUserVacationFailed = () => {
//     return {
//         type: actionTypes.ADD_USER_VACATION_FAILED
//     };
// };

export const initVacations = () => {
    return async dispatch => {
        try {
            await axios.get(`http://www.localhost:4000/getVacations`)
            .then(response => {
                dispatch(setVacations(response.data));
            });
        } catch (error) {
            dispatch(fetchVacationsFailed());
        };
    };
};

// export const updateUserVacation = (userId,vacation_id) => {
//     return async dispatch => {
//         try {
//             await axios.post(`http://www.localhost:4000/insertUserVacation/?user_id=${userId}&vacation_id=${vacation_id}`)
//             .then(response => {
//                 dispatch(addUserVacation(vacation_id));
//             })
//         } catch (error) {
//             dispatch(addUserVacationFailed());
//         }
//     }
        
// }