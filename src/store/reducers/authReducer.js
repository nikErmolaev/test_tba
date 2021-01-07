import {
    AUTH_FETCH,
    AUTH_SUCCESS,
    AUTH_FAILURE,
    AUTH_LOGOUT
} from '../types'

const initialState = {
    roles: [],
    isLoading: false,
    isError: false,
}

export const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case AUTH_FETCH: {
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        }
        case AUTH_SUCCESS: {
            return {
                ...state,
                roles: [...action.payload.roles],
                isLoading: false,
                isError: false
            }
        }
        case AUTH_FAILURE: {
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        }
        case AUTH_LOGOUT: {
            return {
                ...state,
                roles: [],
                isLoading: false,
                isError: false
            }
        }
        default: return state
    }
}