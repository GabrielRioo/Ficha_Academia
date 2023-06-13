import { useContext } from "react";
import { GymCardButtons, GymCardContainer, GymCardNewTraining, GymCardTable } from "./styles";
import { Image, Trash, Pencil } from 'phosphor-react'
import { GymCardContext } from "../../contexts/GymCardContext";
import { NewGymTrainingModal } from "../../components/NewGymTrainingModal";
import * as Dialog from '@radix-ui/react-dialog';

export function GymCard() {
    const { cards } = useContext(GymCardContext)


    return (
        <div>
            {
                cards.map(card => {
                    return (
                        <GymCardContainer>
                            <div>
                                <h2>{card.title}</h2>
                                <p>{card.weekDate}</p>
                            </div>

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
                                        card.training.map(training => {
                                            return (
                                                <tr key={training.id}>
                                                    <td>{training.name}</td>
                                                    <td>{training.series}</td>
                                                    <td>{training.repetitions}</td>
                                                    <td>{training.weight}</td>

                                                    <GymCardButtons>
                                                        <Dialog.Root>
                                                            <Dialog.Trigger asChild>
                                                                <Image size={24} color="#00B37E" />
                                                            </Dialog.Trigger>

                                                            <NewGymTrainingModal type="picture" />
                                                        </Dialog.Root>

                                                        <Dialog.Root>
                                                            <Dialog.Trigger asChild>
                                                            <Pencil size={24} color="#1D8DD3" />

                                                            </Dialog.Trigger>

                                                            <NewGymTrainingModal type="edit" />
                                                        </Dialog.Root>

                                                        <Dialog.Root>
                                                            <Dialog.Trigger asChild>
                                                            <Trash size={24} color="#F75A68" />


                                                            </Dialog.Trigger>

                                                            <NewGymTrainingModal type="delete" />
                                                        </Dialog.Root>
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

                                <NewGymTrainingModal type="training" />
                            </Dialog.Root>
                        </GymCardContainer>
                    )
                })
            }





        </div>
    )
}