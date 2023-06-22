import { GymModalInputs } from "../../styles"

export function EditCardForm({ register, valuesToChange }: any) {
    console.log(valuesToChange)
    return (
        <GymModalInputs>
            <input
                type="text"
                placeholder="Nome da Ficha"
                // value={valuesToChange.cardName}
                {...register('cardName')}
                required
            />

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