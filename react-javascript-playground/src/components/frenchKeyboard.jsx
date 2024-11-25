import React, { useRef, useState } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";




export default function frenchKeyboard() {

    const [input, setInput] = useState("");
    const [layout, setLayout] = useState("default");
    const keyboard = useRef();
    const onChange = input => {
        setInput(input);
        console.log("Input changed", input);
    };

    const handleShift = () => {
        const newLayoutName = layout === "default" ? "shift" : "default";
        setLayout(newLayoutName);
    };

    const onKeyPress = button => {
        console.log("Button pressed", button);

        /**
         * If you want to handle the shift and caps lock buttons
         */
        if (button === "{shift}" || button === "{lock}") handleShift();
        if (button === "{enter}") {
            console.log("Submit button recognized")
        }
    };

    const onChangeInput = event => {
        const input = event.target.value;
        setInput(input);
        keyboard.current.setInput(input);
    };


    return (
        <div className="App">
            <input
                value={input}
                placeholder={"Please Enter Your ID"}
                onChange={onChangeInput}
            />
            <Keyboard
                keyboardRef={r => (keyboard.current = r)}
                layoutName={layout}
                onChange={onChange}
                onKeyPress={onKeyPress}
                layout={{
                    default: [
                        "` 1 2 3 4 5 6 7 8 9 0 \u00B0 + {bksp}",
                        "{tab} a z e r t y u i o p ^ $",
                        "{lock} q s d f g h j k l m \u00F9 * {enter}",
                        "{shift} < w x c v b n , ; : ! {shift}",
                        ".com @ {space}",
                    ],
                    shift: [
                        "\u00B2 & \u00E9 \" ' ( - \u00E8 _ \u00E7 \u00E0 ) = {bksp}",
                        "{tab} A Z E R T Y U I O P \u00A8 \u00A3",
                        "{lock} Q S D F G H J K L M % \u00B5 {enter}",
                        "{shift} > W X C V B N ? . / \u00A7 {shift}",
                        ".com @ {space}",
                    ],
                }}
                theme={
                    "hg-theme-default hg-layout-default frenchTheme"
                }
            />
        </div>
    );
}