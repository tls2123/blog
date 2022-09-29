import styled from "styled-components";

export const Back = styled.div`
background-image: linear-gradient(270deg, red, yellow);

`
export const NAV = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    font-weight: bold;

    @media screen and (max-width: 500px) {
        flex-direction: column;
        align-items: flex-start;
        padding: 8px 24px;
    }
`;

export const LOGO = styled.div`
    font-size: 24px;
    padding-left: 2em;
`;

export const UL = styled.ul`
    display: flex;
    list-style: none;
    padding-left: 0;
    padding-top: 1em;
    font-size: 15px;

    a{
        text-decoration: none;
        color: black;
        margin-right: 3em;
    }

    @media screen and (max-width: 500px) {
        display: none;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }
`;

export const LI = styled.li`
    padding: 8px 12px;

    hover {
        background-color: grey;
        border-radius: 4px;
    }
    @media screen and (max-width: 500px) {
        width: 100%;
        text-align: center;
    }
`;

export const BTN = styled.div`
    display: none;
    position: absolute;
    right: 32px;
    top: 10px;
    font-size: 24px;
    color: black;
    
    @media screen and (max-width: 500px) {
        display: block;
    }
`;
export const Container = styled.div`
    justify-content: center;
`;
export const Btn = styled.button`
    padding: 0;
    border: none;
    background: none;
    font-weight: bold;
`;