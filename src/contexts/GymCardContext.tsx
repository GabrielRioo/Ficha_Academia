import { ReactNode, createContext, useEffect, useState } from "react"
import { api } from "../lib/axios";

interface Card {
    id: number;
    cardName: string;
    weekDay: string;
    training: Training[]
}

interface CreateCard {
    id?: string;
    cardName: string;
    weekDay: string;
    training?: Training[]
}

interface Training {
    id: number;
    name: string;
    series: number;
    repetitions: string;
    weight: string;
    image?: string;
}

interface CreateTraining {
    id?: number;
    name: string;
    series: number;
    repetitions: string;
    weight: string;
    image?: string;
}

interface GymCardContextType {
    cards: Card[];
    // trainings: Training[];
    createCard: (data: CreateCard) => Promise<void>
    deleteCard: (cardId: number) => Promise<void>
    updateCard: (data: CreateCard, cardId: number) => Promise<void>
    addNewTraining: (data: CreateTraining, cardId: number) => Promise<void>
    deleteTraining: (trainingId: number, cardId: number) => Promise<void>
    updateTraining: (data: CreateTraining, trainingId: number, cardId: number, imageBase64: string) => Promise<void>
    updatePicture: ( trainingId: number, cardId: number, imageBase64: string) => Promise<void>
}

interface GymCardProviderProps {
    children: ReactNode;
}

export const GymCardContext = createContext({} as GymCardContextType)

export function GymCardProvider({ children }: GymCardProviderProps) {
    const [cards, setCards] = useState<Card[]>([])
    // const [trainings, setTrainings] = useState<Training[]>([])
    // Training[] trainings = Training[]


    // Obter os cards criados
    async function fetchCards() {
        let localStorageResponse = ''
        if (localStorage.getItem('cards') !== null) {
            localStorageResponse = localStorage.getItem('cards')!;
            setCards(JSON.parse(localStorageResponse));
        }


        // const response = await api.get('/cards', {
        //     params: {
        //         _sort: 'weekDay',
        //         _order: 'asc'
        //     }
        // });

    }

    // Criar novos Cards
    async function createCard(data: CreateCard) {
        // using local storage to persist data
        const getLocalStorage = localStorage.getItem('cards')
        if (getLocalStorage !== null) {
            const updateLocalStorage = JSON.parse(getLocalStorage);
            data.id = updateLocalStorage.length + 1;
            updateLocalStorage.push(data)

            localStorage.setItem('cards', JSON.stringify(updateLocalStorage))
        }
        else {
            data.id = '1';
            localStorage.setItem('cards', JSON.stringify([data]))
        }

        // using API's to persist data 
        // const { cardName, weekDay, training } = data
        
        // const response = await api.post('/cards', {
        //     cardName,
        //     weekDay,
        //     training
        // })

        // setCards((state) => [...state, response.data])

        // Atualiza a página com a lista atualizada
        fetchCards();
    }

    async function deleteCard(cardId: number) {
        // using local storage to persist data
        const getLocalStorage = JSON.parse(localStorage.getItem('cards')!)
        const removingCardByID = getLocalStorage.filter((card: any) => card.id !== cardId)

        localStorage.setItem('cards', JSON.stringify(removingCardByID))
        
        // using API's to persist data 
        // await api.delete(`/cards/${cardId}`)

        // Atualiza a página com a lista atualizada
        fetchCards();
    }

    async function updateCard(data: CreateCard, cardId: number) {
        // using local storage to persist data
        const getLocalStorage = JSON.parse(localStorage.getItem('cards')!)

        const getCardByID = getLocalStorage.filter((card: any) => card.id === cardId)
        getCardByID[0].cardName = data.cardName;
        getCardByID[0].weekDay = data.weekDay

        const newCard = getLocalStorage.filter((card: any) => card.id !== cardId)
        newCard.push(getCardByID[0])

        localStorage.setItem('cards', JSON.stringify(newCard))

        // using API's to persist data 
        // await api.patch(`/cards/${cardId}`, data)

        // Atualiza a página com a lista atualizada
        fetchCards();
    }

    // Adicionar novos treinos
    async function addNewTraining(data: CreateTraining, cardId: number) {
        // using local storage to persist data
        const getLocalStorage = JSON.parse(localStorage.getItem('cards')!)
        const getCardByID = getLocalStorage.filter((card: any) => card.id === cardId)
        data.id = getCardByID[0].training.length + 1;
        data.image = "";

        getCardByID[0].training.push(data)

        const removingOldCardByID = getLocalStorage.filter((card: any) => card.id !== cardId)
        removingOldCardByID.push(getCardByID[0])

        localStorage.setItem('cards', JSON.stringify(removingOldCardByID))
        
        // using API's to persist data
        // Obtem o registro do antigo treino pelo ID
        // const fetchCardsByID = await api.get( `/cards/${cardId}`);
        
        // // Atualiza a ficha com o novo treino
        // data.id = fetchCardsByID.data.training.length + 1;
        // data.image = ""
        // fetchCardsByID.data.training.push(data)

        // // Atualiza a ficha antiga pela nova
        // await api.patch(`/cards/${cardId}`, fetchCardsByID.data)

        // Atualiza a página com a lista atualizada
        fetchCards();
    }

    // Adicionar novos treinos
    async function deleteTraining(trainingId: number, cardId: number) {
        const getLocalStorage = JSON.parse(localStorage.getItem('cards')!)

        //obtem o Card pelo ID
        const getCardByID = getLocalStorage.filter((card: any) => card.id === cardId)

        // Obtem todos o treinos, exceto o que esta sendo deletado
        const currentTrainings = getCardByID[0].training.filter((training: any) => training.id !== trainingId)
        getCardByID[0].training = currentTrainings

        // remove o card antigo
        const removeOldCardByID = getLocalStorage.filter((card: any) => card.id !== cardId)

        // adiciona o card atualizado
        removeOldCardByID.push(getCardByID[0])

        localStorage.setItem('cards', JSON.stringify(removeOldCardByID))

        // using API's to persist data
        // Obtem o registro do antigo treino pelo ID
        // const fetchCardsByID = await api.get( `/cards/${cardId}`);

        // // Buscar o treino pelo ID
        // let removeTraining = fetchCardsByID.data.training.filter((training: any) => training.id !== trainingId)
        // fetchCardsByID.data.training = removeTraining;

        // // Atualiza a ficha antiga pela nova
        // await api.patch(`/cards/${cardId}`, fetchCardsByID.data)

        // Atualiza a página com a lista atualizada
        fetchCards();
    }

    // Adicionar novos treinos
    async function updateTraining(data: CreateTraining, trainingId: number, cardId: number, image: string) {
        const getLocalStorage = JSON.parse(localStorage.getItem('cards')!)

        //obtem o Card pelo ID
        const getCardByID = getLocalStorage.filter((card: any) => card.id === cardId)

        // Obtem todos o treinos, exceto o que esta sendo deletado
        const currentTrainings = getCardByID[0].training.filter((training: any) => training.id !== trainingId)
        getCardByID[0].training = currentTrainings;

        // Adicionando o novo treino editado a lista de treinos
        data.image = image;
        data.id = trainingId;
        getCardByID[0].training.push(data)

        // remove o card antigo
        const removeOldCardByID = getLocalStorage.filter((card: any) => card.id !== cardId)

        // adiciona o card atualizado
        removeOldCardByID.push(getCardByID[0])

        localStorage.setItem('cards', JSON.stringify(removeOldCardByID))

        // using API's to persist data
        // Obtem o registro do antigo treino pelo ID
        // const fetchCardsByID = await api.get( `/cards/${cardId}`);

        // // Removendo o treino que esta sendo editado da lita de treino
        // let oldTrainingWithoutTheEdit = fetchCardsByID.data.training.filter((training: any) => training.id !== trainingId)
        // fetchCardsByID.data.training = oldTrainingWithoutTheEdit;
        
        // // Adicionando o novo treino editado a lista de treinos
        // let updatingTraining = fetchCardsByID.data.training.filter((training: any) => training.id === trainingId)
        // data.image = image;
        // data.id = trainingId;
        // updatingTraining = data

        // // console.log('oldCard: ', fetchCardsByID.data.training)
        // fetchCardsByID.data.training.push(updatingTraining);

        // // Atualiza a ficha antiga pela nova
        // await api.patch(`/cards/${cardId}`, fetchCardsByID.data)

        // Atualiza a página com a lista atualizada
        fetchCards();
    }

    async function updatePicture(cardId: number, trainingId: number, imageBase64: string) {
        // Obtem o registro do antigo treino pelo ID
        const fetchCardsByID = await api.get( `/cards/${cardId}`);
        console.log('inicial: ',fetchCardsByID.data)

        const getCurrentTraining = fetchCardsByID.data.training.filter((training: any) => training.id === trainingId)
        console.log('current: ', getCurrentTraining)
        getCurrentTraining[0].image = imageBase64

        // // Removendo o treino que esta sendo editado da lita de treino
        const oldTrainingWithoutTheEdit = fetchCardsByID.data.training.filter((training: any) => training.id !== trainingId)
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
        <GymCardContext.Provider value={{ cards, createCard, updateCard, deleteCard, addNewTraining, deleteTraining, updateTraining, updatePicture }}>
            {children}
        </GymCardContext.Provider>
    )
}