import { GymCardButtons, GymCardContainer, GymCardNewTraining, GymCardTable } from "./styles";
import { Image, Trash, Pencil } from 'phosphor-react'

export function GymCard() {
    return (
        <GymCardContainer>
            <GymCardTable>
                <thead>
                    <tr>
                        <th>Nome Treino</th>
                        <th>Serie</th>
                        <th>Repetições</th>
                        <th>Configurar</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>Supino inclinado</td>
                        <td>4</td>
                        <td>3</td>

                        <GymCardButtons>
                            <Image size={24} color="#00B37E" />
                            <Pencil size={24} color="#1D8DD3" />
                            <Trash size={24} color="#F75A68" />
                        </GymCardButtons>
                    </tr>

                </tbody>
            </GymCardTable>

            <GymCardNewTraining>
                Adicionar Novo Treino
            </GymCardNewTraining>

        </GymCardContainer>
    )
}