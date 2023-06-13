import { styled } from 'styled-components';

export const HeaderContainer = styled.header `
    display: flex;
    justify-content: space-around;
    align-items: center;
    
    
    width: 100vw;
    height: 5rem;

    background-color: ${props => props.theme['gray-600']};
`

export const NewGymCardButton = styled.button `
    padding: .6rem;

    border-radius: 6px;
    background-color: ${props => props.theme['green-300']}

`