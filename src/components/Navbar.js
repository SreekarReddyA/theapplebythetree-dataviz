import styled from 'styled-components'
import { strings } from '../resources/strings';
import React from 'react';

export const Navbar = () => {
    const StickyTopDiv = styled.div`
        position: -webkit-sticky; /* Safari */
        position: sticky;
        top: 0;
        margin: 0;
        background-color: black;
    `;

    const EmphaticHeader = styled.h2`
        padding: 1%;
        font-family: monospace;
        color: white;
    `;


    return (
        <StickyTopDiv>
            <EmphaticHeader>{strings.navbarTitle}</EmphaticHeader>
        </StickyTopDiv>
    )
}