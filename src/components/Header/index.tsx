import { HeaderContainer, NewGymCardButton } from "./styles";
import LogoImg from '../../assets/newLogo.png'
import *  as Dialog from '@radix-ui/react-dialog'
import { CustomGymModal } from "../NewGymTrainingModal";

export function Header() {
    return (
        <HeaderContainer>
            <img src={LogoImg} alt="" />

            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <NewGymCardButton> Nova Ficha </NewGymCardButton>
                </Dialog.Trigger>

                <CustomGymModal type="card" />
            </Dialog.Root>

        </HeaderContainer>
    )
}