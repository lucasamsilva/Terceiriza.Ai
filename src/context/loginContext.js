import React, { createContext, useReducer } from 'react'
import api from '../api';

const initialState = { logado: false, loading: true };
const loginContext = createContext({});

function reducer(state, action) {
    switch (action.type) {
        case 'Login':
            const { token, id, cpf, cnpj} = action.payload;
            console.log(token)
            // api.defaults.headers.commom['Authorization'] = 'Bearer' + token;
            return {
                ...state,
                logado: true,
                token,
                id,
                cpf,
                cnpj
            }
        case 'Logout':
            return {
                ...state,
                logado: false,
            }
        case 'Loading':
            return {
                ...state,
                loading: action.payload,
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