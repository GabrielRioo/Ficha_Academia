import { GymModalInputs } from "../styles";

export function CardForm() {
    return (
        <GymModalInputs>
            <input
                type="text"
                name="card_name"
                placeholder="Nome da Ficha"
                required
            />
            <input
                type="text"
                name="week_day"
                placeholder="Dia da semana (opcional)"
            />
        </GymModalInputs>
    )
}