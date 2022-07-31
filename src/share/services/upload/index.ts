import axios from '@/share/axios';
import {FormatDateFromDate} from '@/share/utils/formater';

export const uploadPhoto = async (imgPath: string, name?: string) => {
    try {
        console.log("imgPath....", imgPath)
        const formData = new FormData();
        const imgName = FormatDateFromDate(new Date());
        formData.append('files', {
            name: name || imgName,
            uri: imgPath,
            type: 'image/jpg',
        });
        const data: any = await axios.post('/upload', formData);

        return data;
    } catch (err) {
        console.log("upload error.....", err)
        throw err;
    }
};
