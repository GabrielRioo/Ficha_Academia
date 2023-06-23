import * as Dialog from "@radix-ui/react-dialog";
import * as z from "zod";
import { X } from "phosphor-react";
import { CloseButton, Content, GymModalButton, Overlay } from "./styles";
import { CardForm } from "./CardForm";
import { TrainingForm } from "./TrainingForm";
import { EditCardForm } from "./EditForm/Card";
import { EditTrainingForm } from "./EditForm/Training";
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
    repetitions: string;
    weight: string;
    image?: string;
}

interface NewGymProps {
    type: 'card' | 'training' | 'picture' | 'edit' | 'editCard' | 'deleteTraining' | 'deleteCard' | 'editTraining',
    card?: Card,
    training?: Training
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
    repetitions: z.string(),
    weight: z.string(),
    image: z.string(),
})
type NewTrainingFormInputs = z.infer<typeof newTrainingFormSchema>


export function CustomGymModal(props: NewGymProps) {
    const { createCard, updateCard, deleteCard, addNewTraining, deleteTraining, updateTraining } = useContext(GymCardContext)
    const [jsonObject, setJsonObject] = useState<{ image: string }>({ image: '' });

    const {
        handleSubmit,
        register,
        reset,
    } = useForm<NewCardFormInputs | NewTrainingFormInputs>({
        // resolver: zodResolver(newCardFormSchema)
    })

    const modalType = props.type;

    function handleSubmitMethodCustom(data: any) {
        if (modalType === 'card') {
            handleCreateNewCard(data)
        }
        if (modalType === 'deleteCard') {
            handleDeleteCard()
        }
        if (modalType === 'editCard') {
            handleUpdateCard(data)
        }
        if (modalType === 'training') {
            handleCreateNewTraining(data)
        }
        if (modalType === 'deleteTraining') {
            handleDeleteTraining()
        }
        if (modalType === 'editTraining') {
            handleUpdateTraining(data)
        }
    }

    // Criar um novo Card (ficha)
    async function handleCreateNewCard(data: NewCardFormInputs) {
        const { cardName, weekDay } = data

        createCard({
            cardName,
            weekDay,
            training: [],
        })

        reset();
    }

    // Criar um novo Treino (ficha)
    async function handleCreateNewTraining(data: NewTrainingFormInputs) {
        const { name, series, repetitions, weight } = data
        console.log(data)

        let cardID = 0
        if (props.card?.id !== undefined) cardID = props.card?.id

        addNewTraining({
            name,
            series,
            repetitions,
            weight,
        }, cardID)

        reset();
    }

    async function handleDeleteTraining() {
        let cardID = props.card?.id!
        let trainingID = props.training?.id!
        // if (props.card?.id !== undefined) cardID = props.card?.id

        deleteTraining(trainingID, cardID)
    }

    async function handleUpdateTraining(data: NewTrainingFormInputs) {
        const { name, series, repetitions, weight } = data

        let cardID = props.card?.id!
        let trainingID = props.training?.id!
        let image = props.training?.image!
        // if (props.card?.id !== undefined) cardID = props.card?.id

        updateTraining({
            name,
            series,
            repetitions,
            weight,
        }, trainingID, cardID, image)
    }

    async function handleDeleteCard() {
        let cardID = 0
        if (props.card?.id !== undefined) cardID = props.card?.id

        deleteCard(cardID)
    }

    async function handleUpdateCard(data: NewCardFormInputs) {
        let cardID = 0
        if (props.card?.id !== undefined) cardID = props.card?.id

        updateCard(data, cardID)
    }

    const handleImageUpload = (imageData: string) => {
        setJsonObject({ image: imageData });
        console.log(jsonObject)
      };

    return (
        <Dialog.Portal>
            <Overlay />

            <Content>
                <Dialog.Title>
                    {modalType === 'card' && 'Nova Ficha'}
                    {modalType === 'training' && 'Novo Treino'}
                    {modalType === 'deleteCard' && `Tem certeza que deseja excluir?`}
                    {modalType === 'deleteTraining' && `Tem certeza que deseja excluir?`}
                    {modalType === 'editCard' && 'Edite sua Ficha'}
                    {modalType === 'editTraining' && 'Edite seu Treino'}
                    {modalType === 'picture' && 'Como fazer o exercício'}
                </Dialog.Title>
                <p>{modalType === 'deleteCard' && `Após expcluir a ficha ${props.card?.cardName} não será possivel recupera-lo`}</p>
                <CloseButton>
                    <X size={24} />
                </CloseButton>

                <form onSubmit={handleSubmit(handleSubmitMethodCustom)}>
                    {
                        modalType === 'card' &&
                        <div>
                            <CardForm register={register} />
                            <GymModalButton type="submit" variant="green">Adicionar</GymModalButton>
                        </div>
                    }
                    {
                        modalType === 'training' &&
                        <div>
                            <TrainingForm register={register} />
                            <GymModalButton type="submit" variant="green" >Adicionar</GymModalButton>
                        </div>
                    }
                    {
                        modalType === 'deleteCard' &&
                        <div>
                            <GymModalButton variant="red" type="submit" >Excluir</GymModalButton>
                            <GymModalButton variant="green" type="submit" disabled>Não excluir</GymModalButton>
                        </div>
                    }
                    {
                        modalType === 'editCard' &&
                        <div>
                            <EditCardForm register={register} valuesToChange={props.card} />
                            <GymModalButton variant="green" type="submit">Salvar</GymModalButton>
                        </div>
                    }
                    {
                        modalType === 'deleteTraining' &&
                        <div>
                            <GymModalButton variant="red" type="submit" >Excluir</GymModalButton>
                            <GymModalButton variant="green" type="submit" disabled>Não excluir</GymModalButton>
                        </div>
                    }
                    {
                        modalType === 'editTraining' &&
                        <div>
                            <EditTrainingForm register={register} valuesToChange={props.training} />
                            <GymModalButton variant="green" type="submit">Salvar</GymModalButton>
                        </div>
                    }
                    {
                        modalType === 'picture' &&
                        <div>
                            <PictureForm onImageUpload={handleImageUpload} cardId={props.card?.id!} trainingId={props.training?.id!} trainingImage={props.training?.image!}/>
                            <p style={{color: 'red', textAlign: 'center', marginTop: '1rem'}}>Função ainda não disponível.</p>
                            <GymModalButton variant="green" type="submit" disabled>Salvar</GymModalButton>
                        </div>
                    }

                </form>
            </Content>
        </Dialog.Portal>
    )
}