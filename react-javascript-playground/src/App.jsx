import './App.css'
import Keyboard from './components/keyboard'
import French from "./components/frenchKeyboard.jsx"
import NumPad from "./components/numpad.jsx"
import {useState} from "react";

function App() {
    const [isDefaultKeyboard, setIsDefaultKeyboard] = useState(true);
    const [isNumPad, setIsNumPad] = useState(true);
    function switchLayout() {
        setIsDefaultKeyboard(!isDefaultKeyboard);
    }
    function numPadToggle() {
        setIsNumPad(!isNumPad);
    }

    return (
        <>
            <button onClick={switchLayout}>
                {isDefaultKeyboard ? "French" : "English"}
            </button>
            <button onClick={numPadToggle}>
                {isNumPad ? "NumpadOff" : "NumPadOn"}
            </button>
            {isDefaultKeyboard ? <Keyboard/> : <French/>}
            {isNumPad ? <NumPad/> : <div></div>}
        </>
    )
}

export default App
