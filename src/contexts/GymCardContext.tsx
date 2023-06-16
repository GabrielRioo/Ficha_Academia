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
    name: string;
    series: number;
    repetitions: number;
    weight: number;
}

interface GymCardContextType {
    cards: Card[];
    trainings: Training[];
    createCard: (data: CreateCard) => Promise<void>
    updateTraining: (data: CreateTraining, cardId: number) => Promise<void>
    
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
        const response = await api.get('/cards');

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
    }

    // Adicionar novos treinos
    async function updateTraining(data: CreateTraining, cardId: number) {
        // Obtem o registro do antigo treino pelo ID
        const fetchCardsByID = await api.get( `/cards/${cardId}`);

        // Atualiza a ficha com o novo treino
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
        <GymCardContext.Provider value={{ cards, trainings, createCard, updateTraining }}>
            {children}
        </GymCardContext.Provider>
    )
}