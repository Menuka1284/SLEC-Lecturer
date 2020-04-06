/* eslint-disable prettier/prettier */
import { USER_LOGIN } from '../actiontypes/action.types';
const initialState = {
    loggedUser:null
}
export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN:
            state.loggedUser = action.userDetails
            return {
                ...state 
            }
        default:
            return state
    }
}