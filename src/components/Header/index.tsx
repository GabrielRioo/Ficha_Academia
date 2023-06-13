import { NewGymCardModal } from "../NewGymCardModal";
import { HeaderContainer, NewGymCardButton } from "./styles";
import LogoImg from '../../assets/Logo.svg'
import *  as Dialog from '@radix-ui/react-dialog'
import { NewGymTrainingModal } from "../NewGymTrainingModal";

export function Header() {
    return (
        <HeaderContainer>
            <img src={LogoImg} alt="" />

            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <NewGymCardButton> Nova Ficha </NewGymCardButton>
                </Dialog.Trigger>

                <NewGymTrainingModal type="card" />
            </Dialog.Root>

        </HeaderContainer>
    )
}