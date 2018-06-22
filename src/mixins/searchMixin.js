export default {
  computed: {
    // create multi-feature inside js file (mixin) serve for multi vue component
    filteredBlogs() {
      return this.blogs.filter(blog => {
        return blog.title.match(this.search);
      });
    }
  }
}
