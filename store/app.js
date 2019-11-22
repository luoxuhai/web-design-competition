/**
 * @file app module
 * @author ibyli <15186743693@163.com>
 */

const html = document.querySelector('html');

export const state = () => {
    return {
        isStartLearn: false,
        articles: [],
        courses: [],
        learner: [],
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(
            navigator.userAgent
        ),
        nightMode: localStorage.getItem('nightMode') === 'true' || false
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
    },

    toggleNightMode(state, nightMode) {
        html.style.setProperty('--color-background', nightMode ? 'black' : 'white');
        html.style.setProperty('--color-background-light', nightMode ? '#303133' : 'white');
        html.style.setProperty('--color-background-dark', nightMode ? 'black' : '#f4f4f4');

        html.style.setProperty('--color-title', nightMode ? '#ebeef5' : '#211615');
        html.style.setProperty('--color-title-light', nightMode ? '#ebeef5' : 'rgba(0,0,0,.65)');
        html.style.setProperty('--color-sub', nightMode ? '#ebeef5' : '#241c1c');
        html.style.setProperty('--color-default', nightMode ? '#ebeef5' : '#2c3e50');
        html.style.setProperty('--color-content', nightMode ? '#ebeef5' : 'rgb(76, 78, 77)');

        localStorage.setItem('nightMode', nightMode);
        state.nightMode = nightMode;
    }
};
