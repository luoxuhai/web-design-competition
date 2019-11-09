import request from '@/utils/request';

export const queryArticles = () => request('/v1/articles');

export const queryArticle = id => request(`/v1/articles/${id}`);

export const like = (id, inc) =>
    request(`/v1/articles/like/${id}`, {
        method: 'put',
        data: {
            inc
        }
    });

export const star = (id, method = 'add') =>
    request(`/v1/articles/star/${id}`, {
        method: 'put',
        data: {
            method
        }
    });

export const comment = data =>
    request('/v1/comments', {
        method: 'post',
        data
    });

export const queryArticleComment = id => request(`/v1/comments/article/${id}`);

export const removeArticleComment = (articleId, commentId) =>
    request(`/v1/comments/article/${commentId}`, {
        method: 'delete',
        params: {
            articleId
        }
    });
