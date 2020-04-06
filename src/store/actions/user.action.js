/* eslint-disable prettier/prettier */
import { USER_LOGIN } from '../actiontypes/action.types';

export function loginAction(userDetails) {
    return dispatch=> {
        dispatch(loginActionAsync(userDetails));
    }
}

export function loginActionAsync(userDetails) {
    return {
        type: USER_LOGIN,
        userDetails: userDetails
    }
}