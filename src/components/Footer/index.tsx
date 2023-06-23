import { FooterContainer, FooterSocialMedias } from "./styles";
import { InstagramLogo, GithubLogo } from 'phosphor-react'

export function Footer(){
    return(
        <FooterContainer>
            Developed by Gabriel Rio - 06/2023

            <FooterSocialMedias>
                <a href="https://www.instagram.com/gabrielrioo/" target="_blank">
                    <InstagramLogo size={30} />
                </a>
               
                <a href="https://github.com/GabrielRioo" target="_blank">
                    <GithubLogo size={30} />
                </a>
            </FooterSocialMedias>
        </FooterContainer>
    )
}