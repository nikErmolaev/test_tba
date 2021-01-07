import React, {useState, useEffect, useReducer} from 'react'
import {
    SETTING_FETCH,
    SETTING_SUCCESS,
    SETTING_FAILURE
} from '../types'
import {
    API_URL,
    API_PROJECT
} from '../api'
import { settingsReducer } from '../reducers/settingsReducer'
import { SettingsContext } from '../context/settingsContext'

import { getCookie } from '../helperCookie'

export const SettingsContainer = ({children}) => {
    const [state, dispatch] = useReducer(settingsReducer)

    const fetchData = async () => {
        dispatch({type: SETTING_FETCH})
        try {
            const request = await fetch(`${API_URL}/${API_PROJECT}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'authorization': `Bearer ${getCookie('token')}`,
                }
            })
            if (request.statusText === 'OK') {
                const data = await request.json()
                const { name } = data
                dispatch({
                    type: SETTING_SUCCESS,
                    payload: name
                })
            } else {
                dispatch({
                    type: SETTING_FAILURE
                })
            }
        } catch(error) {
            dispatch({type: SETTING_FAILURE})
            console.error(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <SettingsContext.Provider value={{ ...state }}>
            {children}
        </SettingsContext.Provider>
    )
}