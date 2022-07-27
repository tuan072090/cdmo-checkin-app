import {Icon} from 'native-base';
import {Path} from 'react-native-svg';
import React from "react";
import {IconTypes} from "./icon.types";

export const HomeIcon: React.FC<IconTypes> = ({active = false, size = 20}) => {

    return (
        <Icon width="20" height="19" viewBox="0 0 20 19" fill="none" size={size}>
            <Path
                d="M0 10L9.293 0.707002C9.6835 0.31662 10.3165 0.31662 10.707 0.707002L20 10H18V18C18 18.5523 17.5523 19 17 19H12V12H8V19H3C2.44772 19 2 18.5523 2 18V10H0Z"
                fill="#095A64"/>
        </Icon>
    )
}

export const NotificationIcon: React.FC<IconTypes> = ({active = false, size = 20}) => {

    return (
        <Icon width="16" height="20" viewBox="0 0 16 20" fill="none" size={size}>
            <Path
                d="M8 20C6.89543 20 6 19.1046 6 18H10C10 19.1046 9.10457 20 8 20ZM16 17H0V15L2 14V8.5C2 5.038 3.421 2.793 6 2.18V0H10V2.18C12.579 2.792 14 5.036 14 8.5V14L16 15V17ZM8 3.75C6.77967 3.6712 5.60278 4.21728 4.875 5.2C4.25255 6.18456 3.94714 7.33638 4 8.5V15H12V8.5C12.0528 7.33639 11.7474 6.18458 11.125 5.2C10.3972 4.21728 9.22033 3.6712 8 3.75Z"
                fill="#095A64"/>
        </Icon>

    )
}

export const NearByIcon: React.FC<IconTypes> = ({active = false, size = 20}) => {

    return (
        <Icon width="16" height="22" viewBox="0 0 16 22" fill="none" size={size}>
            <Path fill-rule="evenodd" clip-rule="evenodd"
                  d="M4.70622 17.2211C1.93095 17.6134 0 18.4862 0 19.5C0 20.8807 3.58172 22 8 22C12.4183 22 16 20.8807 16 19.5C16 18.4862 14.069 17.6134 11.2938 17.2211C10.863 17.6879 10.4179 18.1412 9.95908 18.5805C11.2394 18.6882 12.3552 18.897 13.2094 19.164C13.5709 19.2769 13.8591 19.3922 14.0807 19.5C13.8591 19.6078 13.5709 19.7231 13.2094 19.836C11.9427 20.2319 10.1006 20.5 8 20.5C5.89942 20.5 4.05731 20.2319 2.79056 19.836C2.42906 19.7231 2.14094 19.6078 1.91932 19.5C2.14094 19.3922 2.42906 19.2769 2.79056 19.164C3.64477 18.897 4.76061 18.6882 6.04091 18.5805C5.58211 18.1412 5.13699 17.6879 4.70622 17.2211ZM14.5951 19.1668C14.5955 19.1668 14.5926 19.1709 14.5849 19.1788C14.5908 19.1707 14.5947 19.1668 14.5951 19.1668ZM1.4049 19.1668C1.40534 19.1668 1.40918 19.1707 1.41508 19.1788C1.4074 19.1709 1.40445 19.1668 1.4049 19.1668ZM1.4049 19.8332C1.40445 19.8332 1.4074 19.8291 1.41508 19.8212C1.40918 19.8293 1.40534 19.8332 1.4049 19.8332ZM14.5849 19.8212C14.5926 19.8291 14.5955 19.8332 14.5951 19.8332C14.5947 19.8332 14.5908 19.8293 14.5849 19.8212Z"
                  fill="#095A64"/>
            <Path
                d="M8 19C6.73693 17.9226 5.56619 16.7415 4.5 15.469C2.9 13.558 1 10.712 1 7.99999C0.998583 5.16754 2.70425 2.61338 5.32107 1.52939C7.93789 0.445394 10.9501 1.04523 12.952 3.04899C14.2685 4.3596 15.0059 6.14238 15 7.99999C15 10.712 13.1 13.558 11.5 15.469C10.4338 16.7415 9.26307 17.9226 8 19ZM8 2.99999C5.23995 3.0033 3.00331 5.23994 3 7.99999C3 9.16599 3.527 11.185 6.035 14.186C6.65314 14.924 7.30902 15.6297 8 16.3C8.69105 15.6304 9.34724 14.9259 9.966 14.189C12.473 11.184 13 9.16499 13 7.99999C12.9967 5.23994 10.7601 3.0033 8 2.99999Z"
                fill="#095A64"/>
        </Icon>
    )
}

export const CartIcon: React.FC<IconTypes> = ({active = false, size = 20}) => {
    return (
        <Icon width="20" height="20" viewBox="0 0 20 20" fill="none" size={size}>
            <Path
                d="M1.36364 8.23333H1V6.5H19V8.23333H18.6364H17.7604L17.6451 9.10167L16.5121 17.6317C16.4461 18.1287 16.0222 18.5 15.5208 18.5H4.47919C3.9778 18.5 3.55392 18.1287 3.4879 17.6317L2.35493 9.10167L2.2396 8.23333H1.36364Z"
                stroke="#095A64" strokeWidth="2" fill="none"/>
            <Path d="M6 6.5C6 4.5 6 1.5 10 1.5C14 1.5 14 4.5 14 6.5" stroke="#095A64" strokeWidth="2" strokeLinecap="round" fill="none"/>
        </Icon>
    )
}

export const AccountIcon: React.FC<IconTypes> = ({active = false, size = 20}) => {

    return (
        <Icon width="20" height="20" viewBox="0 0 20 20" fill="none" size={size}>
            <Path
                d="M10 12C12.2091 12 14 10.2091 14 8C14 5.79086 12.2091 4 10 4C7.79086 4 6 5.79086 6 8C6 10.2091 7.79086 12 10 12ZM10 6C11.1046 6 12 6.89543 12 8C12 9.10457 11.1046 10 10 10C8.89543 10 8 9.10457 8 8C8 6.89543 8.89543 6 10 6Z"
                fill="#095A64"/>
            <Path
                d="M2 20C0.895431 20 0 19.1046 0 18V2C0 0.895431 0.895431 0 2 0H18C19.1046 0 20 0.895431 20 2V18C20 19.1046 19.1046 20 18 20H2ZM2 2V18H5C5 15.2386 7.23858 13 10 13C12.7614 13 15 15.2386 15 18H18V2H2ZM13 18C13 16.3431 11.6569 15 10 15C8.34315 15 7 16.3431 7 18H13Z"
                fill="#095A64"/>
        </Icon>

    )
}