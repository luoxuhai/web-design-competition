/**
 * @file lavas config
 * @author ibyli(15186743693@163.com)
 */

'use strict';

const path = require('path');
const BUILD_PATH = path.resolve(__dirname, 'dist');
const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    build: {
        ssr: false,
        compress: true,
        path: BUILD_PATH,
        publicPath: '/',
        ssrCopy: isDev
            ? []
            : [
                  {
                      src: 'server.prod.js'
                  },
                  {
                      src: 'package.json'
                  }
              ]
    },
    babel: {
        babelrc: true
    },
    extendWithWebpackChain(config, { type, env }) {
        // eslint 检测出错误时，依然继续编译
        config.plugins.delete('no-emit-on-errors');

        // 处理 .js 和 .vue 文件
        config.module
            .rule('eslint')
            .test(/\.(js|vue)$/)
            .use('eslint')
            .loader('eslint-loader')
            .end()
            .exclude.add(/node_modules/);
    },
    router: {
        mode: 'history',
        base: '/',
        routes: [
            {
                pattern: '/home',
                meta: {
                    keepAlive: true
                },
                skeletonId: 'home-skeleton',
                componentPath: 'core/Skeleton.vue'
            },
            {
                pattern: /\/article\/\D+/,
                meta: {
                    scrollToTop: true
                }
            },
            {
                pattern: /\/course\/\D+/,
                meta: {
                    scrollToTop: true
                }
            }
        ]
    },
    middleware: {
        client: ['redirectToHome', 'changeTitle']
    },
    serviceWorker: {
        // If true, generate service-worker.js and sw-register.js
        // Default to `false`
        enable: true,

        // Path of service worker template
        swSrc: path.join(__dirname, 'core/service-worker.js'),

        // Path of generated service worker file
        swDest: path.join(BUILD_PATH, 'service-worker.js'),

        globPatterns: ['**/*.{html,js,css,eot,svg,ttf,woff}'],

        // If true, `workbox.routing.registerNavigationRoute()` won't be generated
        // Defaults to `false`
        disableGenerateNavigationRoute: true

        // URL of appshell page
        // ONLY works in SSR mode
        // appshellUrl: '/appshell'
    }
};
