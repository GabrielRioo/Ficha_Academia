import * as Dialog from "@radix-ui/react-dialog";
import styled from "styled-components";

export const Overlay = styled(Dialog.Overlay)`
    position: fixed;
    width: 100vw;
    height: 100vh;
    inset: 0;
    background: rgba(0,0,0, .75);
`

export const Content = styled(Dialog.Content)`
    min-width: 32rem;
    border-radius: 6px;
    padding: 2.5rem 3rem;
    background-color: ${props => props.theme['gray-800']};

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    @media(max-width: 415px) {
        min-width: 22rem;
        /* transform: translate(-50%, -50%); */
    }

    @media(max-width: 375px) {
        min-width: 22rem;
        /* transform: translate(-58%, -60%); */
    }

    form {
        display: flex;
        flex-direction: column;
        gap: .8rem;
        margin-top: 2rem;

    }
`

interface GymModalButtonProps {
    variant: 'green' | 'red',
}

export const GymModalButton = styled.button<GymModalButtonProps>`
    width: 100%;
    height: 3rem;
    border: 0;
    border-radius: 6px;
    font-weight: bold;
    margin-top: 1rem;

    background-color: ${props => props.variant === 'green' ? props.theme['green-300'] : props.theme['red-300']};
    color: ${props => props.theme.white};

    &:disabled {
        opacity: .7;
        cursor: not-allowed;
    }

    &:not(:disabled):hover {
        cursor: pointer;
        background-color: ${props => props.theme['green-500']};
    }
`

export const GymModalInputs = styled.div`
    display: flex;
    flex-direction: column;
    gap: .8rem;

    label {
        color: ${props => props.theme['gray-300']};
        font-size: 1rem;
        margin-left: .5rem;
        margin-bottom: -0.4rem;
    }

    input + label {
        margin-top: .5rem;
    }

    input,select {
        width: 100%;
        border: 0;
        border-radius: 6px;
        padding: 1rem;

        background-color: ${props => props.theme['gray-900']};
        color: ${props => props.theme['gray-300']};

        &::placeholder {
            color: ${props => props.theme['gray-500']};
        } 
    }

    img {
        
        width: 30rem;
        max-width: 30rem;
        max-height: 20rem;
        border: 2px solid ${props => props.theme['green-300']};
        border-radius: 6px;
    }

    
`


export const CloseButton = styled(Dialog.Close)`
    position: absolute;
    right: 2rem;
    top: 2rem;

    background-color: transparent;
    border: 0;

    color: ${props => props.theme.white};
    cursor: pointer;
    line-height: 0;
`