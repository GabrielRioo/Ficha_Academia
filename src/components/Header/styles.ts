import { styled } from 'styled-components';

export const HeaderContainer = styled.header `
    display: flex;
    justify-content: space-around;
    align-items: center;
    
    height: 5rem;

    background-color: ${props => props.theme['gray-600']};

    img {
        width: 10rem;
        height: 4em;
        margin-top: -0.6rem;
    }
`

export const NewGymCardButton = styled.button `
    padding: .8rem 1.5rem;

    border: 0;
    border-radius: 6px;
    background-color: ${props => props.theme['green-300']};
    color: ${props => props.theme.white};
    font-weight: bold;

    cursor: pointer;

    &:not(:disabled):hover {
        background-color: ${props => props.theme['green-500']};
        transition: background-color .2s;
    }
`