import React, {useContext, useEffect, useReducer} from 'react'
import {
    STOCKS_FETCH,
    STOCKS_SUCCESS,
    STOCKS_FAILURE
} from '../types'
import {
    API_URL,
    API_STOCKS,
    API_CHANGE_STOCK,
    TOKEN_SITE
} from '../api'
import { stocksReducer } from '../reducers/stocksReducer'
import { StocksContext } from '../context/stocksContext'

import { getCookie } from '../helperCookie'

import { CompanyContext } from '../context/companyContext'

const defaultParams = {
    optionTable: {
        page: 1, 
        itemsPerPage: 10, 
        serverItemsLength: -1
    }
}

export const StocksContainer = ({children}) => {
    const [state, dispatch] = useReducer(stocksReducer)
    const companyContext = useContext(CompanyContext)

    const fetchData = async (params = defaultParams) => {
        dispatch({type: STOCKS_FETCH})
        try {
            const request = await fetch(`${API_URL}/${API_STOCKS}`, {
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
                    type: STOCKS_SUCCESS,
                    payload: {
                        ...data
                    }
                })
            } else {
                dispatch({type: STOCKS_FAILURE})
            }
        } catch(error) {
            dispatch({type: STOCKS_FAILURE})
            console.error(error)
        }
    }
    
    useEffect(() => {
        fetchData()
    }, [])

    const changeData = async (url = API_STOCKS, method = 'POST', body = undefined) => {
        try {
            const request = await fetch(`${API_URL}/${url}`, {
                method: method,
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'authorization': `Bearer ${getCookie('token')}`,
                },
                body: body ? JSON.stringify(body) : undefined
            })
            
            if (request.statusText === 'OK') {
                const optionTable = {...state.optionTable}
                const newParam = {
                    optionTable,
                }
                fetchData(newParam)
                companyContext.updateData()
            }
        } catch(error) {
            console.error(error)
        }
    }

    const getNewPage = (numberPage) => {
        const optionTable = {...state.optionTable}
        const newParam = {
            optionTable: {
                ...optionTable,
                page: ++numberPage
            }
        }
        fetchData(newParam)
    }

    const getNewRows = (columns) => {
        const optionTable = {...state.optionTable}
        const newParam = {
            optionTable: {
                ...optionTable,
                itemsPerPage: columns
            }
        }
        fetchData(newParam)
    }

    const addMarket = (companyId, symbol) => {
        changeData(API_CHANGE_STOCK, 'POST', {
            companyId,
            symbol
        })
    }

    const deleteMarket = (companyId) => {
        const url = `${API_CHANGE_STOCK}?stockId=${companyId}`
        changeData(url, 'DELETE')
    }

    return (
        <StocksContext.Provider value={{ ...state, addMarket, deleteMarket, getNewPage, getNewRows }}>
            {children}
        </StocksContext.Provider>
    )
}