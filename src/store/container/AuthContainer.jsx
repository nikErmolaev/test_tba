import React, {useState, useEffect, useReducer} from 'react'
import {
    AUTH_FETCH,
    AUTH_SUCCESS,
    AUTH_FAILURE,
    AUTH_LOGOUT
} from '../types'
import {
    API_URL,
    API_AUTH,
    API_AUTH_CHECK,
    TOKEN_SITE
} from '../api'
import { authReducer } from '../reducers/authReducer'
import { AuthContext } from '../context/authContext'

import { setCookie, getCookie, deleteCookie } from '../helperCookie'

export const AuthContainer = ({children}) => {
    const [state, dispatch] = useReducer(authReducer)

    const fetchData = async () => {
        dispatch({type: AUTH_FETCH})
        try {
            const request = await fetch(`${API_URL}/${API_AUTH_CHECK}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'authorization': `Bearer ${getCookie('token')}`,
                }
            })
            if (request.statusText === 'OK') {
                const data = await request.json()
                const { user } = data
                dispatch({
                    type: AUTH_SUCCESS,
                    payload: user
                })
            }
        } catch(error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const getAuth = async (data) => {
        dispatch({type: AUTH_FETCH})
        try {
            const request = await fetch(`${API_URL}/${API_AUTH}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(data)
            })
            if (request.statusText === 'OK') {
                const { accessToken } = await request.json()
                setCookie('token', accessToken)
                fetchData()
            } else {
                dispatch({type: AUTH_FAILURE})
            }
        } catch(error) {
            dispatch({type: AUTH_FAILURE})
            console.error(error)
        }
    }

    const logout = () => {
        deleteCookie('token')
        dispatch({type: AUTH_LOGOUT})
    }

    return (
        <AuthContext.Provider value={{ ...state, getAuth, logout }}>
            {children}
        </AuthContext.Provider>
    )
}