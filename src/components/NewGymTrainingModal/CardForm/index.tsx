import { GymModalInputs } from "../styles";

export function CardForm({register}: any) {
    return (
        <GymModalInputs>
            <input
                type="text"
                placeholder="Nome da Ficha"
                {...register('cardName')}
                required
            />
            <input
                type="text"
                placeholder="Dia da semana (opcional)"
                {...register('weekDay')}
            />
        </GymModalInputs>
    )
}