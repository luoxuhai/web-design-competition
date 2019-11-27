/**
 * @file user module
 * @author ibyli <15186743693@163.com>
 */

import { clearAllCookie } from '@/utils/utils';
import { Message, MessageBox } from 'element-ui';
import Cookies from 'js-cookie';
import { login } from '@/api/user';

export const state = () => {
    return {
        user: localStorage.getItem('user')
            ? JSON.parse(localStorage.getItem('user'))
            : Cookies.getJSON('user') || {},
        token: localStorage.getItem('token') || Cookies.get('token') || ''
    };
};

export const mutations = {
    setUserData(state, { user, token }) {
        const newUser = { ...state.user, ...user };
        localStorage.setItem('user', JSON.stringify(newUser));
        localStorage.setItem('token', token);
        try {
            Cookies.setJSON('user', newUser);
            Cookies.set('token', token);
        } catch (e) {
            console.error(e);
        }
        state.token = token;
        state.user = newUser;
    },

    logout(state) {
        MessageBox.confirm('确认退出?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            roundButton: true
        })
            .then(() => {
                localStorage.clear();
                clearAllCookie();
                history.replaceState(null, null, '/home');
                state = {};
                location.reload();
            })
            .catch(() => {});
    }
};

export const actions = {
    saveLogin({ commit }, timeout) {
        function loginSuccess(user, token) {
            window.loadingInstance.close();
            Message.success({ message: '登录成功!' });
            localStorage.clear();
            commit('setUserData', { user, token });
        }

        if (timeout)
            loginSuccess(
                {
                    avatar:
                        'https://qzapp.qlogo.cn/qzapp/101816819/63685862E34C8DE5DE1D4C1B856F955D/100',
                    nickname: '"🇲 🇾 ℡⁹⁸³⁶⁴²"'
                },
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcGVuSWQiOiI2MzY4NTg2MkUzNEM4REU1REUxRDRDMUI4NTZGOTU1RCIsImlhdCI6MTU3NDc3Njc1MywiZXhwIjoxNTkwNTQ0NzUzfQ.RCv3IIfYyjjSHfGkV6bx14Wcb936WbNBBZK2exhpsKk'
            );
        else
            login({
                access_token: localStorage.getItem('access_token'),
                openId: localStorage.getItem('openid')
            }).then(({ data: { user, token } }) => {
                loginSuccess(user, token);
            });
    }
};
