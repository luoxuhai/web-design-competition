import request from '@/utils/request';

export const login = data =>
    request(`/v1/users/login`, {
        method: 'post',
        data
    });

export const update = (id, data) =>
    request(`/v1/users/${id}`, {
        method: 'put',
        data
    });

export const queryUserComment = id => request(`/v1/comments/user/${id}`);
