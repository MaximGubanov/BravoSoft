import React from 'react'

import './style.css'
import { Nav } from './Navigator'
import { Container } from '../Container'


export const Header = () => {
    return(
        <div className="header">
            <Container>
                <Nav />
            </Container>
        </div>        
    )
}