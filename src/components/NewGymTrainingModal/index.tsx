import * as Dialog from "@radix-ui/react-dialog";
import { X } from "phosphor-react";
import { CloseButton, Content, Overlay } from "./styles";

export function NewGymTrainingModal() {
    return (
        <Dialog.Portal>
            <Overlay />

            <Content>
                <Dialog.Title>Novo Treino</Dialog.Title>
                <CloseButton>
                    <X size={24} />
                </CloseButton>

                <form>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Nome do Exercício" 
                        required
                    />
                    <input 
                        type="text" 
                        name="series" 
                        placeholder="Quantidade de séries" 
                        required
                    />
                    <input 
                        type="text" 
                        name="repetitions" 
                        placeholder="Quantidade de repetições" 
                        required
                    />
                    <input 
                        type="text" 
                        placeholder="Peso da carga (opicional)" 
                        name="weight" 
                    />

                    <button type="submit" disabled>Adicionar</button>
                </form>
            </Content>
        </Dialog.Portal>
    ) 
}