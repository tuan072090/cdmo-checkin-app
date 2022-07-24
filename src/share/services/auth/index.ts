import axios from '../../axios';

export const LoginService = async (identifier: string, password: string) => {
    try {
        const payload = {
            identifier: identifier,
            password: password,
        };
        const data = axios.post('/auth/local', payload);
        return data;
    } catch (err) {
        throw err;
    }
};
