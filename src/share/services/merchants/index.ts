import axios from '@/share/axios';
import {store} from '@/redux/store';

export const getAllMerchants = async () => {
    try {
        let offset = 0
        let data = await getMerchants(offset)
        let result = [...data]
        while (data.length > 0){
            offset = offset+50
            data = await getMerchants(offset)

            result = result.concat(data)
        }

        return result
    } catch (err) {
        throw err;
    }
};

export const getMerchants = async (offset= 0) => {
    try {
        const {data, meta}: any = await axios.get('/merchants', {
            params: {
                'fields[0]': 'name',
                'fields[1]': 'address',
                'fields[2]': 'contact_name',
                'fields[3]': 'contact_phone',
                'sort[0]': "id:DESC",
                'pagination[start]': offset,
                'pagination[limit]': 50
            },
        });
        return data
    } catch (err) {
        throw err
    }
}

export const getMerchantDetail = async (id: number|string) => {
    try {
        const {data, meta}: any = await axios.get(`/merchants/${id}`);
        return data
    } catch (err) {
        throw err
    }
}
