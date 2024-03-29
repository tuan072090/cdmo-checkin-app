import axios from '@/share/axios';
import {FormatDateFromDate} from '@/share/utils/formater';

export const uploadPhoto = async (imgPath: string, name?: string) => {
    try {
        const formData = new FormData();
        const imgName = FormatDateFromDate(new Date());
        formData.append('files', {
            name: name || imgName,
            uri: imgPath,
            type: 'image/jpg',
        });
        const data: any = await axios.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return data;
    } catch (err) {
        console.log("upload error.....", err)
        throw err;
    }
};
