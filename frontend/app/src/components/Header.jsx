import React from "react"
import styled from "styled-components"

import { Navbar } from "./Nav"
import { Container } from "./Container"


const Head = styled.div`
    padding 20px 10px;
    background: #3F278A;
    font-size: lager;
`

export const Header = () => {
    return(
        <Head>
            <Container>
                <Navbar/>
            </Container>
        </Head>        
    )
}