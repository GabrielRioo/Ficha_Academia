import React, { /*useContext,*/ useEffect, useState } from 'react';
import { GymModalInputs } from '../styles';
// import { GymCardContext } from '../../../contexts/GymCardContext';
import { Trainings } from './trainings'

interface ImageUploaderProps {
    onImageUpload: (imageData: string) => void;
    cardId: number,
    trainingId: number,
    trainingImage: string,
}

export const converterParaBase64 = (
    file: File,
    removerContentType = true,
): Promise<string> => {
    return new Promise((resolve, reject) => {
        try {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () =>
                resolve(
                    removerContentType ? (reader.result as string).split(',')[1] : (reader.result as string),
                )
            reader.onerror = (error) => reject(error)
        } catch {
            return new Promise((resolve) => {
                resolve('')
            })
        }
    })
}

export const PictureForm: React.FC<ImageUploaderProps> = ({ /*onImageUpload,*/ cardId, trainingId /*, trainingImage*/ }) => {
    // const { updatePicture } = useContext(GymCardContext)
    const [selectedOption, setSelectedOption] = useState('');
    // const [selectedImage, setSelectedImage] = useState<File | null>(null);
    // const [base64Image, setBase64Image] = useState('');

    // useEffect(() => {
    //     // se ja tiver uma imagem salva, carregar
    //     if (trainingImage !== undefined || trainingImage !== null || trainingImage !== '') {
    //         if(base64Image === '')
    //             setBase64Image(trainingImage)
    //     }
    // }), [base64Image]

    useEffect(() => {
        const getLocalStorage = JSON.parse(localStorage.getItem('cards')!)

        //obtem o Card pelo ID
        const getCardByID = getLocalStorage.filter((card: any) => card.id === cardId)

        const getCurrentTraining = getCardByID[0].training.filter((training: any) => training.id === trainingId)
        if (getCurrentTraining[0].image !== "") {
            setSelectedOption(getCurrentTraining[0].image)
        }
    }, [])

    const handleSelectChange = (event: any) => {
        const trainingImage = event.target.value;
        setSelectedOption(trainingImage);

        const getLocalStorage = JSON.parse(localStorage.getItem('cards')!)

        //obtem o Card pelo ID
        const getCardByID = getLocalStorage.filter((card: any) => card.id === cardId)

        const getCurrentTraining = getCardByID[0].training.filter((training: any) => training.id === trainingId)
        getCurrentTraining[0].image = trainingImage;

        // Obtem todos o treinos, exceto o que esta sendo atualizado
        const currentTrainings = getCardByID[0].training.filter((training: any) => training.id !== trainingId)
        getCardByID[0].training = currentTrainings;

        // Adicionando o novo treino editado a lista de treinos
        getCardByID[0].training.push(getCurrentTraining[0])

        // remove o card antigo
        const removeOldCardByID = getLocalStorage.filter((card: any) => card.id !== cardId)

        // adiciona o card atualizado
        removeOldCardByID.push(getCardByID[0])

        localStorage.setItem('cards', JSON.stringify(removeOldCardByID))
    };

    // se for feito o upload de uma imagem, substituir pela nova.
    // const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = event.target.files && event.target.files[0];

    //     if (file) {
    //         // setSelectedImage(file);

    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             if (reader.result && typeof reader.result === 'string') {
    //                 onImageUpload(reader.result);
    //             }
    //         };
    //         reader.readAsDataURL(file);
    //         console.log(file)

    //         const base64 = await converterParaBase64(file, false)
    //         setBase64Image(base64)

    //         // chamar a API do contexto para salvar a imagem
    //         updatePicture(cardId, trainingId, base64)
    //     }
    // };

    return (
        <GymModalInputs>
            {/* <input type="file" accept="image/*" onChange={handleImageUpload} disabled />
            <p style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>Função de Upload ainda não disponível.</p> */}

            <select
                value={selectedOption}
                onChange={handleSelectChange}
            >
                <option value="">Selecione seu Exercício</option>
                {Trainings.map(training => {
                    const trainingName = training.replace('/src/assets/trainings/', '').replace('.png', '');
                    return (
                        <option key={training} value={training}>
                            {trainingName}
                        </option>
                    )
                })}
            </select>

            {/* {base64Image !== "" && <img src={base64Image} alt="Uploaded" />} */}
            {selectedOption !== "" && <img src={selectedOption} alt="Uploaded" />}
        </GymModalInputs>
    );
};