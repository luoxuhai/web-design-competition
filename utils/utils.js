import querystring from 'querystring';
import url from 'url';
import { createStore } from '@/.lavas/store';
import { MessageBox } from 'element-ui';

export const queryParse = _url => querystring.parse(url.parse(_url).query);

export function clearAllCookie() {
    let keys = document.cookie.match(/[^ =;]+(?==)/g);
    if (keys) {
        for (let i = keys.length; i--; ) {
            document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString();
            document.cookie =
                keys[i] +
                '=0;path=/;domain=' +
                document.domain +
                ';expires=' +
                new Date(0).toUTCString();
            document.cookie =
                keys[i] + '=0;path=/;domain=ratingdog.cn;expires=' + new Date(0).toUTCString();
        }
    }
}

export function checkToken() {
    if (!createStore()._modules.root.state.user.token) {
        MessageBox.confirm('请登录后操作!', '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'warning',
            roundButton: true
        });
        return false;
    } else return true;
}
