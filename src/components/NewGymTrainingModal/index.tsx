import * as Dialog from "@radix-ui/react-dialog";
import { X } from "phosphor-react";
import { CloseButton, Content, GymModalButton, GymModalInputs, Overlay } from "./styles";
import { CardForm } from "./CardForm";
import { TrainingForm } from "./TrainingForm";
import { DeleteForm } from "./DeleteForm";
import { EditForm } from "./EditForm";
import { PictureForm } from "./PictureForm";

interface NewGymProps {
    type: 'card' | 'training' | 'picture' | 'edit' | 'delete',
}

export function NewGymTrainingModal(props: NewGymProps) {
    const modalType = props.type;

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

                <form>
                    { 
                        modalType === 'card' && 
                        <div>
                            <CardForm /> 
                            <GymModalButton variant="green" type="submit" disabled>Adicionar</GymModalButton>
                        </div>
                    }
                    { 
                        modalType === 'training' && 
                        <div>
                            <TrainingForm /> 
                            <GymModalButton variant="green" type="submit" disabled>Adicionar</GymModalButton>
                        </div>
                    }
                    { 
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
                    }
                </form>
            </Content>
        </Dialog.Portal>
    ) 
}