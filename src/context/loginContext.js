import React, { createContext, useReducer } from 'react'

const initialState = { logado: false };
const loginContext = createContext({});

function reducer(state, action) {
    switch (action.type) {
        case 'Login':
            const {token} = action.payload;
            return {
                ...state,
                logado: true,
                token
            }
        case 'Logout':
            return {
                ...state,
                logado: false,
            }

        default:
            break;
    }
}

export const LoginProvider = props => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <loginContext.Provider value={{ state, dispatch }}>
            {props.children}
        </loginContext.Provider>
    )
}

export default loginContext;