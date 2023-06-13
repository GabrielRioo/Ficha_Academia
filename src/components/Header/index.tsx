import { NewGymCardModal } from "../NewGymCardModal";
import { HeaderContainer, NewGymCardButton } from "./styles";
import LogoImg from '../../assets/Logo.svg'

export function Header() {
    return (
        <HeaderContainer>
            <img src={LogoImg} alt=""/>
            <NewGymCardButton> Nova Ficha </NewGymCardButton>
        </HeaderContainer>
    )
}