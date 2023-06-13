import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle `
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background-color: ${props => props.theme['gray-800']};
        color: ${props => props.theme['gray-100']};
        -webkit-font-smoothing: antialised;
    }

    body, input-security, textarea, button {
        font: 400 1rem Roboto, sans-serif;
    }
`