<template>
    <div class="home">
        <app-bar
            :style="{
                backgroundColor,
                boxShadow: opacity === 1 ? '0 2px 6px 0 rgba(0, 0, 0, 0.12)' : ''
            }"
            class="appbar"
            :isDark="opacity === 1"
        />
        <div class="home__wrapper">
            <home-intro :learner="learner" />
            <home-course :courses="courses" />
        </div>
        <achievement :articles="articles" />
    </div>
</template>

<script>
import AppBar from '@/components/AppBar';
import HomeIntro from './components/HomeIntro';
import HomeCourse from './components/HomeCourse';
import Achievement from './components/Achievement';
import { queryArticles } from '@/api/article';
import { queryCourses } from '@/api/course';
export default {
    components: {
        AppBar,
        HomeIntro,
        HomeCourse,
        Achievement
    },
    data() {
        return {
            articles: [],
            courses: [],
            learner: [],
            opacity: 0
        };
    },

    methods: {
        changeFadeAppbar() {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if (scrollTop < 150) this.opacity = scrollTop / 150;
            else this.opacity = 1;
        }
    },

    computed: {
        backgroundColor() {
            return `rgba(255, 255, 255, ${this.opacity})`;
        }
    },

    mounted() {
        window.addEventListener('scroll', this.changeFadeAppbar);
        queryCourses().then(({ data: { courses, learner } }) => {
            this.courses = courses;
            this.learner = learner;
        });

        queryArticles().then(({ data }) => {
            this.articles = data;
        });
    },

    destroyed() {
        window.removeEventListener('scroll', this.changeFadeAppbar);
    }
};
</script>

<style lang="scss" scoped>
.home {
    padding-bottom: 200px;

    .appbar {
        position: fixed;
        left: 0;
        right: 0;
        z-index: 999;
    }
    .home__wrapper {
        display: flex;
        flex-wrap: wrap;
        min-height: 800px;
    }
}
</style>
