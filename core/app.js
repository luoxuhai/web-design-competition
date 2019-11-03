/**
 * @file entry
 * @author ibyli(15186743693@163.com)
 */

import Vue from 'vue';
import Meta from 'vue-meta';

import { createRouter } from '@/.lavas/router';
import { createStore } from '@/.lavas/store';
import AppComponent from './App.vue';
import 'element-ui/lib/theme-chalk/index.css';
import { Button, Select } from 'element-ui';

Vue.use(Meta);

Vue.use(Button)

Vue.config.productionTip = false;

export function createApp() {
    let router = createRouter();
    let store = createStore();
    let App = Vue.extend({
        router,
        store,
        ...AppComponent
    });
    return { App, router, store };
}

if (module.hot) {
    module.hot.accept();
}
