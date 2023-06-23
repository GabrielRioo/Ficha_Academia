import { styled } from "styled-components";

export const FooterContainer = styled.footer`
    height: 6rem;
    margin-top: 3rem;
    background-color: ${props => props.theme['gray-700']};
    font-size: 1.1rem;
    color: ${props => props.theme['gray-300']};

    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: .5rem;

`

export const FooterSocialMedias = styled.div `
    display: flex;
    gap: .5rem;

    a {
        color: ${props => props.theme['gray-300']};
    }

    svg:hover {
        color: ${props => props.theme['green-300']};
        transition: color .2s;
    }
`