import * as Dialog from '@radix-ui/react-dialog'
import { Content, Overlay } from '../NewGymTrainingModal/styles'

export function NewGymCardModal() {
    return (
        <Dialog.Portal>
            <Overlay />

            <Content>
                
            </Content>
        </Dialog.Portal>
    )
}