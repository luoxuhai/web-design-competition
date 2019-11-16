/**
 * @file app module
 * @author ibyli <15186743693@163.com>
 */

export const state = () => {
    return {
        isStartLearn: false,
    };
};

export const mutations = {
    toggleStartLearn(state) {
        state.isStartLearn = !state.isStartLearn;
    }
};
