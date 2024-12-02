import React, { useRef, useState } from "react";
import Keyboard from "react-simple-keyboard";
import "./styles.css"
import "react-simple-keyboard/build/css/index.css";



export default function keyboard() {

    const [input, setInput] = useState("");
    const [layout, setLayout] = useState("default");
    const keyboard = useRef();
    const onChange = input => {
        setInput(input);
        // console.log("Input changed", input);
    };

    const handleShift = () => {
        const newLayoutName = layout === "default" ? "shift" : "default";
        setLayout(newLayoutName);
    };

    const onKeyPress = button => {
        // console.log("Button pressed", button);
        /**
         * If you want to handle the shift and caps lock buttons
         */
        if (button === "{shift}" || button === "{lock}") handleShift();
        if (button === "{enter}") {
            console.log(keyboard.current)
            console.log(input);
            keyboard.current.setInput("");
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
                className="englishInput"
            />
            <Keyboard
                keyboardRef={r => (keyboard.current = r)}
                layoutName={layout}
                onChange={onChange}
                onKeyPress={onKeyPress}
                layout={{
                    'default': [
                        '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
                        '{tab} q w e r t y u i o p [ ] \\',
                        '{lock} a s d f g h j k l ; \' {enter}',
                        '{shift} z x c v b n m . / {shift}',
                        '.com @ {space}',
                    ],
                    'shift': [
                        '{shift} Z X C V B N M &lt; &gt; ? {shift}',
                        'w e \u0046 '
                    ]
                }}
                theme={
                    "hg-theme-default hg-layout-default englishTheme"
                }
                excludeFromLayout={
                    {
                        default: ["-", "+", "=", "[", "]", "\\", "{lock}", ";", "'", ",", ".", "/", "{tab}", "@", ".com"],
                        shift: ["{space}", "@", ".com"],
                    }
                }
                display= {{
                    '{bksp}': 'BACK',
                    '{shift}': 'Shift',
                    '{enter}': `Submit`,
                    '{space}': "Space"
                }}
                buttonTheme={[
                    {
                        class: "keys",
                        buttons: "{enter} {shift} {bksp}",
                    },
                    {
                        class: "space",
                        buttons: "{space}"
                    }
                ]}
            />
        </div>
    );
}