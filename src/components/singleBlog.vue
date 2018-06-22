<template>
    <div id="single-blog">
        <h1>{{ blog.title }}</h1>
        <article>{{ blog.content }}</article>
        <p>Author: {{ blog.author }}</p>
        <ul>
            <li v-for="(cat, idx) in blog.categories" :key="idx"> {{ cat }} </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            id: this.$route.params.id,
            blog: {}
        }
    },
    created() {
        this.$http.get('https://data-blog-firebase.firebaseio.com/posts/'+ this.id + '.json')
        .then((data) => {
            return data.json();
        }).then((data) => {
            this.blog = data;
        })
    }
}
</script>

<style scoped>
#single-blog {
    max-width: 960px;
    margin: 0 auto;
}
</style>
