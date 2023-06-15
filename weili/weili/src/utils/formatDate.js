export function formatDate(time, format = 0) {
    let date = new Date(time * 1000);     // JS中time()函数默认为毫秒,要乘1000
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m >= 10 ? m : "0" + m;
    let d = date.getDate();
    d = d >= 10 ? d : "0" + d;
    let h = date.getHours();
    h = h >= 10 ? h : "0" + h;
    let i = date.getMinutes();
    i = i >= 10 ? i : "0" + i;
    let s = date.getSeconds();
    s = s >= 10 ? s : "0" + s;
    if (format == 0) {
        return (`${y}-${m}-${d}`);
    }else if(format == 1) {
        return (`${y}-${m}-${d} ${h}:${i}:${s}`);
    }
}