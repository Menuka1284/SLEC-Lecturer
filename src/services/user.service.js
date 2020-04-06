/* eslint-disable prettier/prettier */
import { BASE_URL } from '../constants/Values';
export async function signUp(studentId,email,password,imei) {
    if (studentId !== null && email !== null && password !== null) {
        return fetch(`${BASE_URL}lecturer/sign-up`, {
            method: 'POST',
            body: JSON.stringify({
                id: studentId,
                imei: imei,
                password: password,
                email : email
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept':'application/json'
            },
            credentials:'same-origin'
        }).then(response => {
            if (response.ok)
                return response.json();
            else {
                if (response.status === 401)
                    throw new Error('You Are Not a NSBM lecturer');
                else
                    throw new Error('Email Exists');
            }
        }).catch(err => {
            throw err;
        })
    }
}
export async function login(email, imei, password) {
    return fetch(`${BASE_URL}login`, {
        method: 'POST',
        body: JSON.stringify({
            password: password,
            email: email,
            imei: imei
        }),
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Accept':'application/json'
        }
    }).then(response => {
        if (response.ok)
            return response.json();
        else {
            if (response.status === 401)
                throw new Error('Please Check Your Email , Password And Make Sure This Device is Your device');
            else {
                throw new Error('Something Went Wrong We Will Fix it Soon');
            }
        }
    }).catch(err => {
        throw err;
    })
}
export async function markUserAttendance(macAddress, batch, course, studentId , name) {
    return fetch(`${BASE_URL}lecturer/mark-attendence`, {
        method: 'POST',
        body: JSON.stringify({
            id: studentId,
            macAddress: macAddress,
            batch: batch,
            course: course,
            name : name
        }),
        headers: {
            'Content-Type': 'application/json',
            'Accept':'application/json'
        },
        credentials:'same-origin'
    }).then(response => {
        if (response.ok)
            return response.json();
        else {
            if (response.status === 404)
                throw new Error('At this time there is no lecture for you');
            else if (response.status === 409)
                throw new Error('You are in the lecture');
            else
                throw new Error('Something went Wrong');
        }
    }).catch(err => {
        throw err;
    })
}
export async function checkStudentAvailabe(macAddress, id, moduleCode) {
    return fetch(`${BASE_URL}lecturer/check`, {
        method: 'POST',
        body: JSON.stringify({
            macAddress: macAddress,
            id: id,
            moduleCode : moduleCode
        }),
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type':'application/json'
        }
    }).then(response => {
        if (response.ok)
            return response.json();
        else {
            if (response.status === 401)
                throw new Error('You Left Early');
            else
                throw new Error('Something Went Wrong');
        }
    }).catch(err => {
        throw err
    })
}

export async function loadTodayTimeTable() {
    return fetch(`${BASE_URL}lecturer/today-time-table`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type':'application/json'
        },
        credentials:'same-origin'
    }).then(response => {
        if (response.ok)
            return response.json();
        else {
            if (response.status === 400)
                throw new Error('Today is a holiday');
            else
                throw new Error('Something Went Wrong');
        }
    }).catch(err => {
        throw err;
    })
}
export async function retryAttendance(macAddress,moduleCode,id) {
    return fetch(`${BASE_URL}lecturer/rollback-attendance`, {
        method: 'POST',
        body: JSON.stringify({
            macAddress: macAddress,
            id: id,
            moduleCode: moduleCode
        }),
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type':'application/json'
        }
    }).then(response => {
        if (response.ok)
            return response.json();
        else
            throw new Error('You are not in the valied LECTURE HALL');
    }).catch(err => {
        throw err;
    })
}