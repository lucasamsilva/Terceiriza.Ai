import React, { createContext, useReducer } from 'react'

const initialState = { logado: false };
const loginContext = createContext({});

export const LoginProvider = props => {

    function reducer(state, action) {
        switch (action.type) {
            case 'Login':
                return {
                    ...state,
                    logado: true
                }
            case 'Logout':
                return {
                    ...state,
                    logado: false
                }

            default:
                break;
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <loginContext.Provider value={{ state, dispatch }}>
            {props.children}
        </loginContext.Provider>
    )
}

export default loginContext;