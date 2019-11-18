/**
 * @file user module
 * @author ibyli <15186743693@163.com>
 */

import { clearAllCookie } from '@/utils/utils';
import { Message, MessageBox } from 'element-ui';
import { login } from '@/api/user';

export const state = () => {
    return {
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {},
        token: localStorage.getItem('token') || ''
    };
};

export const mutations = {
    setUserData(state, { user, token }) {
        const newUser = { ...state.user, ...user };
        localStorage.setItem('user', JSON.stringify(newUser));
        localStorage.setItem('token', token);
        state.token = token;
        state.user = newUser;
    },

    logout(state) {
        MessageBox.confirm('确认退出?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            roundButton: true
        }).then(() => {
            localStorage.clear();
            clearAllCookie();
            history.replaceState(null, null, '/home');
            state = {};
            location.reload();
        });
    }
};

export const actions = {
    saveLogin({ commit }) {
        login({
            access_token: localStorage.getItem('access_token'),
            openId: localStorage.getItem('openid')
        }).then(({ data: { user, token } }) => {
            window.loadingInstance.close();
            Message.success({ message: '登录成功!' });
            localStorage.clear();
            commit('setUserData', { user, token });
        });
    }
};
