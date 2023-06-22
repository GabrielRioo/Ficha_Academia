import React, { useContext, useEffect, useState } from 'react';
import { GymModalInputs } from '../styles';
import { GymCardContext } from '../../../contexts/GymCardContext';

interface ImageUploaderProps {
    onImageUpload: (imageData: string) => void;
    cardId: number,
    trainingId: number,
    trainingImage: string,
}

export const converterParaBase64 = (
    file: File,
    removerContentType: boolean = true,
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

export const PictureForm: React.FC<ImageUploaderProps> = ({ onImageUpload, cardId, trainingId, trainingImage }) => {
    const { updatePicture } = useContext(GymCardContext)
    // const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [base64Image, setBase64Image] = useState('');

    useEffect(() => {
        // se ja tiver uma imagem salva, carregar
        if (trainingImage !== undefined || trainingImage !== null || trainingImage !== '') {
            console.log('tem imagem: ', trainingImage)
            if(base64Image === '')
                setBase64Image(trainingImage)
        }
    }), [base64Image]

    // se for feito o upload de uma imagem, substituir pela nova.
    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];

        if (file) {
            // setSelectedImage(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result && typeof reader.result === 'string') {
                    onImageUpload(reader.result);
                }
            };
            reader.readAsDataURL(file);
            console.log(file)

            const base64 = await converterParaBase64(file, false)
            setBase64Image(base64)

            // chamar a API do contexto para salvar a imagem
            updatePicture(cardId, trainingId, base64)
        }
    };

    return (
        <GymModalInputs>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {base64Image !== "" && <img src={base64Image} alt="Uploaded" />}
        </GymModalInputs>
    );
};