/* eslint-disable prettier/prettier */
import { LECTURE_ATTENDED , TODAY_TIME_TABLE , TODAY_IS_A_HOLIDAY } from '../actiontypes/action.types';
const initialState = {
    onGoingLecture: null,
    timeTable : []
} 
export const lectureReducer = (state = initialState , action) => {
    switch (action.type) {
        case LECTURE_ATTENDED:
            state.onGoingLecture = action.onGoingLecture;
            return {
                ...state
            }
        case TODAY_TIME_TABLE:
            state.timeTable = action.timeTable;
            return {
                ...state
            }
        case TODAY_IS_A_HOLIDAY:
            state.timeTable.length = 0;
            return {
                ...state
            }
        default:
            return state
    }
}