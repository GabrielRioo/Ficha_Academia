import { useContext } from "react";
import { GymCardButtons, GymCardContainer, GymCardNewTraining, GymCardTable } from "./styles";
import { Image, Trash, Pencil } from 'phosphor-react'
import { GymCardContext } from "../../contexts/GymCardContext";
import { NewGymTrainingModal } from "../../components/NewGymTrainingModal";
import * as Dialog from '@radix-ui/react-dialog';

export function GymCard() {
    const { cards } = useContext(GymCardContext)

    
    return (
        <GymCardContainer>
            <GymCardTable>
                <thead>
                    <tr>
                        <th>Nome Treino</th>
                        <th>Serie</th>
                        <th>Repetições</th>
                        <th>Carga</th>
                        <th>Configurar</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        cards.map(props => {
                            return (
                                <tr key={props.id}>
                                    <td>{props.name}</td>
                                    <td>{props.series}</td>
                                    <td>{props.repetitions}</td>
                                    <td>{props.weight}</td>

                                    <GymCardButtons>
                                        <Image size={24} color="#00B37E" />
                                        <Pencil size={24} color="#1D8DD3" />
                                        <Trash size={24} color="#F75A68" />
                                    </GymCardButtons>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </GymCardTable>

            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <GymCardNewTraining >Adicionar Novo Treino</GymCardNewTraining>
                </Dialog.Trigger>

                <NewGymTrainingModal />
            </Dialog.Root>


        </GymCardContainer>
    )
}