import {RemoveAscent} from "./formater";

const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const phoneRegex = /^(\+?84|0)(1\d{9}|3\d{8}|5\d{8}|7\d{8}|8\d{8}|9\d{8})$/;
const urlRegex = /^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&=]*)/;
const filePathRegex = /^([a-z_\-\s0-9/]+)+\.(jpeg|png|jpg)$/;
const nameRegex = /^[a-zA-Z!@#\$%\^\&*\)\(+=._-]{2,}$/g;

// @ts-ignore
function validateValueWithFunc(value, validateRegex) {
    return validateRegex.test(value);
}

function isEmptyObj(obj={}) {
    for(const prop in obj) {
        if(Object.prototype.hasOwnProperty.call(obj, prop)) {
            return false;
        }
    }

    return JSON.stringify(obj) === JSON.stringify({});
}

const Validator = {
    isValidEmail: (email: string):boolean => validateValueWithFunc(email, emailRegex),
    isValidPhone: (phone: string):boolean => validateValueWithFunc(phone, phoneRegex),
    isValidUrl: (url: string):boolean => validateValueWithFunc(url, urlRegex),
    isValidFilePath: (path: string):boolean => validateValueWithFunc(path, filePathRegex),
    isValidName: (string:string):boolean => validateValueWithFunc(RemoveAscent(string), nameRegex),
    isEmptyObj: isEmptyObj
};

export default Validator
