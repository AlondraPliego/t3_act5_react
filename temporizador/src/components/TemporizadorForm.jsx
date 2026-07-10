import styles from "./TemporizadorApp.module.css";
import { useState } from "react";
import { Plus } from "lucide-react";

const TemporizadorForm = ({ onAgregarTemporizador }) => {
    const [textTempo, setTextTempo] = useState("");
    const [cantMinutos, setCantMinutos] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        if (textTempo.trim() === "") {
            console.log("Añádele un identificador a su temporizador");
            return;
        }
        if (cantMinutos.trim() === "") {
            console.log("Necesitas determinar la duración de tu temporizador");
            return;
        }
        const segundosTotales = Number(cantMinutos) * 60;

        const newTempo = {
            id: Date.now().toString(), 
            texto: textTempo,
            segundosRestantes: segundosTotales,     
            segundosOriginales: segundosTotales, 
            enMarcha: false,
            completado: false
        };

        onAgregarTemporizador(newTempo);
        
        // Limpiamos inputs
        setTextTempo("");
        setCantMinutos("");
    };

    return (
        <div className={styles.FormularioContenedor}>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={textTempo} 
                    onChange={(event) => setTextTempo(event.target.value)}
                    placeholder="Nombre del temporizador (ej: Estudiar)..."
                />

                <input 
                    type="number" 
                    min="1" 
                    value={cantMinutos} 
                    onChange={(event) => setCantMinutos(event.target.value)}
                    placeholder="Minutos (ej: 5)..."
                />

                <button type="submit">
                    <Plus size={16} />
                    Crear Temporizador
                </button>
            </form>
        </div>
    );
};

export default TemporizadorForm;