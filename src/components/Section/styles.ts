import styled from 'styled-components'

export const Container = styled.div<{ $darkMode: boolean }>`
    width: 40%;
    height: 1000px;
    background: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    div {
        background-color: ${props => props.$darkMode ? '#000' : '#fff'};
        color: ${props => props.$darkMode ? '#fff' : '#000'};
        padding: 20px;
        border-radius: 10px;
        text-align: center;
    }

    button {
        padding: 10px;
        border: none;
        margin-top: 20px;
        border-radius: 10px;
        background-color: #fff;
        color: #000;
        cursor: pointer;
    }

    h1 {
        font-size: 50px;
    }

    p {
        font-size: 25px;
    }
`