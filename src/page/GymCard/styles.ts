import styled from 'styled-components'

export const GymCardContainer = styled.main `
    width: 100%;
    max-width: 1120px;
    margin: 4rem auto 0;
    padding: 0 1.5rem;

    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;

    div {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 1.5rem;
    }
`

export const GymCardTable = styled.table`
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 0.5rem;
    margin-top: 1.5rem;

    th {
        padding: 1.25rem 2rem;
        background-color: ${props => props.theme['gray-600']};

        &:first-child {
        border-top-left-radius: 12px;
        }

        &:last-child {
        border-top-right-radius: 12px;
        }
    }

    td {
        padding: .7rem 2rem;
        background-color: ${props => props.theme['gray-700']};
        text-align: center;

        &:first-child {
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
        }

        &:last-child {
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
        }

        svg:hover {
            opacity: 0.7;
            cursor: pointer;
            transition: opacity .2s
        }
    }
`

export const GymCardButtons = styled.td `
    display: flex;
    justify-content: space-around;
`

export const GymCardNewTraining = styled.button `
    width: 100%;
    padding: .5rem;
    background-color: ${props => props.theme['green-300']};
    color: ${props => props.theme.white};
    font-weight: bold;

    border: 0;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;

    &:hover {
        cursor: pointer;
        background-color: ${props => props.theme['green-500']};
        transition: background-color .2s
    }
`