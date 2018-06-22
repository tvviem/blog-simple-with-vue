<template>
    <div id="show-blogs" v-theme:column="'wide'">
        <h1>All Blog Articles - {{blogs.length}} </h1>
        <input type="text" v-model="search" placeholder="search blogs" />
        <div v-for="(blog, idx) in filteredBlogs" :key="idx" class="single-blog">
            <router-link v-bind:to="'/blog/' + blog.id">
              <h2 v-rainbow>{{ blog.title | toUppercase }}</h2>
            </router-link>
            <article> {{ blog.content | snippet }} </article>
        </div>
    </div>
</template>

<script>
import searchMixin from '../mixins/searchMixin'
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
      .get("https://data-blog-firebase.firebaseio.com/posts.json")
      .then(function(data) {
        return data.json();
      }).then(function(data) {
        var arrBlogs = [];
        for (let key in data) {
          data[key].id = key; // create attribute id for blog-object (a key from firebase) 
          arrBlogs.push(data[key]);
        }
        console.log(arrBlogs);
        this.blogs = arrBlogs;
      })
  },
  computed: {
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
  },
  // declare mixin property for use filteredBlogs in its
  mixins: [searchMixin]
};
</script>

<style scoped>
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
#show-blogs a{
    color: #444;
    text-decoration: none;
}
input[type="text"]{
    padding: 8px;
    width: 100%;
    box-sizing: border-box;
}
</style>
