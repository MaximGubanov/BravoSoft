import React from "react"
import styled from "styled-components"
import { Outlet } from "react-router-dom"

import { Container } from "./Container"
import { Header } from "./Header"


const Main = styled.div`
    padding: 2rem;
`

export const Layout = () => {
    return (
        <>
            <Header />
            <Main>
                <Container>
                    <Outlet/>
                </Container>
            </Main>
        </>
    )
}
