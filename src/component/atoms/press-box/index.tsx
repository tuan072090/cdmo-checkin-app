import React, {useState} from "react";
import {IPressableProps, Pressable} from "native-base";

const PressBox:React.FC<IPressableProps> = ({children, ...props}) => {

    return (
        <Pressable _pressed={{opacity: 0.8}} {...props}>
            {children}
        </Pressable>
    )
}

export default PressBox
