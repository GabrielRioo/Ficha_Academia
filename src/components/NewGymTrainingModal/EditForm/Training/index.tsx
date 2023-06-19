import { useState } from "react"
import { GymModalInputs } from "../../styles"

export function EditTrainingForm({ register, valuesToChange }: any) {
    const [trainingName, setTrainingName] = useState('')
    // setTrainingName(valuesToChange.name)

    console.log(valuesToChange)
    return (
        <GymModalInputs>
            <label>Nome do Exercício</label>
            <input
                type="text"
                placeholder="Nome do Exercício"
                // valeu={trainingName}
                // onChange={handleOnChangeName}
                {...register('name')}
                required
            />

            <label>Quantidade de Séries</label>
            <input
                type="number"
                placeholder="Quantidade de séries"
                // value={valuesToChange.series}
                {...register('series', { valueAsNumber: true })}
                required
            />

            <label>Quantidade de repetições</label>
            <input
                type="number"
                placeholder="Quantidade de repetições"
                // value={valuesToChange.repetitions}
                {...register('repetitions', { valueAsNumber: true })}
                required
            />

            <label>Quantidade de Carga</label>
            <input
                type="number"
                placeholder="Peso da carga (opicional)"
                // value={valuesToChange.weight}
                {...register('weight', { valueAsNumber: true })}
            />
        </GymModalInputs>
    )
}