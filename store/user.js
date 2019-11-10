/**
 * @file user module
 * @author ibyli <15186743693@163.com>
 */

import { clearAllCookie } from '@/utils/utils';

export const state = () => {
    return {
        user: localStorage.getItem('user')
            ? JSON.parse(localStorage.getItem('user'))
            : {},
        token: localStorage.getItem('token') || ''
    };
};

export const mutations = {
    login(state, { user, token }) {
        const newUser = { ...state.user, ...user };
        localStorage.setItem('user', JSON.stringify(newUser));
        localStorage.setItem('token', token);
        state.token = token;
        state.user = newUser;
    },

    logout(state) {
        localStorage.clear();
        clearAllCookie();
        history.replaceState(null, null, '/home');
        location.reload();

        state = {};
    }
};
