import { useContext } from "react";
import { GymCardButtons, GymCardContainer, GymCardNewTraining, GymCardTable, TableContainer } from "./styles";
import { Image, Trash, Pencil } from 'phosphor-react'
import { GymCardContext } from "../../contexts/GymCardContext";
import { CustomGymModal } from "../../components/NewGymTrainingModal";
import * as Dialog from '@radix-ui/react-dialog';

// interface Card {
//     id: number;
//     cardName: string;
//     weekDay: string;
//     training: Training[]
// }

// interface Training {
//     id: number;
//     name: string;
//     series: number;
//     repetitions: number;
//     weight: number;
//     image?: string;
// }

export function GymCard() {
    const { cards } = useContext(GymCardContext)

    return (
        <div>
            {
                cards.map(card => {
                    return (
                        <GymCardContainer key={card.cardName}>
                            <div>
                                <div>
                                    <h2>{card.cardName}</h2>

                                    <Dialog.Root>
                                        <Dialog.Trigger asChild>
                                            <Pencil size={24} color="#1D8DD3" />
                                        </Dialog.Trigger>

                                        <CustomGymModal type="editCard" card={card} />
                                    </Dialog.Root>

                                    <Dialog.Root>
                                        <Dialog.Trigger asChild>
                                            <Trash size={24} color="#F75A68" />
                                        </Dialog.Trigger>

                                        <CustomGymModal type="deleteCard" card={card} />
                                    </Dialog.Root>
                                </div>


                                <p>
                                    {card.weekDay === '0' && 'Segunda-feira'}
                                    {card.weekDay === '1' && 'Terça-feira'}
                                    {card.weekDay === '2' && 'Quarta-feira'}
                                    {card.weekDay === '3' && 'Quinta-feira'}
                                    {card.weekDay === '4' && 'Sexta-feira'}
                                    {card.weekDay === '5' && 'Sábado'}
                                    {card.weekDay === '6' && 'Domingo'}
                                </p>
                            </div>

                            <TableContainer>
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

                                                                <CustomGymModal type="picture" card={card} training={training} />
                                                            </Dialog.Root>

                                                            <Dialog.Root>
                                                                <Dialog.Trigger asChild>
                                                                    <Pencil size={24} color="#1D8DD3" />

                                                                </Dialog.Trigger>

                                                                <CustomGymModal type="editTraining" card={card} training={training} />
                                                            </Dialog.Root>

                                                            <Dialog.Root>
                                                                <Dialog.Trigger asChild>
                                                                    <Trash size={24} color="#F75A68" />


                                                                </Dialog.Trigger>

                                                                <CustomGymModal type="deleteTraining" card={card} training={training} />
                                                            </Dialog.Root>
                                                        </GymCardButtons>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </GymCardTable>
                            </TableContainer>

                            <Dialog.Root>
                                <Dialog.Trigger asChild>
                                    <GymCardNewTraining >Adicionar Novo Treino</GymCardNewTraining>
                                </Dialog.Trigger>

                                <CustomGymModal type="training" card={card} />
                            </Dialog.Root>
                        </GymCardContainer>
                    )
                })
            }





        </div>
    )
}