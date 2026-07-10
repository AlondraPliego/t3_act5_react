import styles from "./TemporizadorApp.module.css"; 
import { useState, useEffect } from "react";
import TemporizadorForm from "./TemporizadorForm";
import { Trash, Play, Pause, RotateCcw } from "lucide-react";

const Configurador = ({ totalSegundos }) => {
    const minutos = Math.floor(totalSegundos / 60);
    const segundos = totalSegundos % 60;
    const minutosFormateados = String(minutos).padStart(2, '0');
    const segundosFormateados = String(segundos).padStart(2, '0');
    return (
        <span style={{ fontFamily: 'monospace', fontSize: '1.6rem', fontWeight: 'bold', margin: '0 10px' }}>
            {minutosFormateados}:{segundosFormateados}
        </span>
    );
};

function TemporizadorApp() {
    const [temporizadores, setTemporizadores] = useState(() => {
        const temposGuardados = localStorage.getItem("mis_temporizadores");
        return temposGuardados ? JSON.parse(temposGuardados) : [];
    });

    useEffect(() => {
        localStorage.setItem("mis_temporizadores", JSON.stringify(temporizadores));
    }, [temporizadores]);

    useEffect(() => {
        const miReloj = setInterval(() => {
            setTemporizadores((temposActuales) =>
                temposActuales.map((tempo) => {
                    if (tempo.enMarcha && tempo.segundosRestantes > 0) {
                        return { ...tempo, segundosRestantes: tempo.segundosRestantes - 1 };
                    }
                    // Si llegó a cero, deténlo y manda la alerta
                    if (tempo.enMarcha && tempo.segundosRestantes === 0) {
                        alert(`¡El temporizador "${tempo.texto}" ha terminado! ⏰`);
                        return { ...tempo, enMarcha: false, completado: true };
                    }
                    return tempo;
                })
            );
        }, 1000);

        return () => clearInterval(miReloj);
    }, []);

    const agregarTemporizador = (nuevoTempo) => {
        setTemporizadores([...temporizadores, nuevoTempo]);
    };

    const eliminarTemporizador = (id) => {
        setTemporizadores(temporizadores.filter((tempo) => tempo.id !== id));
    };

    const alternarPlayPause = (id) => {
        setTemporizadores(
            temporizadores.map((tempo) =>
                tempo.id === id ? { ...tempo, enMarcha: !tempo.enMarcha } : tempo
            )
        );
    };

    const reiniciarTemporizador = (id) => {
        setTemporizadores(
            temporizadores.map((tempo) =>
                tempo.id === id ? { 
                    ...tempo, 
                    segundosRestantes: tempo.segundosOriginales, 
                    enMarcha: false, 
                    completado: false 
                } : tempo
            )
        );
    };

    return (
        <div className={styles.ContenedorGeneral}>
            <h1 className={styles.titulo}>Temporizadores</h1>
            <TemporizadorForm onAgregarTemporizador={agregarTemporizador} />
            
            <ul className={styles.noteList}>
                {temporizadores.map((tempo) => (
                    <li className={styles.noteItem} key={tempo.id}>
                        <div className={styles.tempoInfo}>
                            <strong>{tempo.texto}</strong> — 
                            
                            <Configurador totalSegundos={tempo.segundosRestantes} />
                            
                            {tempo.completado && <span style={{ color: "red" }}>¡Terminado!</span>}
                        </div>
                        
                        <div className={styles.iconsContainer}>
                            {!tempo.completado && (
                                <button onClick={() => alternarPlayPause(tempo.id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                    {tempo.enMarcha ? <Pause size={22} color="#e74c3c" /> : <Play size={22} color="#2ecc71" />}
                                </button>
                            )}
                            <button onClick={() => reiniciarTemporizador(tempo.id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                <RotateCcw size={22} color="#3498db" />
                            </button>
                            <button onClick={() => eliminarTemporizador(tempo.id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                <Trash size={22} color="#7f8c8d" />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TemporizadorApp;