<template>
    <div id="show-blogs" v-theme:column="'narrow'">
        <h1>All Blog Articles - {{blogs.length}} </h1>
        <div v-for="(blog, idx) in blogs" :key="idx" class="single-blog">
            <h2 v-rainbow>{{ blog.title }}</h2>
            <article> {{ blog.body }} </article>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            blogs: []
        }
    },
    methods: {

    },
    created() {
        this.$http.get('https://jsonplaceholder.typicode.com/posts').then(function(data) {
            // get 10 object
            this.blogs = data.body.slice(0, 10);
        })
    }
}
</script>

<style>
#show-blogs {
    max-width: 800px;
    margin: 0 auto
}
.single-blog {
    padding: 20px;
    margin: 20px 0;
    box-sizing: border-box;
    background: #eee
}
</style>
