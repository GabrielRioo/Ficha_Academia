import { GymModalInputs } from "../../styles"

export function EditTrainingForm() {
    return (
        <GymModalInputs>
              <input
                type="text"
                name="name"
                placeholder="Nome do Exercício"
                required
            />
            <input
                type="number"
                name="series"
                placeholder="Quantidade de séries"
                required
            />
            <input
                type="number"
                name="repetitions"
                placeholder="Quantidade de repetições"
                required
            />
            <input
                type="number"
                placeholder="Peso da carga (opicional)"
                name="weight"
            />
        </GymModalInputs>
    )
}