import React from 'react';
// import {Text} from "native-base";
import {ITextProps} from 'native-base/lib/typescript/components/primitives/Text/types';
import {TypoTypes} from './typo.types';
import {Text} from 'native-base';

export const Typo: React.FC<TypoTypes & ITextProps & React.RefAttributes<unknown>> = ({type, children, ...props}) => {
    let fontSize = 14;
    let fontWeight = FontWeights.normal;
    let letterSpacing = LetterSpacings.md;
    let lineHeight = LineHeights.md;

    switch (type) {
        case 'body14':
            fontSize = FontSizes.sm;
            fontWeight = FontWeights.normal;
            break;
        case 'body16':
            fontSize = FontSizes.md;
            fontWeight = FontWeights.normal;
            break;
        case 'caption':
            fontSize = FontSizes.xs;
            fontWeight = FontWeights.normal;
            break;
        case 'overline':
            fontSize = FontSizes['2xs'];
            fontWeight = FontWeights.normal;
            break;
        case 'title':
            fontSize = FontSizes.lg;
            fontWeight = FontWeights.bold;
            break;
        case 'subtitle14':
            fontSize = FontSizes.sm;
            fontWeight = FontWeights.medium;
            break;
        case 'subtitle16':
            fontSize = FontSizes.md;
            fontWeight = FontWeights.medium;
            break;
    }

    return (
        <Text
            fontSize={fontSize}
            fontWeight={fontWeight}
            letterSpacing={letterSpacing}
            lineHeight={lineHeight}
            {...props}>
            {children}
        </Text>
    );
};
const FontSizes = {
    '2xs': 10,
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
    '7xl': 72,
    '8xl': 96,
    '9xl': 128,
};
const FontWeights = {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
    extraBlack: 950,
};
const LetterSpacings = {
    xs: '-0.05em',
    sm: '-0.025em',
    md: 0,
    lg: '0.025em',
    xl: '0.05em',
    '2xl': '0.1em',
};
const LineHeights = {
    '2xs': '1em',
    xs: '1.125em',
    sm: '1.25em',
    md: '1.375em',
    lg: '1.5em',
    xl: '1.75em',
    '2xl': '2em',
    '3xl': '2.5em',
    '4xl': '3em',
    '5xl': '4em',
};
