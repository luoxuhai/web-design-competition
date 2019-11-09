/**
 * @file entry
 * @author ibyli(15186743693@163.com)
 */

import Vue from 'vue';
import Meta from 'vue-meta';

import { createRouter } from '@/.lavas/router';
import { createStore } from '@/.lavas/store';
import AppComponent from './App.vue';
import '@/assets/scss/element-variables.scss';
import {
    Button,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Divider,
    Backtop,
    Input,
    Avatar
} from 'element-ui';
import avatar from 'vue-avatar';
import GeminiScrollbar from 'vue-gemini-scrollbar';
import 'localforage';
import AppBar from "@/components/AppBar";

Vue.use(Meta);

Vue.use(Button)
    .use(Dropdown)
    .use(DropdownItem)
    .use(Divider)
    .use(Backtop)
    .use(Input)
    .use(Avatar)
    .use(DropdownMenu);

Vue.use(GeminiScrollbar);

Vue.component('avatar', avatar);

Vue.component('AppBar', AppBar);

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
