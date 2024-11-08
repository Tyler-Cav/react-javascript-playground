import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import Keyboard from "react-simple-keyboard";

// Instead of the default import, you can also use this:
// import { KeyboardReact as Keyboard } from "react-simple-keyboard";

import "react-simple-keyboard/build/css/index.css";
import "./styles.css";


export default function  keyboard() {

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
            excludeFromLayout = { 
                {
                default: ["{tab}", "", "{space}", "", "@", "", ".com", "" ],
                shift: ["{space}", "", "@", "", ".com", "" ],
            }
            }
            display={{
                '{bksp}': 'BACK',
                '{enter}': 'Enter',
            }}
          />
        </div>
      );
}