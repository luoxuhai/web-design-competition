/**
 * @file app module
 * @author ibyli <15186743693@163.com>
 */

export const state = () => {
    return {
        isStartLearn: false,
        articles: [],
        courses: [],
        learner: [],
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(
            navigator.userAgent
        )
    };
};

export const mutations = {
    toggleStartLearn(state) {
        state.isStartLearn = !state.isStartLearn;
    },

    saveArticles(state, val) {
        state.articles = val;
    },

    saveCourses(state, val) {
        state.courses = val;
    },

    saveLearner(state, val) {
        state.learner = val;
    }
};
