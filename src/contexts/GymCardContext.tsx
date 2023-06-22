import { ReactNode, createContext, useEffect, useState } from "react"
import { api } from "../lib/axios";

interface Card {
    id: number;
    cardName: string;
    weekDay: string;
    training: Training[]
}

interface CreateCard {
    cardName: string;
    weekDay: string;
    training?: Training[]
}

interface Training {
    id: number;
    name: string;
    series: number;
    repetitions: number;
    weight: number;
    image?: string;
}

interface CreateTraining {
    id?: number;
    name: string;
    series: number;
    repetitions: number;
    weight: number;
    image?: string;
}

interface GymCardContextType {
    cards: Card[];
    trainings: Training[];
    createCard: (data: CreateCard) => Promise<void>
    deleteCard: (cardId: number) => Promise<void>
    updateCard: (data: CreateCard, cardId: number) => Promise<void>
    addNewTraining: (data: CreateTraining, cardId: number) => Promise<void>
    deleteTraining: (data: CreateTraining, trainingId: number, cardId: number) => Promise<void>
    updateTraining: (data: CreateTraining, trainingId: number, cardId: number, imageBase64: string) => Promise<void>
    updatePicture: ( trainingId: number, cardId: number, imageBase64: string) => Promise<void>
}

interface GymCardProviderProps {
    children: ReactNode;
}

export const GymCardContext = createContext({} as GymCardContextType)

export function GymCardProvider({ children }: GymCardProviderProps) {
    const [cards, setCards] = useState<Card[]>([])
    const [trainings, setTrainings] = useState<Training[]>([])


    // Obter os cards criados
    async function fetchCards(query?: string) {
        const response = await api.get('/cards', {
            params: {
                _sort: 'weekDay',
                _order: 'asc'
            }
        });

        setCards(response.data);
    }

    // Criar novos Cards
    async function createCard(data: CreateCard) {
        const { cardName, weekDay, training } = data

        const response = await api.post('/cards', {
            cardName,
            weekDay,
            training
        })

        setCards((state) => [...state, response.data])

        // Atualiza a página com a lista atualizada
        fetchCards();
    }

    async function deleteCard(cardId: number) {
        const response = await api.delete(`/cards/${cardId}`)

        // Atualiza a página com a lista atualizada
        fetchCards();
    }

    async function updateCard(data: CreateCard, cardId: number) {
        const response = await api.patch(`/cards/${cardId}`, data)

        // Atualiza a página com a lista atualizada
        fetchCards();
    }

    // Adicionar novos treinos
    async function addNewTraining(data: CreateTraining, cardId: number) {
        // Obtem o registro do antigo treino pelo ID
        const fetchCardsByID = await api.get( `/cards/${cardId}`);
        
        // Atualiza a ficha com o novo treino
        data.id = fetchCardsByID.data.training.length + 1;
        data.image = ""
        fetchCardsByID.data.training.push(data)

        // Atualiza a ficha antiga pela nova
        await api.patch(`/cards/${cardId}`, fetchCardsByID.data)

        // Atualiza a página com a lista atualizada
        fetchCards();
    }

    // Adicionar novos treinos
    async function deleteTraining(data: CreateTraining, trainingId: number, cardId: number) {
        // Obtem o registro do antigo treino pelo ID
        const fetchCardsByID = await api.get( `/cards/${cardId}`);

        // Buscar o treino pelo ID
        let removeTraining = fetchCardsByID.data.training.filter(training => training.id !== trainingId)
        fetchCardsByID.data.training = removeTraining;

        // Atualiza a ficha antiga pela nova
        await api.patch(`/cards/${cardId}`, fetchCardsByID.data)

        // Atualiza a página com a lista atualizada
        fetchCards();
    }

    // Adicionar novos treinos
    async function updateTraining(data: CreateTraining, trainingId: number, cardId: number, image: string) {
        // Obtem o registro do antigo treino pelo ID
        const fetchCardsByID = await api.get( `/cards/${cardId}`);

        // Removendo o treino que esta sendo editado da lita de treino
        let oldTrainingWithoutTheEdit = fetchCardsByID.data.training.filter(training => training.id !== trainingId)
        fetchCardsByID.data.training = oldTrainingWithoutTheEdit;
        
        // Adicionando o novo treino editado a lista de treinos
        let updatingTraining = fetchCardsByID.data.training.filter(training => training.id === trainingId)
        data.image = image;
        data.id = trainingId;
        updatingTraining = data

        // console.log('oldCard: ', fetchCardsByID.data.training)
        fetchCardsByID.data.training.push(updatingTraining);

        // Atualiza a ficha antiga pela nova
        await api.patch(`/cards/${cardId}`, fetchCardsByID.data)

        // Atualiza a página com a lista atualizada
        fetchCards();
    }

    async function updatePicture(cardId: number, trainingId: number, imageBase64: string) {
        // Obtem o registro do antigo treino pelo ID
        const fetchCardsByID = await api.get( `/cards/${cardId}`);
        console.log('inicial: ',fetchCardsByID.data)

        let getCurrentTraining = fetchCardsByID.data.training.filter(training => training.id === trainingId)
        console.log('current: ', getCurrentTraining)
        getCurrentTraining[0].image = imageBase64

        // // Removendo o treino que esta sendo editado da lita de treino
        let oldTrainingWithoutTheEdit = fetchCardsByID.data.training.filter(training => training.id !== trainingId)
        fetchCardsByID.data.training = oldTrainingWithoutTheEdit;
        fetchCardsByID.data.training.push(getCurrentTraining[0])

        // Atualiza a ficha antiga pela nova
        await api.patch(`/cards/${cardId}`, fetchCardsByID.data)

        // Atualiza a página com a lista atualizada
        fetchCards();
    }

    useEffect(() => {
        fetchCards();
    }, [])

    return (
        <GymCardContext.Provider value={{ cards, trainings, createCard, updateCard, deleteCard, addNewTraining, deleteTraining, updateTraining, updatePicture }}>
            {children}
        </GymCardContext.Provider>
    )
}