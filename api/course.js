import request from '@/utils/request';

export const queryCourses = () => request('/v1/courses');

export const queryLearning = () => request('/v1/courses/learning');

export const queryCourse = id => request(`/v1/courses/${id}`);

export const queryBarrage = id => request(`/v1/barrages/${id}`);

export const addBarrage = data =>
    request('/v1/barrages', {
        method: 'post',
        data
    });

export const addLearner = id =>
    request(`/v1/courses/learner/${id}`, {
        method: 'put'
    });
