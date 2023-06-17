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
            {/* <input
                type="text"
                placeholder="Dia da semana (opcional)"
                {...register('weekDay')}
            /> */}

            <select 
                id="weekDay"
                {...register('weekDay')}
            >
                    <option value={0}>Segunda-feira</option>
                    <option value={1}>Terça-feira</option>
                    <option value={2}>Quarta-feira</option>
                    <option value={3}>Quinta-feira</option>
                    <option value={4}>Sexta-feira</option>
                    <option value={5}>Sábado</option>
                    <option value={6}>Domingo</option>
            </select>
        </GymModalInputs>
    )
}