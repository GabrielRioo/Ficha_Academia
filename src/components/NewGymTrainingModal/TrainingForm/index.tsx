import { GymModalInputs } from "../styles";

export function TrainingForm({ register }: any) {
    return (
        <GymModalInputs>
            <input
                type="text"
                placeholder="Nome do Exercício"
                {...register('name')}
                required
            />
            <input
                type="number"
                placeholder="Quantidade de séries"
                {...register('series', { valueAsNumber: true })}
                required
            />
            <input
                type="text"
                placeholder="Quantidade de repetições"
                {...register('repetitions', { valueAsNumber: true })}
                required
            />
            <input
                type="text"
                placeholder="Peso da carga (opicional)"
                {...register('weight', { valueAsNumber: true })}
            />
        </GymModalInputs>
    )
}