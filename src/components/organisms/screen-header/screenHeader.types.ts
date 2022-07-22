import {IBoxProps} from "native-base/lib/typescript/components/primitives/Box/types";
import { ReactNode } from "react";

export interface ScreenHeaderTypes extends IBoxProps{
    title?:string,
    hasBackButton?:boolean,
    rightComponent?:ReactNode
}
