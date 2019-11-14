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
    Popover,
    Tooltip,
    Avatar,
    Dialog,
    Image,
} from 'element-ui';
import avatar from 'vue-avatar';
import ScrollReveal from 'scrollreveal';

import AppBar from '@/components/AppBar';

const scrollReveal = ScrollReveal({
    reset: true, // 滚动鼠标时，动画开关
    origin: 'bottom', // 动画开始的方向
    duration: 500, // 动画持续时间
    delay: 100, // 延迟
    rotate: { x: 0, y: 0, z: 0 }, // 过度到0的初始角度，关键点想要酷炫的样式主要修改此参数
    opacity: 0, // 初始透明度
    scale: 0.9, //初始缩放大小，可以大于1,变为逐渐缩小
    easing: 'cubic-bezier(0.6, 0.2, 0.2, 1)', // 缓动'ease', 'ease-in-out'，'linear'...

    // 回调函数
    beforeReveal: function(domEl) {},
    beforeReset: function(domEl) {},
    afterReveal: function(domEl) {},
    afterReset: function(domEl) {}
});

Vue.prototype.$scrollReveal = scrollReveal;

Vue.use(Meta);

Vue.use(Button)
    .use(Dropdown)
    .use(DropdownItem)
    .use(Divider)
    .use(Backtop)
    .use(Input)
    .use(Avatar)
    .use(Tooltip)
    .use(Popover)
    .use(Dialog)
    .use(Image)
    .use(DropdownMenu);

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
