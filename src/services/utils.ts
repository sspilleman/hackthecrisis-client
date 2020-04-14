export function setCookie(cname: string, cvalue: string) {
    const d = new Date();
    d.setTime(d.getTime() + (3 * 60 * 60 * 1000)); // 1 hour
    const expires = `expires=${d.toUTCString()}`;
    document.cookie = `${cname}=${cvalue};${expires};path=/`;
}

export function getCookie(cname: string) {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split('; ');
    for (const c of ca) {
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
    }
    return undefined;
}
