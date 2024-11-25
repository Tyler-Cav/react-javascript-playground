# React Keyboard Library Documentation

## Introduction

Currently under research/development. Not a final determination of if CIS is committing to the use of this library within next-gen.

Note: This is currently being written to use with JavaScript. This will eventually need to be converted into a TypeScript guide.

This document assumes you have basic React/Javascript Knowledge
- Needed to use the library within React: [NPM Installer Link](https://www.npmjs.com/package/react-simple-keyboard)
- Larger/Broad Library Documentation: [React-Library Documentation Link](https://hodgef.com/simple-keyboard/getting-started/react/)

## Installation
1. Create a new React Javascript build through your preferred method. Or use an existing playground project. I use vite to build.
2. Make sure you are within the correct directory with your `package.json` file and install the keyboard library.
    - `npm i react-simple-keyboard`
3. Create a new `keyboard.jsx` and copy from the entirety of the [component-code](#Component-Code) to add into the created file. We will use this to walk through the libraries capabilities.
4. Add the component into your main [App.jsx](#App) file.
5. Command `npm run dev` to launch the app to test that the below appears.
   - <img src="images/keyboard.png" alt="drawing" width="500"/>)

## KeyboardProperties
- All changes can be made directly within the `keyboard.jsx` file.
- Most properties you can change will be available with the `Keyboard` component.
- This portion of the code will be walked through for you to edit.
### Example
```
   <Keyboard
       keyboardRef={r => (keyboard.current = r)}
       layoutName={layout}
       onChange={onChange}
       onKeyPress={onKeyPress}
       layout={{
           'default': [
               '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
               '{tab} q w e r t y u i o p [ ] \\',
               '{lock} A s d f g h j k l ; \' {enter}',
               '{shift} z x c v b n m , . / {shift}',
               '.com @ {space}'
           ],
           'shift': [
               '{shift} Z X C V B N M &lt; &gt; ? {shift}',
               'w e t'
           ]
       }}
       excludeFromLayout={
           {
               default: ["`", "-", "+", "=", "[", "]", "\\", "{lock}", ";", "'", "{enter}", ",", ".", "/", "{tab}", "{space}", "@", ".com"],
               shift: ["{space}", "@", ".com"],
           }
       }
       display={{
           '{bksp}': 'BACK',
           '{shift}': 'Shift',
       }}
       buttonTheme={[
            {
                class: "keys",
                buttons: "q z a {bksp}",
            },
        ]}
  ```

### Layout Prop
#### Default
   - Used to create the keyboard itself.
   - Ex: I can create the layout with just these lines. 
   - If you also go into chrome and inspect the console,
- ```
    layout={{
        'default': [
            '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
        ]
    }}
  ```
  - <img src="images/changingLayoutDefault.png" alt="drawing" width="500"/>)
- If you also go into chrome and inspect the console, the library is tracking all the values entered.
  - <img src="images/stateTracking.png" alt="drawing" width="500"/>)
#### Shift
- The shift in the layout section will define what the layout will be when the shift key is pressed.
    ```
    'shift': [
        '{shift} Z X C V B N M &lt; &gt; ? {shift}',
        'w e \u0046 '
    ]
    ```

### Excluding Certain Characters Prop
- If you'd like to keep keys within the default layout but exclude certain keys as necessary you can use the `excludeFromLayout` prop.
- As you can see in the above [example](#example) that includes the prop, we are currently excluding a lot. In the default we have all of those keys.
- You can also decide what to exclude on your shift layout as well.
- Please note the syntax in the above to test yourself. If we remove for example the `{enter}` key from the excludes section, it will populate in the keyboard.
  - ![img.png](images/addingEnterExcludesExample.png)
### Display Prop
- Within the Keyboard component, you will see a property labeled as `display`. If you follow the syntax correctly you can replace any key with a different value.
- Ex: Changing the "French" key above into the "Shift" key.
- There are curly braces only under certain functional keys. If you want to change the letter `a` to `A`, you can omit the curly braces.
   ```
    display={{
        '{bksp}': 'BACK',
        '{shift}': 'Shift',
    }}
    ```
  - <img src="images/updateFrenchToShift.png" alt="drawing" width="500"/>

### Component-Code
```
import React, { useRef, useState } from "react";
import Keyboard from "react-simple-keyboard";

import "react-simple-keyboard/build/css/index.css";

export default function keyboard() {

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
                layout={{
                    'default': [
                        '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
                        '{tab} q w e r t y u i o p [ ] \\',
                        '{lock} A s d f g h j k l ; \' {enter}',
                        '{shift} z x c v b n m , . / {shift}',
                        '.com @ {space}'
                    ],
                    'shift': [
                        '{shift} Z X C V B N M &lt; &gt; ? {shift}',
                        'w e t'
                    ]
                }}
                excludeFromLayout={
                    {
                        default: ["`", "-", "+", "=", "[", "]", "\\", "{lock}", ";", "'", "{enter}", ",", ".", "/", "{tab}", "{space}", "@", ".com"],
                        shift: ["{space}", "@", ".com"],
                    }
                }
                display={{
                    '{bksp}': 'BACK',
                    '{shift}': 'French',
                }}
            />
        </div>
    );
}
```
## App
```
import Keyboard from './components/keyboard'

function App() {
  return (
    <>
      <Keyboard/>
    </>
  )
}

export default App```
```