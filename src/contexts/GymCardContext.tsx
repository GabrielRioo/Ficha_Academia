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
}

interface CreateTraining {
    id?: number;
    name: string;
    series: number;
    repetitions: number;
    weight: number;
}

interface GymCardContextType {
    cards: Card[];
    trainings: Training[];
    createCard: (data: CreateCard) => Promise<void>
    deleteCard: (cardId: number) => Promise<void>
    updateCard: (data: CreateCard, cardId: number) => Promise<void>
    addNewTraining: (data: CreateTraining, cardId: number) => Promise<void>
    
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
        fetchCardsByID.data.training.push(data)

        // Atualiza a ficha antiga pela nova
        await api.patch(`/cards/${cardId}`, fetchCardsByID.data)

        // Atualiza a página com a lista atualizada
        fetchCards();
    }

    useEffect(() => {
        fetchCards();
    }, [])

    return (
        <GymCardContext.Provider value={{ cards, trainings, createCard, updateCard, deleteCard, addNewTraining }}>
            {children}
        </GymCardContext.Provider>
    )
}