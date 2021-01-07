import React, {useState, useEffect, useReducer} from 'react'
import {
    COMPANY_FETCH,
    COMPANY_SUCCESS,
    COMPANY_FAILURE
} from '../types'
import {
    API_URL,
    API_COMPANIES,
    TOKEN_SITE
} from '../api'
import { companyReducer } from '../reducers/companyReducer'
import { CompanyContext } from '../context/companyContext'

import { getCookie } from '../helperCookie'

const defaultParams = {
    optionTable: {
        page: 1, 
        itemsPerPage: 10, 
        serverItemsLength: -1
    },
    search: ""
}

export const CompanyContainer = ({children}) => {
    const [state, dispatch] = useReducer(companyReducer)
    
    const fetchData = async (params = defaultParams) => {
        dispatch({type: COMPANY_FETCH})
        try {
            const request = await fetch(`${API_URL}/${API_COMPANIES}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'authorization': `Bearer ${getCookie('token')}`,
                },
                body: JSON.stringify(params)
            })
            if (request.statusText === 'OK') {
                const data = await request.json()
                dispatch({
                    type: COMPANY_SUCCESS,
                    payload: {
                        ...data
                    }
                })
            } else {
                dispatch({type: COMPANY_FAILURE})
            }
        } catch(error) {
            dispatch({type: COMPANY_FAILURE})
            console.error(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const getNewPage = (numberPage) => {
        const optionTable = {...state.optionTable}
        const newParam = {
            optionTable: {
                ...optionTable,
                page: ++numberPage
            },
            search: ""
        }
        fetchData(newParam)
    }

    const getNewRows = (columns) => {
        const optionTable = {...state.optionTable}
        const newParam = {
            optionTable: {
                ...optionTable,
                itemsPerPage: columns
            },
            search: ""
        }
        fetchData(newParam)
    }

    const updateData = () => {
        const optionTable = {...state.optionTable}
        const newParam = {
            optionTable,
            search: ""
        }
        fetchData(newParam)
    }

    const searchData = (field) => {
        const optionTable = {...state.optionTable}
        const newParam = {
            optionTable,
            search: field
        }
        fetchData(newParam)
    }

    return (
        <CompanyContext.Provider value={{ ...state, getNewPage, getNewRows, updateData, searchData }}>
            {children}
        </CompanyContext.Provider>
    )
}