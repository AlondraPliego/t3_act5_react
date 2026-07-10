import { Toaster } from 'react-hot-toast';
import "./index.css";
import TemporizadorApp from "./components/TemporizadorApp";

function App() {
    return (
        <section className="containerTemporizador">
            <TemporizadorApp />
            <Toaster position="top-right" />
        </section>
    );
}

export default App;