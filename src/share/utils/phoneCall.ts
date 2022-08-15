// @ts-ignore
import call from 'react-native-phone-call'
import Validator from '@/share/utils/validator';

export function makeAPhoneCall(phone: string){
    try {
        if(!Validator.isValidPhone(phone)){
            throw {message: "Số điện thoại không hợp lệ", status: 400}
        }
        const args = {
            number: phone, // String value with the number to call
            prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call
            skipCanOpen: false // Skip the canOpenURL check
        }

        call(args).catch((err: any) => {
            throw {message: err.message, status: 400}
        })
    } catch (err:any) {
        throw {message: err.message, status: 400}
    }
}
