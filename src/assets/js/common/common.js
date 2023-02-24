export default function fn() {
    let time = new Date();
    let year = time.getFullYear();
    let mon = time.getMonth() + 1;
    let day = time.getDate();
    let h = time.getHours();
    let m = time.getMinutes();
    let s = time.getSeconds();
    let week = time.getDay();
    switch (week) {
        case 0:
            week = "日";
            break;
        case 1:
            week = "一";
            break;
        case 2:
            week = "二";
            break;
        case 3:
            week = "三";
            break;
        case 4:
            week = "四";
            break;
        case 5:
            week = "五";
            break;
        case 6:
            week = "六";
            break;
    }
    return year + "年" + totwo(mon) + "月" + totwo(day) + "日" + "&nbsp;" + totwo(h) + ":" + totwo(m) + ":" + totwo(s) + "&nbsp;" + "星期" + week;
}


function totwo(n) {
    if (n <= 9) {
        return n = "0" + n;
    } else {
        return n = "" + n;
    }
}


export const genderEnum = {
    1: '男',
    2: '女'
}