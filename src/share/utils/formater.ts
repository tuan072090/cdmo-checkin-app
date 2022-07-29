import { parse, format, fromUnixTime } from 'date-fns'

export function FormatDayInWeek(day: string) {
    switch (day) {
        case "Monday":
            return "T2";
        case "Tuesday":
            return "T3";

        case "Wednesday":
            return "T4";
        case "Thursday":
            return "T5";
        case "Friday":
            return "T6";
        case "Saturday":
            return "T7";
        case "Sunday":
            return "CN";
        default:
             return ""
    }
}

export const FormatVND = (pnumber:number) => {
    let result = "0"

    //  check the number has decimal
    if(pnumber % 1 > 0){
        result = pnumber.toFixed(2)
    }

    result = pnumber.toString();
    result = result.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

    return result;
};

export const FormatDateFromDate = (date:Date, defaultFormat = 'dd-MM-yyyy'):string => {
    return format(date, defaultFormat)
}

export const FormatDateFromUnixTimestamp = (unixTime:number, defaultFormat = 'dd-MM-yyyy'):string => {
    return format(fromUnixTime(unixTime), defaultFormat)
}

export const ParseStringToDate = (dateStr:string, defaultFormat = 'yyyy-MM-dd'):Date => {
    return parse(
        dateStr,
        defaultFormat,
        new Date()
    )
}

export const FormatPhoneNumber = (phone:string) => {
    //Filter only numbers from the input
    let cleaned = ('' + phone).replace(/\D/g, '');

    //Check if the input is of correct length
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match) {
        return '(' + match[1] + ') ' + match[2] + ' ' + match[3]
    }

    return null
}

export const RemoveAscent = (str:string):string => {
    if (str === null || str === undefined) return str;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    return str;
}

export const ChangeToSlug = (plainText: string): string => {
    if (typeof plainText !== "string") return "";

    let slug: string;

    //Đổi chữ hoa thành chữ thường
    slug = plainText.toLowerCase();

    //Đổi ký tự có dấu thành không dấu
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a");
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e");
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, "i");
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o");
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u");
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y");
    slug = slug.replace(/đ/gi, "d");
    //Xóa các ký tự đặt biệt
    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, "");
    //Đổi khoảng trắng thành ký tự gạch ngang
    slug = slug.replace(/ /gi, "-");
    //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
    //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
    slug = slug.replace(/\-\-\-\-\-/gi, "-");
    slug = slug.replace(/\-\-\-\-/gi, "-");
    slug = slug.replace(/\-\-\-/gi, "-");
    slug = slug.replace(/\-\-/gi, "-");
    //Xóa các ký tự gạch ngang ở đầu và cuối
    slug = "@" + slug + "@";
    slug = slug.replace(/\@\-|\-\@|\@/gi, "");
    //In slug ra textbox có id “slug”

    return slug;
};
