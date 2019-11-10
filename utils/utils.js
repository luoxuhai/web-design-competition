import querystring from 'querystring';
import url from 'url';

export const queryParse = _url => querystring.parse(url.parse(_url).query);

export function clearAllCookie() {
    let keys = document.cookie.match(/[^ =;]+(?==)/g);
    if (keys) {
        for (let i = keys.length; i--; ) {
            document.cookie =
                keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString();
            document.cookie =
                keys[i] +
                '=0;path=/;domain=' +
                document.domain +
                ';expires=' +
                new Date(0).toUTCString();
            document.cookie =
                keys[i] +
                '=0;path=/;domain=ratingdog.cn;expires=' +
                new Date(0).toUTCString();
        }
    }
}
