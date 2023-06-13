import { ReactNode, createContext, useEffect, useState } from "react"

interface Card {
    title: string;
    weekDate: string,
    training: Training[]
}

interface Training {
    id: number;
    name: string;
    series: number;
    repetitions: number;
    weight: number;
}

interface GymCardContextType {
    cards: Card[];
}

interface GymCardProviderProps {
    children: ReactNode;
}

export const GymCardContext = createContext({} as GymCardContextType)

export function GymCardProvider({children}: GymCardProviderProps) {
    const [cards, setCards] = useState<Card[]>([])
    const [training, setTraining] = useState<Training[]>([])
    

    // Obter os cards criados
    async function LoadCards() {
        const response = await fetch('http://localhost:3000/cards');
        const dataCard = await response.json();

        setCards(dataCard);
    }

    useEffect(() => {
        LoadCards();
    }, [])

    return(
        <GymCardContext.Provider value={{cards}}>
            {children}
        </GymCardContext.Provider>
    )
}