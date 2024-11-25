import './App.css'
import Keyboard from './components/keyboard'
import French from "./components/frenchKeyboard.jsx"
import {useState} from "react";

function App() {
    const [isDefaultKeyboard, setIsDefaultKeyboard] = useState(true);

    function switchLayout() {
        setIsDefaultKeyboard(!isDefaultKeyboard);
    }

    return (
        <>
            <button onClick={switchLayout}>
                {isDefaultKeyboard ? "French" : "English"}
            </button>
            {isDefaultKeyboard ? <Keyboard/> : <French/>}
        </>
    )
}

export default App
