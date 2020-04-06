/* eslint-disable prettier/prettier */
import { LECTURE_ATTENDED , TODAY_TIME_TABLE , TODAY_IS_A_HOLIDAY} from '../actiontypes/action.types';
export function markAttendance(lectureInfo) {
    return dispatch => {
        dispatch(markAttendanceAsync(lectureInfo));
    }
}
export function markAttendanceAsync(lectureInfo) {
    return {
        type: LECTURE_ATTENDED,
        onGoingLecture: lectureInfo
    }
}

export function loadTimeTable(timeTable) {
    return dispatch => dispatch(loadTimeTableAsync(timeTable));
}
export function loadTimeTableAsync(timeTable) {
    return {
        type: TODAY_TIME_TABLE,
        timeTable: timeTable
    };
}
export function lectureEmptyAction() {
    return dispatch => dispatch(lectureEmptyAsyncAction());
}
export function lectureEmptyAsyncAction() {
    return{ type : TODAY_IS_A_HOLIDAY }
}