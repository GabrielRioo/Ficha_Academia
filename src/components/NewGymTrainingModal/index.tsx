import * as Dialog from "@radix-ui/react-dialog";
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from "phosphor-react";
import { CloseButton, Content, GymModalButton, GymModalInputs, Overlay } from "./styles";
import { CardForm } from "./CardForm";
import { TrainingForm } from "./TrainingForm";
import { DeleteForm } from "./DeleteForm";
import { EditForm } from "./EditForm";
import { PictureForm } from "./PictureForm";
import { useForm } from 'react-hook-form'
import { useContext, useState } from "react";
import { GymCardContext } from "../../contexts/GymCardContext";

interface Card {
    id: number;
    cardName: string;
    weekDay: string;
    training: Training[]
}

interface Training {
    id: number;
    name: string;
    series: number;
    repetitions: number;
    weight: number;
}

interface NewGymProps {
    type: 'card' | 'training' | 'picture' | 'edit' | 'delete',
    card?: Card
}

const newCardFormSchema = z.object({
    cardName: z.string(),
    weekDay: z.string(),
    training: z.tuple([]).default([])
})
type NewCardFormInputs = z.infer<typeof newCardFormSchema>

const newTrainingFormSchema = z.object({
    name: z.string(),
    series: z.number(),
    repetitions: z.number(),
    weight: z.number(),
})
type NewTrainingFormInputs = z.infer<typeof newTrainingFormSchema>


export function CustomGymModal(props: NewGymProps) {
    const { cards, createCard, updateTraining } = useContext(GymCardContext)
    // const [ training, setTraining] = useState({})
    const [ submitForm, setSubmitForm] = useState('')

    const { 
        handleSubmit,
        register,
        reset,
    } = useForm<NewCardFormInputs | NewTrainingFormInputs>({
        // resolver: zodResolver(newCardFormSchema)
    })

    const modalType = props.type;

    function handleSubmitMethodCustom(data: any) {
        if(modalType === 'card') {
            handleCreateNewCard(data)
        } 
        if (modalType === 'training') {
            handleCreateNewTraining(data)
        }
    }

    // Criar um novo Card (ficha)
    async function handleCreateNewCard(data: NewCardFormInputs) {
        console.log(data)

        const { cardName, weekDay, training } = data
        console.log(data)

        createCard({
            cardName,
            weekDay,
            training: [],
        })

        reset();
    }

    // Criar um novo Treino (ficha)
    async function handleCreateNewTraining(data: NewTrainingFormInputs) {
        let cardID = 0
        if (props.card?.id !== undefined) {
            cardID = props.card?.id
        }
        console.log(props.card?.id)
        console.log(data)
        const { name, series, repetitions, weight } = data
        // setTraining(data);

        updateTraining({
            name,
            series,
            repetitions,
            weight,
        }, cardID )

        // const { cardName, weekDay, training } = data

        // updateTraining({
        //     cardName,          
        //     weekDay,
        //     training,
        // })

        reset();
    }

    return (
        <Dialog.Portal>
            <Overlay />

            <Content>
                <Dialog.Title>
                    { modalType === 'card' && 'Nova Ficha' }
                    { modalType === 'training' && 'Novo Treino' }
                    { modalType === 'delete' && `Tem certeza que deseja excluir?` }
                    { modalType === 'edit' && 'Edite seu Treino' }
                    { modalType === 'picture' && 'Como fazer o exercício' }
                </Dialog.Title>
                <CloseButton>
                    <X size={24} />
                </CloseButton>

                <form onSubmit={handleSubmit(handleSubmitMethodCustom)}>
                    { 
                        modalType === 'card' && 
                        <div>
                            <CardForm register={register}/> 
                            <GymModalButton type="submit"  variant="green">Adicionar</GymModalButton>
                        </div>
                    }
                    { 
                        modalType === 'training' && 
                        <div>
                            <TrainingForm register={register} /> 
                            <GymModalButton type="submit"  variant="green" >Adicionar</GymModalButton>

                        </div>
                    }
                    {/* { 
                        modalType === 'delete' && 
                        <div>
                            <GymModalButton variant="red" type="submit" disabled>Excluir</GymModalButton>
                            <GymModalButton variant="green" type="submit" disabled>Não excluir</GymModalButton>
                        </div>
                    }
                    { 
                        modalType === 'edit' && 
                        <div>
                            <EditForm /> 
                            <GymModalButton variant="green" type="submit" disabled>Salvar</GymModalButton>
                        </div>
                    }
                    { 
                        modalType === 'picture' && 
                        <div>
                            <PictureForm /> 
                            <GymModalButton variant="green" type="submit" disabled>Salvar</GymModalButton>
                        </div>
                    } */}

                </form>
            </Content>
        </Dialog.Portal>
    ) 
}