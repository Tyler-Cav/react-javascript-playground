import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import Keyboard from "react-simple-keyboard";

// Instead of the default import, you can also use this:
// import { KeyboardReact as Keyboard } from "react-simple-keyboard";

import "react-simple-keyboard/build/css/index.css";
import "./styles.css";


export default function numPad() {

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
    };

    const onChangeInput = event => {
        const input = event.target.value;
        setInput(input);
        keyboard.current.setInput(input);
    };

    return (
        <div className="">
            <div className={"tryingThis"}>
                <h4 className={"secondTry"}>Pick Up Device</h4>
                <p>Enter Your Badge ID:</p>
                <input
                    value={input}
                    placeholder={"Please Enter Your ID"}
                    onChange={onChangeInput}
                    className={"numPadInput"}
                />
            </div>
            <Keyboard
                keyboardRef={r => (keyboard.current = r)}
                layoutName={layout}
                onChange={onChange}
                onKeyPress={onKeyPress}
                layout={{
                    'default': [
                    '1 2 3',
                    '4 5 6',
                    '7 8 9',
                    '0',
                    '{enter}'
                    ]
                }}
                theme={
                    "hg-theme-default hg-layout-default numPadTheme"
                }
                excludeFromLayout={
                    {
                        default: ["`", "-", "+", "=", "[", "]", "\\", "{lock}", ";", "'", ",", ".", "/", "{tab}", "{space}", "@", ".com"],
                        shift: ["{space}", "@", ".com"],
                    }
                }
                display={{
                    '{bksp}': 'BACK',
                    '{enter}': 'Submit',
                }}
                buttonTheme={[
                    {
                        class: "numPadEnter",
                        buttons: "{enter}"
                    }
                ]}
            />
        </div>
    );
}