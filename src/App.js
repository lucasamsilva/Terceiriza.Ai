import React from 'react'
import Navigation from './routes/Navigation'
import { LoginProvider } from './context/loginContext'


export default props => {

    return (
        <LoginProvider>
            <Navigation />
        </LoginProvider>
    )

}