import styled from 'styled-components'

export const GymCardContainer = styled.main`
    width: 100%;
    max-width: 1120px;
    margin: 4rem auto 0;
    padding: 0 1.5rem;

    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;

    div {
        width: calc(100% - 1.8rem);
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: .4rem;
        margin-left: 6rem;

        p {
            background-color: ${props => props.theme['gray-500']};
            padding: .2rem .8rem;
            border-radius: 12px;
            font-size: .7rem;
            margin: 0 2rem;
            width: 9rem;
            text-align: center;
        }

        svg:hover{
            cursor: pointer;
            opacity: 0.7;
            transition: opacity .2s
        }

    }

    @media(max-width: 415px) {
        display: block;
        padding: 0;

        div {
            display: block;
            margin: 0 auto .5rem;
            text-align: center;

            p {
                margin: auto;
            }

            h2{
                display:inline-block;
                margin-right: 1rem;
            }
        }
            
    }

    @media(max-width: 375px) {
        display: block;
        padding: 0;
        text-align: center;


        div {
            display: block;
            margin-left: 0;

            p {
                margin: auto;
            }

            h2{
                display:inline-block;
            }
        }
    }
`

export const TableContainer = styled.section`
    width: 100%;
    overflow-x: auto;
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
            width: 30rem;
            border-top-left-radius: 12px;
        }

        &:last-child {
            border-top-right-radius: 12px;
        }
    }

    td {
        /* padding: .7rem 2rem; */
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

    @media(max-width: 415px) {
        margin-top: 0;

        th {
            &:first-child {
                min-width: 100vw;
            }
        }
    }

    @media(max-width: 375px) {
        margin-top: 0;

        th {
            &:first-child {
                min-width: 100vw;
            }
        }
    }
`

export const GymCardButtons = styled.td`
    display: flex;
    justify-content: space-around;
    padding: .7rem 2rem;
`

export const GymCardNewTraining = styled.button`
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