<template>
    <div id="show-blogs" v-theme:column="'wide'">
        <h1>All Blog Articles - {{blogs.length}} </h1>
        <input type="text" v-model="search" placeholder="search blogs" />
        <div v-for="(blog, idx) in filteredBlogs" :key="idx" class="single-blog">
            <h2 v-rainbow>{{ blog.title | toUppercase }}</h2>
            <article> {{ blog.body | snippet }} </article>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      blogs: [],
      search: ""
    };
  },
  methods: {},
  created() {
    this.$http
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(function(data) {
        // get 10 object
        this.blogs = data.body.slice(0, 10);
      });
  },
  computed: {
    // using for filter in 10 blogs title
    filteredBlogs() {
      return this.blogs.filter(blog => {
        return blog.title.match(this.search);
      });
    }
  },
  filters: {
    // define for use filter content in this component 
    // blog.title | toUppercase
    toUppercase(value) {
      return value.toUpperCase();
    }
  },
  directives: {
    // define for use v-rainbow in this component (local)
    'rainbow': {
      bind(el, binding, vnode) {
        el.style.color =
          "#" + Math.random().toString(16).slice(2, 8);
      }
    }
  }
};
</script>

<style>
#show-blogs {
  max-width: 800px;
  margin: 0 auto;
}
.single-blog {
  padding: 20px;
  margin: 20px 0;
  box-sizing: border-box;
  background: #eee;
}
</style>
